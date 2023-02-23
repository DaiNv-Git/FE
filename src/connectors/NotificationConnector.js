import request from "../@app/connectors/AxiosConnector"
import { HOST } from "../@app/constants/host"

export const GetNotificationAPI=async()=>{
    const response= await request.get(`${HOST}/edu/api/v1/notifications`)
    return response.data
}
export const AddNotificationAPI=async(data)=>{
    const response=await request.post(`${HOST}/edu/api/v1/notifications`,data)
    return response.data
}
export const GetNotificationByIdAPI=async(id)=>{
    const response= await request.get(`${HOST}/edu/api/v1/notifications/${id}`)
    return response.data
}
export const ReadNotificationAPI=async(id)=>{
    const response= await request.put(`${HOST}/edu/api/v1/notifications/${id}?isRead=true`,{})
    return response.data
}