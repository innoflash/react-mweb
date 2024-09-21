import campaignsSlice, { CAMPAIGNS } from '@mweb/app/store/campaigns.slice';
import promotionsSlice, { PROMOTIONS } from '@mweb/app/store/promotions.slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    [CAMPAIGNS]: campaignsSlice.reducer,
    [PROMOTIONS]: promotionsSlice.reducer
  }
});

export default store;