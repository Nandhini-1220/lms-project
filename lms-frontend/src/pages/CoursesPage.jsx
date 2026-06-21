import { useState } from "react";
import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";

function CoursesPage() {

    const [selectedCourse, setSelectedCourse] = useState(null);

    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h1>Courses</h1>

            <CourseForm
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                refresh={refresh}
                setRefresh={setRefresh}
            />

            <hr />

            <CourseList
                setSelectedCourse={setSelectedCourse}
                refresh={refresh}
            />
        </div>
    );
}

export default CoursesPage;