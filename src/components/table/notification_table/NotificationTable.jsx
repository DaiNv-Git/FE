import { Button, Checkbox, Col, DatePicker, Dropdown, Form, Input, Menu, Modal, Radio, Row, Select, Space, Table, Tag } from "antd"
import { useEffect, useState } from "react"
import { ROLES, USERNAME } from "../../../@app/constants/key"
import { GetGradeAPI } from "../../../connectors/GradeConnector"
import { DownOutlined } from '@ant-design/icons';
import { ROLE_ADMIN } from "../../../@app/constants/roles";
import { AddNotificationAPI, GetNotificationAPI } from "../../../connectors/NotificationConnector";
import "./styles.css"
import { GetSubjectsAPI } from "../../../connectors/SubjectConnector";
import { toast } from "react-toastify";
import { convertDateTime, convertDateTime2 } from "../../../@app/utils/DateUtil";
import { Link } from "react-router-dom";
import moment from 'moment'
const NotificationTable = () => {
    const [notifications, setNotifications] = useState([])
    const [isShowAddNotificationModal, setShowNotificationModal] = useState(false)
    const [subjects, setSubjects] = useState([])
    const [formNotification] = Form.useForm()
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'id',
            render: (text) => <div className="notification-table-content">{text}</div>,
        },
        {
            title: 'Subject',
            dataIndex: 'subjectName',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Event Date',
            dataIndex: 'eventDate',
            key: 'id',
            render: (text) => <div >{text}</div>,
        },
        
        // {
        //     title: 'Read',
        //     dataIndex: 'isRead',
        //     key: 'id',
        //     render: (isRead) => <div>
        //         {
        //             !isRead?<Tag color="#f50">Not read</Tag>:<Tag color="#87d068">Read</Tag>
        //         }
        //     </div>
        // },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/notification-detail/${record.id}`}>
                        <Button type="primary">Detail</Button>
                    </Link>
                </Space>
            ),
        },
    ];

    const onFinishCreateNotification = async (value) => {
        console.log(value)
        formNotification.resetFields()
        const res = await AddNotificationAPI({
            title: value.title,
            message: value.message,
            subjectId: value.subjectId ? value.subjectId : "",
            eventDate: convertDateTime2(value.eventDate),
            isUrgent:value.isUrgent
        })
        await getNotifications()
        toast.success("Create notitfication success")
        setShowNotificationModal(false)
    }
    const getNotifications = async () => {
        const res = await GetNotificationAPI()
        console.log(res.data)
        setNotifications(res.data)
    }
    const getSubjects = async () => {
        const res = await GetSubjectsAPI()
        setSubjects(res.data)
    }

    useEffect(() => {
        getSubjects()
        getNotifications()
    }, [])
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {
                                localStorage.getItem(ROLES)?.includes(ROLE_ADMIN) ?
                                    <Button
                                        onClick={() => { setShowNotificationModal(true) }}
                                        type="primary" style={{ margin: 10 }}>Add Notification</Button> : null
                            }
                            <Table
                                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
                                columns={columns} dataSource={notifications} />
                        </div>
                    </div>
                </div>
            </div>
            {
                subjects ? <Modal
                    title="Add notification"
                    footer={[]}
                    onCancel={() => { setShowNotificationModal(false) }} open={isShowAddNotificationModal}>
                    <Form
                        form={formNotification}
                        onFinish={onFinishCreateNotification}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input title!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Message"
                            name="message"
                            rules={[{ required: true, message: 'Please input message!' }]}
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            label="Event Date"
                            name="eventDate"
                            rules={[{ required: true, message: 'Please choose event day!' }]}
                        >
                            <DatePicker
                                format="YYYY-MM-DD HH:mm:ss"
                                showTime={{
                                    defaultValue: moment("00:00:00", "HH:mm:ss"),
                                    format: "HH:mm"
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Is Urgent"
                            name="isUrgent"
                            rules={[{ required: true, message: 'Please choose option!' }]}
                        >
                            <Radio.Group>
                                <Radio value={true}>Urgent</Radio>
                                <Radio value={false}>Not Urgent</Radio>
                            </Radio.Group>

                        </Form.Item>
                        <Form.Item
                            label="Notification for"
                            name="subjectId"
                        >
                            <Select defaultValue={""}>
                                <Select.Option value="">All</Select.Option>
                                {
                                    subjects.map(subject => {
                                        return (
                                            <Select.Option value={subject.id}>{subject.name}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal> : null
            }
        </div>
    )

}
export default NotificationTable