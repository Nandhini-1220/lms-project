import { useEffect, useState } from "react";
import axios from "axios";

function DashboardPage() {

    const [courseCount, setCourseCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [enrollmentCount, setEnrollmentCount] = useState(0);

    useEffect(() => {

        axios.get("http://localhost:8080/courses")
            .then((response) => {
                setCourseCount(response.data.length);
            });

        axios.get("http://localhost:8080/users")
            .then((response) => {
                setUserCount(response.data.length);
            });

        axios.get("http://localhost:8080/enrollments")
            .then((response) => {
                setEnrollmentCount(response.data.length);
            });

    }, []);

    return (
        <div>

            <h1>LMS Dashboard</h1>

            <h3>Total Courses: {courseCount}</h3>

            <h3>Total Users: {userCount}</h3>

            <h3>Total Enrollments: {enrollmentCount}</h3>

        </div>
    );
}

export default DashboardPage;