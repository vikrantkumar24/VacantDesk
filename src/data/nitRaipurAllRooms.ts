import { Room } from './campusData.ts';
import { NITRR_ROOM_FN1, NITRR_ROOM_FN2 } from './nitRaipurData.ts';
import { NITRR_ROOM_FN4, NITRR_ROOM_F39 } from './nitRaipurDataPart2.ts';
import { NITRR_ROOM_SN2, NITRR_ROOM_SN3, NITRR_ROOM_SN4 } from './nitRaipurDataPart3.ts';
import { NITRR_ROOM_CCC, NITRR_ROOM_APJ, NITRR_ROOM_D3D4 } from './nitRaipurLabs.ts';
import { 
  NITRR_ROOM_G01, 
  NITRR_ROOM_G02, 
  NITRR_ROOM_G11, 
  NITRR_ROOM_G12, 
  NITRR_ROOM_G31 
} from './nitRaipurGroundRooms.ts';
import { 
  NITRR_ROOM_F40, 
  NITRR_ROOM_F41, 
  NITRR_ROOM_F42, 
  NITRR_ROOM_F43, 
  NITRR_ROOM_F45, 
  NITRR_ROOM_F54 
} from './nitRaipurFirstFloorRooms.ts';
import { 
  NITRR_ROOM_S01, 
  NITRR_ROOM_S02, 
  NITRR_ROOM_S11, 
  NITRR_ROOM_S21, 
  NITRR_ROOM_S31 
} from './nitRaipurSecondFloorRooms.ts';
import { 
  NITRR_ROOM_B01, 
  NITRR_ROOM_B02, 
  NITRR_ROOM_B11, 
  NITRR_ROOM_B21 
} from './nitRaipurBasementRooms.ts';

export const ALL_NITRR_ROOMS: Room[] = [
  // Ground Floor Rooms (G-XX)
  NITRR_ROOM_G01,
  NITRR_ROOM_G02,
  NITRR_ROOM_G11,
  NITRR_ROOM_G12,
  NITRR_ROOM_G31,

  // First Floor Rooms (F-XX & FN-X)
  NITRR_ROOM_FN1,
  NITRR_ROOM_FN2,
  NITRR_ROOM_FN4,
  NITRR_ROOM_F39,
  NITRR_ROOM_F40,
  NITRR_ROOM_F41,
  NITRR_ROOM_F42,
  NITRR_ROOM_F43,
  NITRR_ROOM_F45,
  NITRR_ROOM_F54,

  // Second Floor Rooms (S-XX & SN-X)
  NITRR_ROOM_SN2,
  NITRR_ROOM_SN3,
  NITRR_ROOM_SN4,
  NITRR_ROOM_S01,
  NITRR_ROOM_S02,
  NITRR_ROOM_S11,
  NITRR_ROOM_S21,
  NITRR_ROOM_S31,

  // Basement / Lower Level Rooms (B-XX)
  NITRR_ROOM_B01,
  NITRR_ROOM_B02,
  NITRR_ROOM_B11,
  NITRR_ROOM_B21,

  // Central Labs, Halls & Graphics Studios
  NITRR_ROOM_CCC,
  NITRR_ROOM_APJ,
  NITRR_ROOM_D3D4,
];
