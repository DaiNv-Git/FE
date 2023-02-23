
import { HOST } from "../constants/host";
import request from "./AxiosConnector";
export const signInAPI=async(username,password)=>{
    const response= await request.post(`${HOST}/auth/api/v1/users/sign-in`,{
         username,
         password
     })
     return response.data
 };
 export const signUpAPI=async(username,email,password)=>{
    const response= await request.post(`${HOST}/v1/auth/sign-up`,{
        username,
        email,
        password
    })
    return response.data
 }