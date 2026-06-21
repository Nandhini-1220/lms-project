import { useEffect, useState } from "react";
import axios from "axios";

function EnrollmentForm({
    refresh,
    setRefresh,
    selectedEnrollment,
    setSelectedEnrollment
}) {

    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);

    const [userId, setUserId] = useState("");
    const [courseId, setCourseId] = useState("");
    const [enrollmentDate, setEnrollmentDate] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {

        axios.get("http://localhost:8080/users")
            .then((response) => {
                setUsers(response.data);
            });

        axios.get("http://localhost:8080/courses")
            .then((response) => {
                setCourses(response.data);
            });

    }, []);

    useEffect(() => {

        if (selectedEnrollment) {
            setUserId(selectedEnrollment.userId);
            setCourseId(selectedEnrollment.courseId);
            setEnrollmentDate(selectedEnrollment.enrollmentDate);
            setStatus(selectedEnrollment.status);
        }

    }, [selectedEnrollment]);

    const clearForm = () => {

        setUserId("");
        setCourseId("");
        setEnrollmentDate("");
        setStatus("");

        setSelectedEnrollment(null);
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const enrollment = {
            userId,
            courseId,
            enrollmentDate,
            status
        };

        if (selectedEnrollment) {

            axios.put(
                `http://localhost:8080/enrollments/${selectedEnrollment.id}`,
                enrollment
            )
                .then(() => {

                    alert("Enrollment Updated Successfully!");

                    setRefresh(!refresh);

                    clearForm();
                })
                .catch((error) => {
                    console.error(error);
                });

        } else {

            axios.post(
                "http://localhost:8080/enrollments",
                enrollment
            )
                .then(() => {

                    alert("Enrollment Added Successfully!");

                    setRefresh(!refresh);

                    clearForm();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    return (
        <div>

            <h2>
                {selectedEnrollment
                    ? "Update Enrollment"
                    : "Enroll Student"}
            </h2>

            <form onSubmit={handleSubmit}>

                <select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                >
                    <option value="">Select User</option>

                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>

                <br /><br />

                <select
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    required
                >
                    <option value="">Select Course</option>

                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.title}
                        </option>
                    ))}
                </select>

                <br /><br />

                <input
                    type="date"
                    value={enrollmentDate}
                    onChange={(e) =>
                        setEnrollmentDate(e.target.value)
                    }
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    {selectedEnrollment
                        ? "Update Enrollment"
                        : "Enroll"}
                </button>

            </form>

        </div>
    );
}

export default EnrollmentForm;