import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import { JWT, ROLES } from "../@app/constants/key";
import Sidebar from "../components/sidebar/Sidebar";
import Topnav from "../components/topnav/TopNav";
import ThemeAction from "../redux/actions/ThemeAction"

const RouterAppElement = ({
  component: Component,
  path,
  roles,
}) => {
  const history=useHistory()
  
    if(!localStorage.getItem(JWT)&&path!="/sign-in"){
      history.replace("/sign-in")
    }
    if(localStorage.getItem(JWT)&&path=="/sign-in"){
      history.push("/")
    }
    if(roles.includes(localStorage.getItem(ROLES))){
      
    }
  return <div>
    <Component />
  </div>
};
export default RouterAppElement;