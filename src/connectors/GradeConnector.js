import request from "../@app/connectors/AxiosConnector";
import { HOST } from "../@app/constants/host";

export const GetGradeAPI = async (semester, username) => {
    const response = await request.get(
        `${HOST}/edu/api/v1/grades?sem=${semester}&username=${username}`
    );
    return response.data;
};
export const deleteGradeAPI = async (param) => {
    const response = await request.delete(
        `${HOST}/edu/api/v1/grades?ids=${param}`
    );
    return response.data;
};
export const addNew = async (param) => {
   
    try {
        const response = await request.post(`${HOST}/edu/api/v1/grades/init`, [
            param,
        ]);
        return response.data;
    } catch (error) {
        return {status:'500',name:"user dose not exits"}
    }
   
};
export const excel = async (param) => {
    
    try {
        let formData = new FormData();
    formData.append("file", param);
    const response = await request.post(
        `${HOST}/edu/api/v1/grades/grade/import`,
        formData
        );
        return response.data;
    } catch (error) {
        return {status:'500',name:"Have user dose not exits"}
    }
};
export const edit = async (param) => {
   console.log('hdfdjh')
    try {
        const response = await request.get(`${HOST}/edu/api/v1/grades/${param}`);
        return response.data;
    } catch (error) {
        return {status:'500',name:"user dose not exits"}
    }
};
