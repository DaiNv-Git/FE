import { Table } from "antd"
import { useEffect, useState } from "react"
import { USERNAME } from "../../../@app/constants/key"
import { convertDateTime } from "../../../@app/utils/DateUtil"
import { GetExamAPI } from "../../../connectors/ExamConnector"
import { GetGradeAPI } from "../../../connectors/GradeConnector"
import { GetSubjectsAPI } from "../../../connectors/SubjectConnector"




const ExamTable=()=>{
    const [exams,setExams]=useState([])
    const columns = [
        {
            title: 'Subject Code',
            dataIndex: 'subjectCode',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Subject Name',
            dataIndex: 'subjectName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Room',
            dataIndex: 'roomName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'id',
            render: (text) => <a>{convertDateTime(text)}</a>,
        },
    ];
    const getExams=async()=>{
        const res=await GetExamAPI()
        console.log(res)
        setExams(res.data)
    }
    useEffect(() => {
        getExams()
    }, [])
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        <Table columns={columns} dataSource={exams} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ExamTable