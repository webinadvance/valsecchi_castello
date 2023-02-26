import {createSlice} from '@reduxjs/toolkit';

interface CounterState {
    value: number;
    loading: boolean,
}

const initialState: CounterState = {
    value: 0,
    loading: false
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
        loading(state, action: { payload: boolean }) {
            state.loading = action.payload;
        },
    },
});

export const {increment, decrement, incrementByAmount,loading} = dataSlice.actions;

export default dataSlice.reducer;
