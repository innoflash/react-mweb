import { FibrePromotionModel } from '@mweb/app/models/fibre-product.model';
import { createSlice } from '@reduxjs/toolkit';

export const PROMOTIONS = 'mweb-promotions';
const initialState = [] satisfies Array<FibrePromotionModel> as Array<FibrePromotionModel>;
const promotionsSlice = createSlice({
  name: PROMOTIONS,
  initialState,
  reducers: {
    setPromotions: (_, action: { payload: Array<FibrePromotionModel> }) => {
      return action.payload;
    }
  }
});

export const promotionActions = promotionsSlice.actions;

export default promotionsSlice;