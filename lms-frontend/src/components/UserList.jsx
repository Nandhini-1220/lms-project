import { useEffect, useState } from "react";
import axios from "axios";

function UserList({ setSelectedUser, refresh }) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [refresh]);

    const deleteUser = (id) => {

        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axios.delete(`http://localhost:8080/users/${id}`)
            .then(() => {
                setUsers(
                    users.filter(user => user.id !== id)
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <h2>All Users</h2>

            {users.map((user) => (
                <div key={user.id}>

                    <h3>{user.name}</h3>

                    <p>Email: {user.email}</p>

                    <p>Role: {user.role}</p>

                    <button
                        onClick={() => deleteUser(user.id)}
                    >
                        Delete
                    </button>

                    {" "}

                    <button
                        onClick={() => setSelectedUser(user)}
                    >
                        Edit
                    </button>

                    <hr />

                </div>
            ))}
        </div>
    );
}

export default UserList;