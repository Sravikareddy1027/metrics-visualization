import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  getMetrics: [],
};

const slice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    dashboardDataRecevied: (state, action: PayloadAction<any>) => {
      const { getMetrics } = action.payload;
      state.getMetrics = getMetrics;
    },
    dashboardApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
