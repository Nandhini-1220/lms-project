import { useState, useEffect } from "react";
import axios from "axios";

function CourseForm({ selectedCourse, setSelectedCourse, refresh, setRefresh }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [instructor, setInstructor] = useState("");
    const [category, setCategory] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {

        if (selectedCourse) {
            setTitle(selectedCourse.title);
            setDescription(selectedCourse.description);
            setInstructor(selectedCourse.instructor);
            setCategory(selectedCourse.category);
            setDuration(selectedCourse.duration);
            setPrice(selectedCourse.price);
        }

    }, [selectedCourse]);

    const clearForm = () => {

    setTitle("");
    setDescription("");
    setInstructor("");
    setCategory("");
    setDuration("");
    setPrice("");

    setSelectedCourse(null);
};

    const handleSubmit = (e) => {
        e.preventDefault();

        const course = {
            title,
            description,
            instructor,
            category,
            duration,
            price
        };

        if (selectedCourse) {

        axios.put(
            `http://localhost:8080/courses/${selectedCourse.id}`,
            course
        )
        .then(() => {
            alert("Course Updated Successfully!");
            setRefresh(!refresh);
            clearForm();
        })
        .catch((error) => {
            console.error(error);
        });

    } else {

        axios.post("http://localhost:8080/courses", course)
            .then(() => {
                alert("Course Added Successfully!");
                setRefresh(!refresh);
                clearForm();
            })
            .catch((error) => {
                console.error(error);
            });

    }
    };

    return (
        <div className="form-card">
            <h2>
    {selectedCourse ? "Update Course" : "Add Course"}
</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Instructor"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <br /><br />

                <button type="submit">{selectedCourse ? "Update Course" : "Add Course"}</button>

            </form>
        </div>
    );
}

export default CourseForm;