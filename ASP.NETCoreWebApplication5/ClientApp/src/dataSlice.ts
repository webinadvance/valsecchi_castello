import {createSlice} from '@reduxjs/toolkit';

interface CounterState {
    value: number;
    loading: boolean,
    user: any,
    routes: any,
}

export interface Route {
    key: string;
    type: "video" | "img";
    media: string;
}

const initialState: CounterState = {
    value: 0,
    loading: false,
    user: null,
    routes: [] as Route[]
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
        user(state, action: { payload: any }) {
            state.user = action.payload;
        },
        routes(state, action: { payload: any }) {
            state.routes = action.payload;
        },
    },
});

export const {increment, decrement, incrementByAmount, loading, user, routes} = dataSlice.actions;

export default dataSlice.reducer;
