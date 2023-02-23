import request from "../@app/connectors/AxiosConnector"
import { HOST } from "../@app/constants/host"

export const GetExamAPI=async()=>{
    const response= await request.get(`${HOST}/edu/api/v1/exams`)
    return response.data
}
