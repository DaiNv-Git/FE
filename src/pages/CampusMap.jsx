import { Col, Row } from "antd"
import campus from "../assets/images/campus.jpg"
export const CampusMap=()=>{
    return (
    <div>
        <Row>
            <Col span={24}>
                <div>
                <img className="center-image" style={{width:"70%"}} src={campus}/>
                </div>
            </Col>
        </Row>    
    </div>)
}