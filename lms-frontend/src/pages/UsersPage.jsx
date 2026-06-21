import { useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

function UsersPage() {

    const [selectedUser, setSelectedUser] = useState(null);

    const [refresh, setRefresh] = useState(false);

    return (
        <div>
            <h1>Users</h1>

            <UserForm
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                refresh={refresh}
                setRefresh={setRefresh}
            />

            <hr />

            <UserList
                setSelectedUser={setSelectedUser}
                refresh={refresh}
            />
        </div>
    );
}

export default UsersPage;