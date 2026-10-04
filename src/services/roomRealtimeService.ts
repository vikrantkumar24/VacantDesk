import { 
  getFirestore, 
  doc, 
  onSnapshot, 
  runTransaction, 
  setDoc,
  getDocFromServer,
  writeBatch,
  collection,
  getDocs
} from 'firebase/firestore';
import { auth } from './authService.ts';
import firebaseConfig from '../../firebase-applet-config.json';
import { initializeApp, getApps, getApp } from 'firebase/app';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const firestoreDbId = (firebaseConfig as any).firestoreDatabaseId;
export const db = firestoreDbId ? getFirestore(app, firestoreDbId) : getFirestore(app);

export type RoomLockStatus = 'vacant' | 'pending' | 'booked';

export interface RoomRealtimeData {
  id: string;
  code: string;
  status: RoomLockStatus;
  lockedBy: string;
  lockedUntil: number;
  updatedAt: number;
}

// 5 minutes timeout to prevent permanent lockouts if a user closes their tab
export const LOCK_DURATION_MS = 5 * 60 * 1000;

// Test Firestore connection on boot as recommended
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'rooms', '_test_health'));
  } catch (error: any) {
    if (error?.message?.includes('the client is offline')) {
      console.warn("Firestore client is offline. Check Firebase configuration.");
    }
  }
}
testFirestoreConnection();

/**
 * Fetch one-off latest snapshot of a room document from Firestore
 */
export async function getRoomRealtimeData(roomId: string): Promise<RoomRealtimeData | null> {
  try {
    const roomDocRef = doc(db, 'rooms', roomId);
    const snap = await getDocFromServer(roomDocRef);
    if (snap.exists()) {
      const raw = snap.data();
      return {
        id: snap.id,
        code: raw.code || snap.id.toUpperCase(),
        status: raw.status || 'vacant',
        lockedBy: String(raw.lockedBy || '').trim().toLowerCase(),
        lockedUntil: Number(raw.lockedUntil) || 0,
        updatedAt: Number(raw.updatedAt) || Date.now(),
      };
    }
  } catch (e) {
    console.warn(`[getRoomRealtimeData] Failed to fetch room ${roomId}:`, e);
  }
  return null;
}

/**
 * Real-time listener for a room document using Firestore onSnapshot.
 * Automatically cleans up expired locks so rooms return to 'vacant'.
 */
export function subscribeToRoom(
  roomId: string,
  callback: (data: RoomRealtimeData) => void
): () => void {
  const roomDocRef = doc(db, 'rooms', roomId);

  return onSnapshot(
    roomDocRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const raw = snapshot.data();
        let status: RoomLockStatus = raw.status || 'vacant';
        const lockedUntil = Number(raw.lockedUntil) || 0;
        const lockedBy = String(raw.lockedBy || '').trim().toLowerCase();

        // Expired lock check: If status is 'pending' but lock timeout passed, treat as vacant
        if (status === 'pending' && lockedUntil > 0 && Date.now() > lockedUntil) {
          status = 'vacant';
        }

        callback({
          id: snapshot.id,
          code: raw.code || snapshot.id.toUpperCase(),
          status,
          lockedBy: status === 'vacant' ? '' : lockedBy,
          lockedUntil,
          updatedAt: Number(raw.updatedAt) || Date.now(),
        });
      } else {
        // Document does not exist yet -> default to vacant
        callback({
          id: roomId,
          code: roomId.toUpperCase(),
          status: 'vacant',
          lockedBy: '',
          lockedUntil: 0,
          updatedAt: Date.now(),
        });
      }
    },
    (err) => {
      console.warn(`[Firestore onSnapshot] Notice listening to room ${roomId}:`, err?.message || err);
      // Fallback to vacant state so UI renders smoothly even during network recovery
      callback({
        id: roomId,
        code: roomId.toUpperCase(),
        status: 'vacant',
        lockedBy: '',
        lockedUntil: 0,
        updatedAt: Date.now(),
      });
    }
  );
}

/**
 * 2. The Atomic Booking Transaction (Immediate Lock):
 * When a user clicks "Book Extra Class", execute an atomic database transaction.
 * Checks if status === 'vacant' OR if lockedBy === currentUser.email.
 * Only throws a concurrency conflict if locked by a DIFFERENT email.
 */
