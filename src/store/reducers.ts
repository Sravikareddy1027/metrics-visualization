import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as dashboardReducer } from '../Features/dashboard/reducer';
export default {
  weather: weatherReducer,
  dashboard: dashboardReducer,
};
