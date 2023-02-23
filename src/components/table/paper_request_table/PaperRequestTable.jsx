import { Button, Col, Form, Input, Modal, Row, Select, Space, Spin, Table } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { ROLES } from "../../../@app/constants/key"
import { ROLE_ADMIN, ROLE_USER } from "../../../@app/constants/roles"
import { convertDateTime } from "../../../@app/utils/DateUtil"
import { AddPaperRequestAPI, GetPaperRequestAPI, UpdateStatusPaperRequestAPI } from "../../../connectors/PaperRequestConnector"
import { GetBookingRoomRequestAPI, UpdateStateBookingRoomRequestAPI } from "../../../connectors/RoomRequestConnector"

const PaperRequestTable = () => {
    const [paperRequest, setPaperRequest] = useState([])
    const [paperRequestSelected,setPaperRequestSelected]=useState()
    const [loadingConfirm, setLoadingConfirm] = useState({ id: "", status: false })
    const [loadingReject, setLoadingReject] = useState({ id: "", status: false })
    const [isShowModalCreatePaperRequest, setShowModalCreatePaperRequest] = useState(false)
    const [isShowModalUpStatusPaperRequest, setShowModalUpStatusCreatePaperRequest] = useState(false)
    const [formPaperRequest] = Form.useForm()
    const [formUpdateStatusPaperRequest] = Form.useForm()
    const getPaperRequest = async () => {
        const res = await GetPaperRequestAPI()
        console.log(res)
        setPaperRequest(res.data)
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        localStorage.getItem(ROLES)?.includes(ROLE_ADMIN)?{
            title: 'Action',
            key: 'action',
            render: (_, record) => record.status ==="Pending"?<Space size="middle">
            <Button onClick={()=>{
                console.log(record)
                setPaperRequestSelected(record.id);
                setShowModalUpStatusCreatePaperRequest(true)
            }} type="primary" style={{ margin: 5 }}>Update Status</Button>
        </Space>:null,
        }:{}
    ];
    const handleCreateNewPaperRequest = async (values) => {
        try{
            const res = await AddPaperRequestAPI(values)
            console.log(res)
            formPaperRequest.resetFields()
            await getPaperRequest()
            toast.success("Create success")
            setShowModalCreatePaperRequest(false)
        }catch(e){
            console.log(e)
        }
    }
    const handleUpdateStatusPaperRequest = async (values) => {
        try{
            console.log(paperRequestSelected)
            const res = await UpdateStatusPaperRequestAPI(paperRequestSelected,values.status)
            console.log(res)
            setPaperRequestSelected("")
            setShowModalUpStatusCreatePaperRequest(false)
            formUpdateStatusPaperRequest.resetFields()
            await getPaperRequest()
            toast.success("Update success")
            
        }catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
        getPaperRequest()
    }, [])
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Row>
                                <Col span={21} />
                                <Col span={3}>
                                   {
                                    localStorage.getItem(ROLES)?.includes(ROLE_USER)?
                                    <Button type="primary" onClick={() => { setShowModalCreatePaperRequest(true) }}>New request</Button>
                                    :null
                                   }
                                </Col>
                            </Row>
                            <Table columns={columns} dataSource={paperRequest} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="New Paper Request"
                onCancel={() => { setShowModalCreatePaperRequest(false) }}
                footer={[]}
                open={isShowModalCreatePaperRequest}>
                <Form
                    form={formPaperRequest}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={handleCreateNewPaperRequest}
                >
                    
                    <Form.Item label="Type" name="type" initialValue={"Certificate"}>
                        <Select defaultValue="Certificate">
                            <Select.Option value="Certificate" >Certificate</Select.Option>
                            <Select.Option value="Transcript" >Transcript</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Update Status Request"
                onCancel={() => { setShowModalUpStatusCreatePaperRequest(false) }}
                footer={[]}
                open={isShowModalUpStatusPaperRequest}>
                <Form
                    form={formUpdateStatusPaperRequest}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={handleUpdateStatusPaperRequest}
                >
                    
                    <Form.Item label="Status" name="status" initialValue={"Pending"}>
                        <Select defaultValue="Pending">
                            <Select.Option value="Done" >Done</Select.Option>
                            <Select.Option value="Rejected" >Rejected</Select.Option>
                            <Select.Option value="Unpaid" >Unpaid</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default PaperRequestTable