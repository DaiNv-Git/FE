
import { useState } from "react"
import { useEffect } from "react"
import { GetRoomAPI } from "../connectors/RoomConnector"

import { Row, Col, Card, Button, Modal, Form, Input, DatePicker, Badge } from "antd"
import { USERNAME } from "../@app/constants/key";
import { CreateBookingRoomRequestAPI } from "../connectors/RoomRequestConnector";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;
const rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
  };
const RoomBooking = () => {
    const [formCreateRequestBooking] = Form.useForm();
    const [rooms, setRooms] = useState()
    const [roomSelected, setRoomSelected] = useState()
    const [isShowModalBooking, setShowModalBooking] = useState()
    
    const getRooms = async () => {
        const res = await GetRoomAPI()
        setRooms(res.data)
    }
    const createRequestBooking = async (value) => {
        const data={
            startTime:value.time[0],
            endTime:value.time[1],
            description: value.description,
            username:localStorage.getItem(USERNAME),
            roomName:roomSelected
        }
        console.log(data)
        const res=await CreateBookingRoomRequestAPI(data);
        console.log(res)
        await getRooms()
        toast.success(`Send request booking room ${roomSelected} success`)
        setShowModalBooking(false)
        formCreateRequestBooking.resetFields()
    }
    const onBookingClick = async (roomName) => {
        setShowModalBooking(true)
        setRoomSelected(roomName)
    }
    useEffect(() => {
        getRooms()
    }, []);
    return (
        <div>
            <Modal 
            footer={[]}
            title="Booking request" open={isShowModalBooking} onCancel={() => { setShowModalBooking(false) }}>
                <Form
                    form={formCreateRequestBooking}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={createRequestBooking}
                    autoComplete="off"
                >
                     <Form.Item
                        label="Time"
                        name="time"
                        {...rangeConfig}
                    >
                        
                        <RangePicker showTime />
                        
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"

                    >
                        <Input.TextArea />
                    </Form.Item>
                    
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div style={{ margin: 20 }}>
                <Row>
                    {
                        rooms?.map(room => {
                            return (
                                <Col span={12}>
                                    <div style={{ margin: 10 }}>
                                        <Card title={room.name} extra={<Badge  size="large" color={room.status?"green":"red"}/>}>
                                            <div style={{ margin: 100 }}>

                                            </div>
                                            <Button disabled={!room.status} onClick={() => { onBookingClick(room.name) }}>Book</Button>
                                        </Card>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>

        </div>)
}
export default RoomBooking