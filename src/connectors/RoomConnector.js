import request from "../@app/connectors/AxiosConnector"
import { HOST } from "../@app/constants/host"

export const GetRoomAPI=async()=>{
    const response= await request.get(`${HOST}/edu/api/v1/rooms`)
    return response.data
}
