import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
    method: 'post',
    headers: { 
      'Content-Type': 'application/json'
    },
}

const BaseUrl = process.env.REACT_APP_API_URL

export const LoginUser = createAsyncThunk('/masuk', async (body, {rejectWithValue}) => {
  try{
    const res = await axios.post(BaseUrl + '/masuk',body,config)
    return res.data
  }catch (err){
    return rejectWithValue(err.response.data)
  }
})

export const updateUser = async (params,body) => {
  try {
    let data = axios.put(`${BaseUrl}/pusat-kontrol-akun/akun/${params || ''}`, body).then((res) => res.data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data.message)
  }
}

export const postNewAkun = async (body) => {
  try {
    let data = await axios.post(`${BaseUrl}/pusat-kontrol-akun/akun`, body).then((res) => res.data)
    return data
  } catch (error) {
    console.log(error)
    throw new Error(error.response.data.message)
  }
}

