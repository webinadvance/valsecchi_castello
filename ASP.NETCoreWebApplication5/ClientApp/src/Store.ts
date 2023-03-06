import { configureStore, combineReducers } from '@reduxjs/toolkit'

import counterReducer from './dataSlice'

const rootReducer = combineReducers({
  data: counterReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
