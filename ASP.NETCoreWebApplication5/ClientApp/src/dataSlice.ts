import { createSlice } from '@reduxjs/toolkit';

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0,
};

const dataSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.value++;
        },
        decrement(state) {
            state.value--;
        },
        incrementByAmount(state, action: { payload: number }) {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = dataSlice.actions;

export default dataSlice.reducer;
