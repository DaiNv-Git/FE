import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory()
    const onLogout = () => {
        console.log("hello")
        localStorage.clear();
        history.push("/sign-in")
        window.location.reload();
    }
    useEffect(() => {
        onLogout()

    }, []);
    return (
        <div>
            Logout Page
        </div>
    )
}
export default Logout;