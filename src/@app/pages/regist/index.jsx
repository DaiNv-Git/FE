import { Button, Col, Form, Input, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInAPI, signUpAPI } from "../../connectors/AuthenConnector";
import { ACCOUNT, ACCOUNT_ID, JWT } from "../../constants/key";
import { accountActions } from "../../redux/slices/AccountSlice";
import { localStorageGetReduxState } from "../../utils/StorageUtil";
import "./styles.scss"
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

const SignUpPage = () => {
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinish = async ({ username, email, password }) => {
        try {
            setLoading(true)
            const res = await signUpAPI(username, email, password);
            toast.success(res.message)
            navigate("/signin")
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
        <div className="loginPage">
            <Row align="middle">
                <Col span={8}></Col>
                <Col span={8}>
                    <div className="loginForm">
                        <h2 style={{ textAlign: "center", fontWeight: "bold", padding: 15 }}>
                            FAMS Sign UP
                        </h2>
                        <Form
                            validateMessages={validateMessages}
                            name="basic"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="User name"
                                name="username"
                                rules={[{ required: true, type: "string" }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, type: "string" }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Confirm "
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Row justify="center" align="middle">
                                <Form.Item style={{ marginTop: 10 }}>
                                    {isLoading ? (
                                        <Spin />
                                    ) : (
                                        <Button type="primary" htmlType="submit">
                                            Sign Up
                                        </Button>
                                    )}
                                </Form.Item>
                            </Row>
                        </Form>
                    </div>
                </Col>
                <Col span={8}></Col>
            </Row>
        </div>)
}
export default SignUpPage