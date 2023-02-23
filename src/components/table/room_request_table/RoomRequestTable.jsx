import { Button, Space, Spin, Table } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { convertDateTime } from "../../../@app/utils/DateUtil"
import { GetBookingRoomRequestAPI, UpdateStateBookingRoomRequestAPI } from "../../../connectors/RoomRequestConnector"

const RoomRequestTable = () => {
    const [roomRequests, setRoomRequests] = useState([])
    const [loadingConfirm, setLoadingConfirm] = useState({ id: "", status: false })
    const [loadingReject, setLoadingReject] = useState({ id: "", status: false })
    const getRoomRequests = async () => {
        const res = await GetBookingRoomRequestAPI()
        console.log(res)
        setRoomRequests(res.data)
    }
    const changeStatusRoomBookingRequest = async (id, status) => {
        try {
            const res = await UpdateStateBookingRoomRequestAPI(id, status)
            await getRoomRequests()
            toast.success(res.message)
        } catch (e) {
            console.log(e)
            toast.error("Update status fail")
        }
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'id',
        },
        {
            title: 'Room',
            dataIndex: 'room',
            key: 'id',
            render: (room) => <a>{room.name}</a>,
        },
        {
            title: 'Start time',
            dataIndex: 'startTime',
            key: 'id',
            render: (room) => <a>{convertDateTime(room.startTime)}</a>,
        },
        {
            title: 'End time',
            dataIndex: 'endTime',
            key: 'id',
            render: (room) => <a>{convertDateTime(room.endTime)}</a>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {
                        loadingConfirm.id == record.id && loadingConfirm.status ? <Spin style={{ margin: 5 }}/> :
                            <Button
                                onClick={() => { 
                                    try{
                                        setLoadingConfirm({id:record.id,status:true})
                                        changeStatusRoomBookingRequest(record.id, "DONE")
                                    }finally{
                                        setLoadingConfirm({id:record.id,status:false})
                                    }
                                 }}
                                type="primary" style={{ margin: 5 }}>Confirm</Button>
                    }
                    {
                        loadingReject.id == record.id && loadingReject.status ? <Spin style={{ margin: 5 }}/> : 
                        <Button
                            onClick={() => { 
                                try{
                                    setLoadingReject({id:record.id,status:true})
                                    changeStatusRoomBookingRequest(record.id, "REJECTED")
                                }finally{
                                    setLoadingReject({id:"".id,status:false})
                                }
                             }}
                            type="primary" danger style={{ margin: 5 }}>Reject</Button>
                    }
                </Space>
            ),
        },
    ];

    useEffect(() => {
        getRoomRequests()
    }, [])
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table columns={columns} dataSource={roomRequests} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RoomRequestTable