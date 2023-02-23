import { Button, Col, Form, Input, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { signInAPI } from "../../connectors/AuthenConnector";
import { ACCOUNT, ACCOUNT_ID, JWT, ROLES, USERNAME } from "../../constants/key";
import { localStorageGetReduxState } from "../../utils/StorageUtil";
import "./styles.css"
import campus from "../../../assets/images/campus.jpg"
import { GetNotificationAPI } from "../../../connectors/NotificationConnector";
const validateMessages = {
    required: "${label} is required!",
    string: {
        len: "${label} must be have length with exact ${len}",
        min: "${label} must be at least ${min} characters",
    },
    number: {
        range: "${label} must be between ${min} and ${max}",
    },
};

const SignInPage = () => {
    const [isLoading, setLoading] = useState(false)
    const navigate = useHistory()
    const dispatch = useDispatch()
    const onFinish = async ({ username, password }) => {
        try {
            setLoading(true)
            const res = await signInAPI(username, password);
            console.log(res)
            localStorage.setItem(JWT, res.data.access_token)
            localStorage.setItem(ROLES, res.data.roles)
            localStorage.setItem(USERNAME, username)
            const resNoti=await GetNotificationAPI();
            console.log(resNoti.data.length)
            if(resNoti?.data?.length>0){
                navigate.push(`/notification-detail/${resNoti.data[0].id}`)
            }else{
                navigate.push("/notification")
            }
            // navigate.push("/notification")
            toast.success(res.message)
        } catch (e) {
            console.log(e)
            toast.error(e.response.data.message)
        } finally {
            setLoading(false)
        }
    }
    const checkSignined = () => {
        if (localStorageGetReduxState()?.account?.jwt) {
            navigate("/")
        }
    }
    useEffect(() => {
        checkSignined()
    }, []);
    return (
        <div style={{backgroundImage:`url(${campus})`,height:"100vh"}}>
            <Row align="middle">
                <Col span={8}></Col>
                <Col span={8}>
                    <div className="loginForm">
                        <h2 style={{ textAlign: "center", fontWeight: "bold", padding: 15 }}>
                            Edusoft Sign In
                        </h2>
                        <Form
                            validateMessages={validateMessages}
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 14 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, type: "string" }]}
                            >
                                <Input />
                            </Form.Item>
                            
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        type: "string",
                                    },
                                ]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Row justify="end" align="middle">
                                <a
                                    onClick={() => {
                                        navigate("/forgot-pass");
                                    }}
                                    style={{ paddingRight: 50 }}
                                >
                                    Forgot Password?
                                </a>
                            </Row>
                            <Row justify="center" align="middle">
                                <Form.Item style={{ marginTop: 10 }}>
                                    {isLoading ? (
                                        <Spin />
                                    ) : (
                                        <Button type="primary" htmlType="submit">
                                            Sign in
                                        </Button>
                                    )}
                                </Form.Item>
                            </Row>
                            <Row justify="center" align="middle">
                                <Form.Item>
                                    <Button onClick={() => navigate("/signup")}>
                                        Sign Up
                                    </Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    </div>
                </Col>
                <Col span={8}></Col>
            </Row>
        </div>)
}
export default SignInPage