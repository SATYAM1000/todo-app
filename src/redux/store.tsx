import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './taskSlice.tsx';
export const store=configureStore({
    reducer:{
        tasks:taskReducer,
    }
})
