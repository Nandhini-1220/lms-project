import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseForm from "../components/CourseForm";
import CourseList from "../components/CourseList";

function InstructorPage() {

const user = JSON.parse(
    localStorage.getItem("user")
);

const navigate = useNavigate();

const [selectedCourse, setSelectedCourse]
    = useState(null);

const [refresh, setRefresh]
    = useState(false);

const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");
};

return (

    <div className="page-container">

        <div className="top-bar">

            <div className="instructor-header">
                <h1>
                    Instructor Dashboard
                </h1>

                <h3>
                    Welcome, {user?.name}
                </h3>

            </div>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>

        </div>

        <CourseList
            setSelectedCourse={setSelectedCourse}
            refresh={refresh}
            setRefresh={setRefresh}
        />

        <hr />
        <br />
        
        <CourseForm
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            refresh={refresh}
            setRefresh={setRefresh}
        />


        

    </div>

);


}

export default InstructorPage;
