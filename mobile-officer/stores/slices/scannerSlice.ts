import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ScannerState {
  scannedData: string | null;
}

const initialState: ScannerState = {
  scannedData: null,
};

const scannerSlice = createSlice({
  name: "scanner",
  initialState,
  reducers: {
    setScannedData(state, action: PayloadAction<string>) {
      state.scannedData = action.payload;
    },
    clearScannedData(state) {
      state.scannedData = null;
    },
  },
});

export const { setScannedData, clearScannedData } = scannerSlice.actions;
export default scannerSlice.reducer;