import { createSlice } from "@reduxjs/toolkit";
import API_BASE_URL from "../../utils/apiConfig";
import axios from "axios";

const escuelasSlice = createSlice({
    name: 'escuelas',
    initialState: { data: null, loading: false, error: null },
    reducers: {
        setEscuelas: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { setEscuelas, setLoading, setError } = escuelasSlice.actions;
export default escuelasSlice.reducer;

export const getEscuelasThunk = (category = "", searchTerm = "", page = 1) => async (dispatch) => {
    dispatch(setLoading());

    try {
        const url = `${API_BASE_URL}?categoria=${category}&search=${searchTerm}&page=${page}`;
        const response = await axios.get(url);
        dispatch(setEscuelas(response.data));
        return response.data;
    } catch (error) {
        console.error("Error fetching escuelas:", error);
        dispatch(setError(error.message || "Error fetching data"));
    }
}