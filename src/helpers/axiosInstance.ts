import { AppDispatch } from "../redux";
import { API_URL } from "@env";
import { Axios, AxiosRequestHeaders } from "axios";

import axios from "axios";


const baseURL = "http://192.168.1.7:8000/published_events/api";

export default function (dispatch?: any, token?: string):Axios  {
    const headers: AxiosRequestHeaders = {};

    if(token){
        headers.Authorization = "Bearer "+token;
    }

    const axiosInstance = axios.create({
        baseURL,
        headers,
    });
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.get['Content-Type'] = 'application/json';

    return axiosInstance;
};