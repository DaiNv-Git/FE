// import Input from "../components/Input/index";
import React from "react";
import { useState } from "react";
import { addNew } from "../connectors/GradeConnector";
import { Button, Form, Input, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
const AddGrade = () => {
    const [data, setdata] = useState({
        username: "",
        cgpa100: "",
        cgpa4: "",
        creditsAccumulated: "",
        classification: "",
        advancedMath: "",
        probabilityStatistics: "",
        algorithms: "",
    });
    const semesters = [
        {
            label: "Semester 2 year 2",
            value: "SEM_2_2",
        },
        {
            label: "Semester 1 year 3",
            value: "SEM_1_3",
        },
        {
            label: "Semester 2 year 3",
            value: "SEM_2_3",
        },
        {
            label: "Semester 1 year 4",
            value: "SEM_1_4",
        },
    ];

    const onFinish = async (values) => {
        const res = await addNew(values);

        if (res.status === "SUCCESS") {
            toast.success("Success Add New", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }else if(res.status==='500'){
            toast.error(res.name, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Id"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input",
                                    },
                                ]}
                            >
                                <Input defaultValue={data.username} />
                            </Form.Item>
                            <Form.Item
                                label="cgpa100"
                                name="cgpa100"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input",
                                    },
                                ]}
                            >
                                <Input defaultValue={data.cgpa100} />
                            </Form.Item>
                            <Form.Item
                                label="cgpa4"
                                name="cgpa4"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input",
                                    },
                                ]}
                            >
                                <Input defaultValue={data.cgpa4} />
                            </Form.Item>
                           
                            <Form.Item
                                label="creditsAccumulated"
                                name="creditsAccumulated"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input",
                                    },
                                ]}
                            >
                                <Input defaultValue={data.creditsAccumulated} />
                            </Form.Item>
                            <Form.Item
                                label="classification"
                                name="classification"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input",
                                    },
                                ]}
                            >
                                <Input defaultValue={data.classification} />
                            </Form.Item>
                           
                            <Form.Item
                                label="Semester"
                                name="semester"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input",
                                    },
                                ]}
                            >
                                <Select
                                    style={{ marginBottom: 20 }}
                                    options={semesters}
                                ></Select>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddGrade;
