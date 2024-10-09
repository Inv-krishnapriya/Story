import { createSlice } from "@reduxjs/toolkit";

interface Slot {
  startTime: string;
  endTime: string;
  scheduledDate: string;
}

interface ISchedule {
  start: Date;
  end: Date;
  title?: string;
}

interface SlotState {
  selectedSlots: Slot[];
  industries: string[];
  prefectures: string[];
  profession: string[];
  durations: string[];
  selectedDuration: number;
  selectedSchedule: ISchedule[];
}

const initialState: SlotState = {
  selectedSlots: [],
  industries: [],
  prefectures: [],
  profession: [],
  durations: [],
  selectedDuration: 0,
  selectedSchedule: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addSlot: (state, action) => {
      state.selectedSlots.push(action.payload);
    },
    addSchedule: (state, action) => {
      console.log(action.payload);
      state.selectedSchedule.push(action.payload);
    },
    removeSlot: (state, action) => {
      state.selectedSlots = state.selectedSlots.filter(
        (slot) =>
          !(
            slot.startTime === action.payload.startTime &&
            slot.endTime === action.payload.endTime &&
            slot.scheduledDate === action.payload.scheduledDate
          )
      );
    },
    resetSlot: (state, action) => {
      state.selectedSlots = action.payload;
    },
    removeSchedule: (state, action) => {
      console.log(action.payload, state.selectedSchedule);

      state.selectedSchedule = state.selectedSchedule.filter(
        (slot) =>
          !(
            slot?.start?.toISOString() === action.payload.start &&
            slot?.end?.toISOString() === action.payload.end &&
            slot.title === action.payload.title
          )
      );
    },
    removeAllSchedule: (state) => {
      state.selectedSchedule = initialState.selectedSchedule;
    },
    removeAllSlots: (state) => {
      state.selectedSlots = initialState.selectedSlots;
    },
    addIndustry: (state, action) => {
      state.industries.push(action.payload);
    },
    addPrefecture: (state, action) => {
      state.prefectures.push(action.payload);
    },
    addProfession: (state, action) => {
      state.profession.push(action.payload);
    },
    addDuration: (state, action) => {
      state.durations.push(action.payload);
    },
    addSelectedDuration: (state, action) => {
      state.selectedDuration = action.payload;
    },
    clearIndustry: (state) => {
      state.industries = initialState.industries;
    },
    clearPrefecture: (state) => {
      state.prefectures = initialState.prefectures;
    },
    clearProfession: (state) => {
      state.profession = initialState.profession;
    },
    clearDuration: (state) => {
      state.durations = initialState.durations;
    },
    resetState: () => {
      return initialState;
    },
  },
});

export const {
  addSlot,
  resetState,
  removeAllSlots,
  removeSlot,
  addIndustry,
  addPrefecture,
  addProfession,
  addDuration,
  addSelectedDuration,
  addSchedule,
  removeSchedule,
  removeAllSchedule,
  clearIndustry,
  clearPrefecture,
  clearProfession,
  clearDuration,
  resetSlot,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
