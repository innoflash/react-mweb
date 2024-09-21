import { FilterStateModel } from '@mweb/app/models/state/filter.state.model';
import { createSlice } from '@reduxjs/toolkit';

export const FILTERS = 'mweb-filters';
const initialState = { providers: [] } satisfies FilterStateModel as FilterStateModel;

export const filtersSlice = createSlice({
  name: FILTERS,
  initialState,
  reducers: {
    toggleProvider: (state, action) => {
      if (state.providers.includes(action.payload)) {
        state.providers = state.providers.filter(provider => provider !== action.payload);

        return;
      }

      state.providers.push(action.payload)
    },
    updatePriceFilter: (state, action: { payload: { min: number, max: number } | undefined }) => {
      state.price = action.payload;
    }
  }
});

export const filterActions = filtersSlice.actions;
export default filtersSlice;