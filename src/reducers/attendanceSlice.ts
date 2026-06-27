import { createEntitySlice } from "../lib/createEntitySlice";
import { mockAttendance } from "../data/mockData";
import type { Attendance } from "../types";

const slice = createEntitySlice<Attendance>("attendance", mockAttendance, "attendanceId", 10);

export const { addItem: addAttendance, updateItem: updateAttendance, removeItem: removeAttendance, setSearchTerm: setAttendanceSearch, setPage: setAttendancePage } = slice.actions;
export default slice.reducer;