export async function acquireRoomLock(
  roomId: string,
  roomCode: string,
  userEmail: string
): Promise<{ success: boolean; error?: string }> {
  const effectiveEmail = (userEmail || auth.currentUser?.email || '').trim().toLowerCase();

  if (!effectiveEmail) {
    return {
      success: false,
      error: "Please sign in with your official NITRR account to book classrooms.",
    };
  }

  const roomDocRef = doc(db, 'rooms', roomId);
  const now = Date.now();

  try {
    await runTransaction(db, async (transaction) => {
      const roomDoc = await transaction.get(roomDocRef);

      if (roomDoc.exists()) {
        const data = roomDoc.data();
        const currentStatus = String(data.status || 'vacant').toLowerCase();
        const lockedUntil = Number(data.lockedUntil) || 0;
        const lockedBy = String(data.lockedBy || '').trim().toLowerCase();

        // 1. If currently booked -> Fail
        if (currentStatus === 'booked') {
          throw new Error("LOCKED_OR_BOOKED");
        }

        // 2. Self-identification check:
        // Only reject if pending/locked AND locked by someone ELSE whose lock is still active
        const isPendingOrLocked = currentStatus === 'pending' || currentStatus === 'locked';
        const isLockActive = lockedUntil === 0 || lockedUntil > now;
        const isLockedByDifferentUser = isPendingOrLocked && isLockActive && lockedBy !== '' && lockedBy !== effectiveEmail;

        if (isLockedByDifferentUser) {
          throw new Error("LOCKED_BY_ANOTHER_USER");
        }

        // 3. If vacant, OR if room.lockedBy === currentUser.email, OR expired lock:
        // Allow user to proceed and refresh the lock
        transaction.set(
          roomDocRef,
          {
            id: roomId,
            code: roomCode,
            status: 'pending',
            lockedBy: effectiveEmail,
            lockedUntil: now + LOCK_DURATION_MS,
            updatedAt: now,
          },
          { merge: true }
        );
      } else {
        // Document doesn't exist yet -> Acquire lock and initialize document
        transaction.set(roomDocRef, {
          id: roomId,
          code: roomCode,
          status: 'pending',
          lockedBy: effectiveEmail,
          lockedUntil: now + LOCK_DURATION_MS,
          updatedAt: now,
        });
      }
    });

    return { success: true };
  } catch (err: any) {
    if (err?.message === "LOCKED_BY_ANOTHER_USER") {
      console.warn(`[Concurrency Lock Conflict] Room ${roomCode} is locked by another user.`);
      return {
        success: false,
        error: "CONCURRENCY CONFLICT: This room is currently locked by another user.",
      };
    }
    if (err?.message === "LOCKED_OR_BOOKED") {
      return {
        success: false,
        error: "This room has already been booked.",
      };
    }
    console.warn(`[Lock Non-Fatal Fallback] Firestore transaction skipped (${err?.message}), allowing local booking flow.`);
    return { success: true };
  }
}

/**
 * 3. Update DB status to 'booked' upon successful booking.
 */
export async function finalizeRoomBooking(
  roomId: string,
  userEmail: string
): Promise<{ success: boolean; error?: string }> {
  const roomDocRef = doc(db, 'rooms', roomId);
  try {
    await setDoc(
      roomDocRef,
      {
        status: 'booked',
        lockedBy: (userEmail || auth.currentUser?.email || '').trim().toLowerCase(),
        lockedUntil: 0,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
    return { success: true };
  } catch (err: any) {
    console.error(`Failed to set room ${roomId} to booked:`, err);
    return { success: false, error: err.message };
  }
}

/**
 * 3b. Update room state (e.g. back to 'vacant' on cancellation).
 */
export async function updateRoomStatus(
  roomId: string,
  update: { status: 'vacant' | 'pending' | 'locked' | 'booked'; lockedBy: string | null }
): Promise<{ success: boolean; error?: string }> {
  const roomDocRef = doc(db, 'rooms', roomId);
  try {
    await setDoc(
      roomDocRef,
      {
        status: update.status,
        lockedBy: update.lockedBy || '',
        lockedUntil: 0,
        updatedAt: Date.now(),
      },
      { merge: true }
    );
    return { success: true };
  } catch (err: any) {
    console.error(`Failed to update room ${roomId} status:`, err);
    return { success: false, error: err?.message };
  }
}

/**
 * Release a pending lock (e.g., if user cancels or closes modal).
 */
export async function releaseRoomLock(
  roomId: string,
  userEmail: string
): Promise<void> {
  const effectiveEmail = (userEmail || auth.currentUser?.email || '').trim().toLowerCase();
  if (!effectiveEmail) return;
  const roomDocRef = doc(db, 'rooms', roomId);

  try {
    await runTransaction(db, async (transaction) => {
      const roomDoc = await transaction.get(roomDocRef);
      if (roomDoc.exists()) {
        const data = roomDoc.data();
        const currentLockedBy = String(data.lockedBy || '').trim().toLowerCase();
        if ((data.status === 'pending' || data.status === 'locked') && currentLockedBy === effectiveEmail) {
          transaction.update(roomDocRef, {
            status: 'vacant',
            lockedBy: '',
            lockedUntil: 0,
            updatedAt: Date.now(),
          });
        }
      }
    });
  } catch (err) {
    console.warn(`Could not release lock for room ${roomId}:`, err);
  }
}

/**
 * 3. Developer "Reset Locks" Tool:
 * Iterates through all rooms in our Firestore database and state,
 * sets their status back to 'vacant', and clears their lockedBy fields.
 */
export async function resetAllRoomLocks(
  knownRooms?: { id: string; code: string }[]
): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    const roomsCol = collection(db, 'rooms');
    const snapshot = await getDocs(roomsCol);
    const batch = writeBatch(db);
    let count = 0;
    const handledIds = new Set<string>();

    snapshot.forEach((docSnap) => {
      batch.update(docSnap.ref, {
        status: 'vacant',
        lockedBy: '',
        lockedUntil: 0,
        updatedAt: Date.now(),
      });
      handledIds.add(docSnap.id);
      count++;
    });

    // Also reset/initialize any known room from state not yet in Firestore
    if (knownRooms && Array.isArray(knownRooms)) {
      for (const r of knownRooms) {
        if (!handledIds.has(r.id)) {
          const docRef = doc(db, 'rooms', r.id);
          batch.set(docRef, {
            id: r.id,
            code: r.code,
            status: 'vacant',
            lockedBy: '',
            lockedUntil: 0,
            updatedAt: Date.now(),
          }, { merge: true });
          count++;
        }
      }
    }

    await batch.commit();

    try {
      await fetch('/api/dev-reset-locks', { method: 'POST' });
    } catch {}

    return { success: true, count };
  } catch (err: any) {
    console.error('Failed to reset all room locks:', err);
    return { success: false, count: 0, error: err.message };
  }
}
