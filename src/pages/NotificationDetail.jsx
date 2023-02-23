import { Col, Row } from "antd"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { convertDateTime } from "../@app/utils/DateUtil"
import { GetNotificationByIdAPI, ReadNotificationAPI } from "../connectors/NotificationConnector"

const NotificationDetail = () => {
    const [notification, setNotification] = useState()
    const { id } = useParams()
    const getNotificationId = async () => {
        const res = await GetNotificationByIdAPI(id);
        const resRead=await ReadNotificationAPI(id,{isRead:true})
        console.log(res)
        console.log(resRead)
        setNotification(res.data)
    }
    useEffect(() => {
        getNotificationId()
    }, [])
    return (
        <div>
            <div>
                <Row>
                    <Col span={4} />
                    <Col span={16}>
                        <div id="detail-notification-box">
                            <Row>
                                <Col span={18}>
                                    <div style={{ marginBottom: 20 }}>
                                    <h2>{notification?.title}</h2>
                                </div>
                                </Col>
                                <Col span={6}>{convertDateTime(notification?.createdDate)}</Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                {notification?.message}</Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={4} />
                </Row>
            </div>
        </div>)
}
export default NotificationDetail