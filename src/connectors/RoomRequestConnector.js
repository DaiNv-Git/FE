import request from "../@app/connectors/AxiosConnector"
import { HOST } from "../@app/constants/host"

export const CreateBookingRoomRequestAPI=async(data)=>{
    const response= await request.post(`${HOST}/edu/api/v1/request-booking-room`,data)
    return response.data
}
export const GetBookingRoomRequestAPI=async()=>{
    const response= await request.get(`${HOST}/edu/api/v1/request-booking-room`)
    return response.data
}
export const UpdateStateBookingRoomRequestAPI=async(id,status)=>{
    const response= await request.put(`${HOST}/edu/api/v1/request-booking-room/${id}/status/${status}`,'')
    return response.data
}