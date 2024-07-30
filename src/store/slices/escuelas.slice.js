import { createSlice } from "@reduxjs/toolkit";
import API_BASE_URL from "../../utils/apiConfig";
import axios from "axios";

const escuelasSlice = createSlice({
    name: 'escuelas',
    initialState: null,
    reducers: {
        setEscuelas: (currentValue, action) => action.payload
    }
})

export const { setEscuelas } = escuelasSlice.actions

export default escuelasSlice.reducer

export const getEscuelasThunk = () => (dispatch) => {
    const url = `${API_BASE_URL}`
    return axios.get(url)
        .then(res => {
            const escuelas = res.data;
            dispatch(setEscuelas(res.data))
            return escuelas;
        })
        .catch(err => {
             console.error('Error fething fixtures:', err );
            throw err;
        })
}