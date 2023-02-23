import { Table } from "antd"
import { useEffect, useState } from "react"
import { USERNAME } from "../../../@app/constants/key"
import { convertDateTime } from "../../../@app/utils/DateUtil"
import { GetGradeAPI } from "../../../connectors/GradeConnector"
import { GetSubjectsAPI } from "../../../connectors/SubjectConnector"




const SubjectTable=()=>{
    const [subjects,setSubjects]=useState([])
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Room',
            dataIndex: 'roomName',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Start date',
            key: 'id',
            render: (_, record)=>(<div>{record.startDate} </div>)
        },
        {
            title: 'End date',
            key: 'id',
            render: (_, record)=>(<div>{record.endDate}</div>)
        },
        {
            title: 'Start time',
            key: 'id',
            render: (_, record)=>(<div>{record.startTime}</div>)
        },
        {
            title: 'End time',
            key: 'id',
            render: (_, record)=>(<div>{record.endTime}</div>)
        },
        // {
        //     title: 'End time',
        //     dataIndex: 'endTime',
        //     key: 'id',
        //     render: (room) => <a>{convertDateTime(room.endTime)}</a>,
        // },
        
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             {
        //                 loadingConfirm.id == record.id && loadingConfirm.status ? <Spin style={{ margin: 5 }}/> :
        //                     <Button
        //                         onClick={() => { 
        //                             try{
        //                                 setLoadingConfirm({id:record.id,status:true})
        //                                 changeStatusRoomBookingRequest(record.id, "DONE")
        //                             }finally{
        //                                 setLoadingConfirm({id:record.id,status:false})
        //                             }
        //                          }}
        //                         type="primary" style={{ margin: 5 }}>Confirm</Button>
        //             }
        //             {
        //                 loadingReject.id == record.id && loadingReject.status ? <Spin style={{ margin: 5 }}/> : 
        //                 <Button
        //                     onClick={() => { 
        //                         try{
        //                             setLoadingReject({id:record.id,status:true})
        //                             changeStatusRoomBookingRequest(record.id, "REJECTED")
        //                         }finally{
        //                             setLoadingReject({id:"".id,status:false})
        //                         }
        //                      }}
        //                     type="primary" danger style={{ margin: 5 }}>Reject</Button>
        //             }
        //         </Space>
        //     ),
        // },
    ];
    const getSubject=async()=>{
        const res=await GetSubjectsAPI()
        console.log(res)
        setSubjects(res.data)
    }
    useEffect(() => {
        getSubject()
    }, [])
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        <Table columns={columns} dataSource={subjects} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default SubjectTable