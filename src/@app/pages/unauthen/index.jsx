import { Button, Result } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UnAuthenPage = () => {
    const navigate = useNavigate();
    const account = useSelector(state => state.account)
    return (
        <div>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <>
                        {account.jwt ? (
                            <Button
                                style={{ margin: 10 }}
                                type="primary"
                                onClick={() => navigate("/")}
                            >
                                Home
                            </Button>
                        ) : (
                            <>
                                <Button
                                    style={{ margin: 10 }}
                                    type="primary"
                                    onClick={() => navigate("/signin")}
                                >
                                    Sign in
                                </Button>
                                <Button
                                    style={{ margin: 10 }}
                                    danger
                                    onClick={() => navigate("/signup")}
                                >
                                    Sign up
                                </Button>
                            </>
                        )}
                    </>
                }
            />
            ,
        </div>
    )
}
export default UnAuthenPage;