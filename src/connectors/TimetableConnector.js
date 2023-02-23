import request from "../@app/connectors/AxiosConnector"
import { HOST } from "../@app/constants/host"

export const GetTimeTableAPI=async(fromDate,toDate)=>{
    const response= await request.get(`${HOST}/edu/api/v1/time-table`)
    return response.data
}
