/**
 * Role Configuration Utility
 * Role-Based Access Control (RBAC) email-to-role mappings for CampusPulse / NIT Raipur.
 */

/**
 * @type {Record<string, 'student' | 'cr' | 'faculty' | 'hod'>}
 */
export const ROLE_MAPPINGS = {
  // Primary elevated user
  "vkumar103.btech2026@it.nitrr.ac.in": "cr",

  // Specified example roles
  "soumychandrakar490@gmail.com": "cr",
  "schandrakar096.btech2026@cse.nitrr.ac.in": "cr",
  "userknowme2006@gmail.com": "faculty",
  "spanda101.btech2026@cse.nitrr.ac.in": "hod",

  // Institute test accounts & department representatives
  "cr.cse.sem6@nitrr.ac.in": "cr",
  "cr@it.nitrr.ac.in": "cr",
  "cr.it.sem4@nitrr.ac.in": "cr",
  "faculty.dewangan@nitrr.ac.in": "faculty",
  "faculty.koley@nitrr.ac.in": "faculty",
  "hod.cse@nitrr.ac.in": "hod",
  "student.rahul@nitrr.ac.in": "student",
  "student@it.nitrr.ac.in": "student",
  "student@cse.nitrr.ac.in": "student"
};

/**
 * Resolves the role for a given email address.
 * After confirming the email ends with ".nitrr.ac.in" or "@nitrr.ac.in",
 * checks if the user's email exists as a key in ROLE_MAPPINGS.
 * If it exists, returns the corresponding role (e.g., 'cr' or 'faculty').
 * If it does NOT exist in the dictionary, returns the default role of 'student'.
 *
 * @param {string|null|undefined} email
 * @returns {'student' | 'cr' | 'faculty' | 'hod'}
 */
export function getRoleForEmail(email) {
  if (!email) return 'student';
  const normalized = email.trim().toLowerCase();

  if (Object.prototype.hasOwnProperty.call(ROLE_MAPPINGS, normalized)) {
    return ROLE_MAPPINGS[normalized];
  }

  // Case-insensitive check
  const matchedKey = Object.keys(ROLE_MAPPINGS).find(
    (key) => key.toLowerCase() === normalized
  );

  if (matchedKey) {
    return ROLE_MAPPINGS[matchedKey];
  }

  // Default to 'student' if not found in dictionary
  return 'student';
}

export default ROLE_MAPPINGS;
