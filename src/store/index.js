import { configureStore } from "@reduxjs/toolkit";
import escuelas from './slices/escuelas.slice'

export default configureStore({
    reducer: {
        escuelas,
    }
})