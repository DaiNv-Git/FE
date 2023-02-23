import request from "../@app/connectors/AxiosConnector"
import { HOST } from "../@app/constants/host"

export const GetSubjectsAPI=async()=>{
    const response= await request.get(`${HOST}/edu/api/v1/subjects`)
    return response.data
}
