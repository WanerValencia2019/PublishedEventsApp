import { AppDispatch } from "../redux";
import { PRODUCTION_API_URL, LOCAL_API_URL } from "@env";
import { Axios, AxiosRequestHeaders } from "axios";

import axios from "axios";


const baseURL = PRODUCTION_API_URL;

export default function (dispatch?: any, token?: string):Axios  {
    const headers: AxiosRequestHeaders = {};

    if(token){
        headers.Authorization = "Bearer "+token;
    }

    const axiosInstance = axios.create({
        baseURL,
        headers,
    });

    return axiosInstance;
};