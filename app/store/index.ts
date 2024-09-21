import campaignsSlice, { CAMPAIGNS } from '@mweb/app/store/campaigns.slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    [CAMPAIGNS]: campaignsSlice.reducer
  }
});

export default store;