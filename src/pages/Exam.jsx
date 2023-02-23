import { useEffect } from "react";
import ExamTable from "../components/table/exam_table/ExamTable";

const Exam=()=>{
    useEffect(() => {
        document.title = 'My Page Title';
      }, []);
    return (
        <div>
            
            <ExamTable/>
        </div>
    )
}
export default Exam;