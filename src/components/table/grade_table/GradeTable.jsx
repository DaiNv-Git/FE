import {
    Col,
    Dropdown,
    Menu,
    Row,
    Select,
    Space,
    Table,
    Tag,
    Button,
    Input,
    Form,
} from "antd";
import { useEffect, useState } from "react";
import { ROLES, USERNAME } from "../../../@app/constants/key";
import {
    GetGradeAPI,
    deleteGradeAPI,
    excel,
} from "../../../connectors/GradeConnector";
import { DownOutlined } from "@ant-design/icons";
import { ROLE_ADMIN } from "../../../@app/constants/roles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
const semesters = [
    {
        label: "Semester 2 year 2",
        value: "SEM_2_2",
    },
    {
        label: "Semester 1 year 3",
        value: "SEM_1_3",
    },
    {
        label: "Semester 2 year 3",
        value: "SEM_2_3",
    },
    {
        label: "Semester 1 year 4",
        value: "SEM_1_4",
    },
];
const GradeTable = () => {
    const [deleterow, setdeleterow] = useState([]);
    const [grade, setGrade] = useState([]);
    const [fileInput, setfileInput] = useState();
    const [editdata, seteditdata] = useState("");
    const { push } = useHistory();
    const [selectionType, setSelectionType] = useState("checkbox");
    const columns = [
        localStorage.getItem(ROLES).includes(ROLE_ADMIN)
            ? {
                  title: "Username",
                  dataIndex: "username",
                  key: "id",
                  render: (text) => <a>{text}</a>,
              }
            : {},
        {
            title: "Cgpa 4",
            dataIndex: "cgpa4",
            key: "id",
        },
       
       
        {
            title: "classification",
            dataIndex: "classification",
            key: "id",
        },
        {
            title: "creditsAccumulated",
            dataIndex: "creditsAccumulated",
            key: "id",
        },
        
        {
            title: "semester",
            dataIndex: "semester",
            key: "id",
        },
        {
            title: "Cgpa 100",
            dataIndex: "cgpa100",
            key: "id",
            render: (text) => <a>{text}</a>,
        },

        {
            title: "Credits Accumulated",
            dataIndex: "creditsAccumulated",
            key: "id",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Classìication",
            dataIndex: "classification",
            key: "id",
            render: (text) => (
                <Tag
                    color={
                        text === "Excellent"
                            ? "#2dcc55"
                            : text === "Good"
                            ? "#4287f5"
                            : text === "Average Good"
                            ? "#2c86b0"
                            : text === "Average"
                            ? "#c9892e"
                            : text === "Bad"
                            ? "#cf3827"
                            : ""
                    }
                >
                    {text}
                </Tag>
            ),
        },
    ];
    const [selectedSemester, setSelectedSemester] = useState("SEM_2_2");

    const getGrade = async () => {
        const res = await GetGradeAPI(
            selectedSemester,
            localStorage.getItem(USERNAME)
        );
        res.data.map((item) => (item["key"] = item["id"]));
        console.log(res.data);
        setGrade(res.data);
    };
    const user = localStorage.getItem("USERNAME");
    const getGradeWithParam = async (semester) => {
        const res = await GetGradeAPI(semester, localStorage.getItem(USERNAME));
        setGrade(res.data);
    };
    const onChangeSemester = async (value) => {
        getGradeWithParam(value);
    };
    const addNew = () => {
        push("/addGrade");
    };

    const deletel = async (value) => {
        console.log(deleterow.join());
        const res = await deleteGradeAPI(deleterow.join());
        if (res.status === "SUCCESS") {
            toast.success("Success delete", {
                position: toast.POSITION.TOP_RIGHT,
            });
            window.location.reload();
        }
        
    };
    const edit = () => {
        if (editdata) {
            if ((editdata.length = 1)) {
                push(`/eidtGrade/${editdata}`);
            }
        }
    };
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setdeleterow(selectedRowKeys);
            seteditdata(selectedRowKeys);
        },
    };
    const handleFileSelected = async (e) => {
        const files = e.target.files[0];
        const res = await excel(files);
        if (res.status === "SUCCESS") {
            toast.success("Success Add New", {
                position: toast.POSITION.TOP_RIGHT,
            });
            window.location.reload();
        }else if(res.status==='500'){
            toast.error(res.name, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        
    };

   
    useEffect(() => {
        getGrade();
    }, []);
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Row>
                                <Col span={20}>
                                    {user == "admin" ? (
                                        <Space
                                            className="site-button-ghost-wrapper"
                                            wrap
                                        >
                                            <Button
                                                type="primary"
                                                ghost
                                                onClick={addNew}
                                            >
                                                add new
                                            </Button>
                                            <Button
                                                type="primary"
                                                ghost
                                                style={{
                                                    color: "#d4b106",
                                                    borderColor: "#d4b106",
                                                }}
                                                onClick={edit}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                type="primary"
                                                danger
                                                ghost
                                                onClick={deletel}
                                            >
                                                Delete
                                            </Button>
                                            <Input
                                                type="file"
                                                onChange={handleFileSelected}
                                                text="test"
                                            />
                                           
                                        </Space>
                                    ) : (
                                        ""
                                    )}
                                </Col>
                                <Col span={4}>
                                    <Select
                                        defaultValue="SEM_2_2"
                                        style={{ marginBottom: 20 }}
                                        onChange={onChangeSemester}
                                        options={semesters}
                                    ></Select>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                dataSource={grade}
                                rowSelection={{
                                    type: selectionType,
                                    ...rowSelection,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GradeTable;
