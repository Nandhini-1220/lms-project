import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentPage() {

const user = JSON.parse(
    localStorage.getItem("user")
);

const [courses, setCourses] = useState([]);
const [search, setSearch] = useState("");
const [enrolledCourses, setEnrolledCourses] = useState([]);
const [showMyCourses, setShowMyCourses] = useState(false);

const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
};

useEffect(() => {

    axios.get("http://localhost:8080/courses")
        .then((response) => {
            setCourses(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    axios.get("http://localhost:8080/enrollments")
        .then((response) => {

            const ids = response.data
                .filter(
                    e => e.userId === user.id
                )
                .map(
                    e => e.courseId
                );

            setEnrolledCourses(ids);

        })
        .catch((error) => {
            console.error(error);
        });

}, []);

const handleEnroll = (courseId) => {

    const enrollment = {
        userId: user.id,
        courseId: courseId,
        enrollmentDate: new Date()
            .toISOString()
            .split("T")[0],
        status: "Enrolled"
    };

    axios.post(
        "http://localhost:8080/enrollments",
        enrollment
    )
        .then(() => {

            alert("Successfully Enrolled!");

            setEnrolledCourses([
                ...enrolledCourses,
                courseId
            ]);

        })
        .catch((error) => {
            console.error(error);
        });
};

const filteredCourses = courses.filter((course) =>
    course.title
        .toLowerCase()
        .includes(search.toLowerCase())
);

const myCourses = courses.filter(course =>
    enrolledCourses.includes(course.id)
);

const getCourseImage = (category) => {

    if (category.toLowerCase() === "web development") {
        return "https://images.unsplash.com/photo-1498050108023-c5249f4df085";
    }

    if (category.toLowerCase() === "backend development") {
        return "https://images.unsplash.com/photo-1515879218367-8466d910aaa4";
    }

    if (category.toLowerCase() === "database") {
        return "https://images.unsplash.com/photo-1544383835-bda2bc66a55d";
    }

    return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3";
};

return (
    <div className="student-page">

        <div className="student-header">

            <h1>Student Dashboard</h1>

            <div className="top-bar">

                <h3>
                    Welcome, {user?.name}
                </h3>

                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    Logout
                </button>

            </div>

            <input
                className="search-box"
                type="text"
                placeholder="🔍 Search Courses"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <div
                style={{
                    marginTop: "20px",
                    marginBottom: "30px"
                }}
            >

                <button
    className={
        !showMyCourses
            ? "active-tab"
            : "inactive-tab"
    }
    onClick={() =>
        setShowMyCourses(false)
    }
>
    All Courses
</button>

                {" "}

                <button
    className={
        showMyCourses
            ? "active-tab"
            : "inactive-tab"
    }
    onClick={() =>
        setShowMyCourses(true)
    }
>
    My Courses
</button>

            </div>

        </div>

        <div className="course-container">

            {
                (
                    showMyCourses
                        ? myCourses
                        : filteredCourses
                ).map((course) => (

                    <div
                        key={course.id}
                        className="course-card"
                    >

                        <img
    src={getCourseImage(course.category)}
    alt={course.title}
/>

                        <h3>{course.title}</h3>

                        <p>{course.description}</p>

                        <p>
                            <strong>Instructor:</strong>{" "}
                            {course.instructor}
                        </p>

                        <p>
                            <strong>Category:</strong>{" "}
                            {course.category}
                        </p>

                        <p>
                            <strong>Duration:</strong>{" "}
                            {course.duration} Hours
                        </p>

                        <p>
                            <strong>Price:</strong>{" "}
                            ₹{course.price}
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    `/course/${course.id}`
                                )
                            }
                        >
                            View Details
                        </button>

                        <br /><br />

                        {
                            enrolledCourses.includes(course.id)

                                ? (

                                    <button disabled className="enrolled-btn">
                                        Already Enrolled
                                    </button>

                                )

                                : (

                                    <button
                                        onClick={() =>
                                            handleEnroll(course.id)
                                        }
                                    >
                                        Enroll
                                    </button>

                                )
                        }

                    </div>

                ))
            }

        </div>

    </div>
);


}

export default StudentPage;
