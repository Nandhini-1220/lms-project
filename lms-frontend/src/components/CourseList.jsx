import { useEffect, useState } from "react";
import axios from "axios";

function CourseList({ setSelectedCourse, refresh, setRefresh }) {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/courses")
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [refresh]);

    const deleteCourse = (id) => {

        if (!window.confirm("Are you sure you want to delete this course?")) {
            return;
        }

        axios.delete(`http://localhost:8080/courses/${id}`)
            .then(() => {
                setCourses(
                    courses.filter(course => course.id !== id)
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="list-container">
            <h2 className="section-title">All Courses</h2>
            <div className="course-container">
            {courses.map((course) => (
                <div className="course-card" key={course.id}>

    <img
        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
        alt="Course"
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

    <div className="course-actions">

        <button
    onClick={() => {

        setSelectedCourse(course);

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

    }}
>
    Edit Course
</button>

        <button
            className="delete-btn"
            onClick={() =>
                deleteCourse(course.id)
            }
        >
            Delete
        </button>

    </div>

</div>
            ))}
        </div>
        </div>
    );
}

export default CourseList;