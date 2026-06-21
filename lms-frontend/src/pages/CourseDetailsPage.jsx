import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CourseDetailsPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [course, setCourse] = useState(null);

    useEffect(() => {

        axios.get(
            `http://localhost:8080/courses/${id}`
        )
        .then((response) => {
            setCourse(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    }, [id]);

    if (!course) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="details-page">

            <button
                onClick={() => navigate(-1)}
            >
                Back
            </button>

            <br />
            <br />

            <div className="details-card">

                <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
                    alt="Course"
                />

                <h1>{course.title}</h1>

                <p>
                    <strong>Description:</strong>
                    {" "}
                    {course.description}
                </p>

                <p>
                    <strong>Instructor:</strong>
                    {" "}
                    {course.instructor}
                </p>

                <p>
                    <strong>Category:</strong>
                    {" "}
                    {course.category}
                </p>

                <p>
                    <strong>Duration:</strong>
                    {" "}
                    {course.duration} Hours
                </p>

                <p>
                    <strong>Price:</strong>
                    {" "}
                    ₹{course.price}
                </p>

            </div>

        </div>
    );
}

export default CourseDetailsPage;