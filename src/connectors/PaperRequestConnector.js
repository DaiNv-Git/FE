import request from "../@app/connectors/AxiosConnector"
import { HOST } from "../@app/constants/host"

export const GetPaperRequestAPI=async()=>{
    const response= await request.get(`${HOST}/edu/api/v1/papers`)
    return response.data
}
export const AddPaperRequestAPI=async(data)=>{
    const response= await request.post(`${HOST}/edu/api/v1/papers`,data)
    return response.data
}
export const UpdateStatusPaperRequestAPI=async(id,data)=>{
    const response= await request.put(`${HOST}/edu/api/v1/papers/${id}/status/${data}`,{})
    return response.data
}