// import Input from "../components/Input/index";
import React from "react";
import { useState, useEffect, useReducer, useRef } from "react";
import { addNew, edit } from "../connectors/GradeConnector";
import { Button, Form, Input, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
const EditGrade = () => {
    const [data, setData] = useState({});
    const inputRef = useRef();

    let { id } = useParams();

    const getData = async () => {
        const res = await edit(id);

        const dataInfo = res.data;
        const {
            username,
            advancedMath,
            algorithms,
            cgpa100,
            cgpa4,
            classification,
            creditsAccumulated,
            probabilityStatistics,
            semester,
        } = dataInfo;
        if (res.data) {
            setData({
                ...data,
                username: username,
                advancedMath: advancedMath,
                algorithms: algorithms,
                cgpa100: cgpa100,
                cgpa4:cgpa4,
                classification: classification,
                creditsAccumulated: creditsAccumulated,
                probabilityStatistics: probabilityStatistics,
                semester: semester,
            });
        }
    };
    const submitHandler = async (e) => {
        const res = await addNew({ ...data, id: id });
        if (res.status === "SUCCESS") {
            toast.success("Success Edit", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }else if(res.status==='500'){
            toast.error(res.name, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        {/* <form onSubmit={submitHandler}> */}
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "170px" }}>Username :</div>
                            <input
                                ref={inputRef}
                                type="text"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        username: e.target.value,
                                    });
                                }}
                                defaultValue={data.username}
                                style={{
                                    borderStyle: "solid",
                                    borderColor: "black",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    margin: "0 20px",
                                }}
                            />
                        </div>
                      

                     

                       

                        <div style={{ display: "flex" }}>
                            <div style={{ width: "170px" }}>cgpa100 :</div>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        cgpa100: e.target.value,
                                    });
                                }}
                                defaultValue={data.cgpa100}
                                style={{
                                    borderStyle: "solid",
                                    borderColor: "black",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    margin: "0 20px",
                                }}
                            />
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "170px" }}>cgpa4 :</div>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        cgpa4: e.target.value,
                                    });
                                }}
                                defaultValue={data.cgpa4}
                                style={{
                                    borderStyle: "solid",
                                    borderColor: "black",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    margin: "0 20px",
                                }}
                            />
                        </div>

                        <div style={{ display: "flex" }}>
                            <div style={{ width: "170px" }}>
                                classification :
                            </div>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        classification: e.target.value,
                                    });
                                }}
                                defaultValue={data.classification}
                                style={{
                                    borderStyle: "solid",
                                    borderColor: "black",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    margin: "0 20px",
                                }}
                            />
                        </div>

                        <div style={{ display: "flex" }}>
                            <div style={{ width: "170px" }}>
                                creditsAccumulated :
                            </div>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        creditsAccumulated: e.target.value,
                                    });
                                }}
                                defaultValue={data.creditsAccumulated}
                                style={{
                                    borderStyle: "solid",
                                    borderColor: "black",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    margin: "0 20px",
                                }}
                            />
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "170px" }}>semester :</div>
                            <input
                                type="text"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        semester: e.target.value,
                                    });
                                }}
                                defaultValue={data.semester}
                                style={{
                                    borderStyle: "solid",
                                    borderColor: "black",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    margin: "0 20px",
                                }}
                            />
                        </div>

                        <Button type="primary" onClick={submitHandler}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EditGrade;
