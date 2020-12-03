import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  getMetrics: [],
  selectedMetrics: [],
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    UpdateSelectMetrics: (state, action: PayloadAction<any>) => {
      const { selectedItem } = action.payload;
      if (selectedItem !== '-1' && !state.selectedMetrics.includes(selectedItem)) {
        state.selectedMetrics = [...state.selectedMetrics, selectedItem];
      } else state.selectedMetrics = [...state.selectedMetrics];
      console.log(state.selectedMetrics);
    },
    metricsListDataRecevied: (state, action: PayloadAction<any>) => {
      const { getMetrics } = action.payload;
      state.getMetrics = getMetrics;
    },
    dashboardApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
