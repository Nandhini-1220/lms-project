import { useEffect, useState } from "react";
import axios from "axios";

function EnrollmentList({refresh, setSelectedEnrollment}) {

    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:8080/enrollments")
            .then((response) => {
                setEnrollments(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [refresh]);

    const deleteEnrollment = (id) => {

        if (!window.confirm("Delete Enrollment?")) {
            return;
        }

        axios.delete(
            `http://localhost:8080/enrollments/${id}`
        )
            .then(() => {

                setEnrollments(
                    enrollments.filter(
                        enrollment => enrollment.id !== id
                    )
                );

            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>

            <h2>All Enrollments</h2>

            {enrollments.map((enrollment) => (

                <div key={enrollment.id}>

                    <p>
                        User ID: {enrollment.userId}
                    </p>

                    <p>
                        Course ID: {enrollment.courseId}
                    </p>

                    <p>
                        Date: {enrollment.enrollmentDate}
                    </p>

                    <p>
                        Status: {enrollment.status}
                    </p>

                    <button
                        onClick={() =>
                            deleteEnrollment(
                                enrollment.id
                            )
                        }
                    >
                        Delete
                    </button>

                    <button
                        onClick={() =>
                        setSelectedEnrollment(enrollment)
                    }
                    >
                        Edit
                    </button>

                    <hr />

                </div>

            ))}

        </div>
    );
}

export default EnrollmentList;