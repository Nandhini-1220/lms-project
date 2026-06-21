import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPage() {

const [activeTab, setActiveTab] =
    useState("users");

const user = JSON.parse(
    localStorage.getItem("user")
);

const navigate = useNavigate();

const [users, setUsers] = useState([]);
const [courses, setCourses] = useState([]);
const [enrollments, setEnrollments] = useState([]);

useEffect(() => {

    axios.get("http://localhost:8080/users")
        .then((response) => {
            setUsers(response.data);
        });

    axios.get("http://localhost:8080/courses")
        .then((response) => {
            setCourses(response.data);
        });

    axios.get("http://localhost:8080/enrollments")
        .then((response) => {
            setEnrollments(response.data);
        });

}, []);

const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");
};

const deleteUser = (id) => {

    if (
        !window.confirm(
            "Delete this user?"
        )
    ) {
        return;
    }

    axios.delete(
        `http://localhost:8080/users/${id}`
    )
    .then(() => {

        setUsers(
            users.filter(
                user => user.id !== id
            )
        );

        alert(
            "User Deleted Successfully"
        );

    })
    .catch((error) => {
        console.error(error);
    });
};

const deleteEnrollment = (id) => {

    if (
        !window.confirm(
            "Delete Enrollment?"
        )
    ) {
        return;
    }

    axios.delete(
        `http://localhost:8080/enrollments/${id}`
    )
    .then(() => {

        setEnrollments(
            enrollments.filter(
                enrollment =>
                    enrollment.id !== id
            )
        );

    })
    .catch((error) => {
        console.error(error);
    });
};

const [userSearch, setUserSearch] =
    useState("");

return (

    <div className="page-container">

        <div className="top-bar">

            <div>

                <h1>
                    Admin Dashboard
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

        <div className="dashboard-cards">

            <div className="dashboard-card">

                <h2>
                    {users.length}
                </h2>

                <p>
                    Total Users
                </p>

            </div>

            <div className="dashboard-card">

                <h2>
                    {courses.length}
                </h2>

                <p>
                    Total Courses
                </p>

            </div>

            <div className="dashboard-card">

                <h2>
                    {enrollments.length}
                </h2>

                <p>
                    Total Enrollments
                </p>

            </div>

        </div>

        <div
            style={{
                marginTop: "40px",
                marginBottom: "20px"
            }}
        >

            <button
                onClick={() =>
                    setActiveTab("users")
                }
            >
                Users
            </button>

            {" "}

            <button
                onClick={() =>
                    setActiveTab("courses")
                }
            >
                Courses
            </button>

            {" "}

            <button
                onClick={() =>
                    setActiveTab("enrollments")
                }
            >
                Enrollments
            </button>

        </div>

        {activeTab === "users" && (

            <div>

                <h2>
                    All Users
                </h2>

                <input type="text" placeholder="Search Users" value={userSearch} onChange={(e) => setUserSearch(e.target.value)}/>

                {users.filter(user => user.name.toLowerCase().includes( userSearch.toLowerCase())).map((user) => (

                    <div
                        key={user.id}
                        className="list-card"
                    >

                        

                        <h3>
                            {user.name}
                        </h3>

                        <p>
                            {user.email}
                        </p>

                        <p>
                            Role: {user.role}
                        </p>

                        <button onClick={() => deleteUser(user.id)}>Delete User</button>

                    </div>
                    

                ))}

                

            </div>

        )}

        {activeTab === "courses" && (

            <div>

                <h2>
                    All Courses
                </h2>

                {courses.map((course) => (

                    <div
                        key={course.id}
                        className="list-card"
                    >

                        <h3>
                            {course.title}
                        </h3>

                        <p>
                            {course.description}
                        </p>

                        <p>
                            Instructor:
                            {" "}
                            {course.instructor}
                        </p>

                        <p>
                            Category:
                            {" "}
                            {course.category}
                        </p>

                    </div>

                ))}

            </div>

        )}

        {activeTab === "enrollments" && (

            <div>

                <h2>
                    All Enrollments
                </h2>

                {enrollments.map((enrollment) => (

                    <div
                        key={enrollment.id}
                        className="list-card"
                    >

                        <p>
                            User ID:
                            {" "}
                            {enrollment.userId}
                        </p>

                        <p>
                            Course ID:
                            {" "}
                            {enrollment.courseId}
                        </p>

                        <p>
                            Status:
                            {" "}
                            {enrollment.status}
                        </p>

                        <p>
                            Date:
                            {" "}
                            {enrollment.enrollmentDate}
                        </p>

                        <button onClick={() => deleteEnrollment(enrollment.id)}>Delete Enrollment</button>

                    </div>

                ))}
                

            </div>

        )}

    </div>

);

}

export default AdminPage;
