import { useState, useEffect } from "react";
import axios from "axios";

function UserForm({ selectedUser, setSelectedUser, refresh, setRefresh }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {

        if (selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
            setPassword(selectedUser.password);
            setRole(selectedUser.role);
        }

    }, [selectedUser]);

    const clearForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setRole("");

        setSelectedUser(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            role
        };

        if (selectedUser) {

            axios.put(
                `http://localhost:8080/users/${selectedUser.id}`,
                user
            )
            .then(() => {
                alert("User Updated Successfully!");
                setRefresh(!refresh);
                clearForm();
            })
            .catch((error) => {
                console.error(error);
            });

        } else {

            axios.post("http://localhost:8080/users", user)
                .then(() => {
                    alert("User Added Successfully!");
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
                {selectedUser ? "Update User" : "Add User"}
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    {selectedUser ? "Update User" : "Add User"}
                </button>

            </form>
        </div>
    );
}

export default UserForm;