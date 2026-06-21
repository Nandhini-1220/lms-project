import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignupPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSignup = (e) => {

        e.preventDefault();

        axios.post(
            "http://localhost:8080/auth/signup",
            {
                name,
                email,
                password,
                role
            }
        )
        .then(() => {

            alert("Signup Successful!");

            setName("");
            setEmail("");
            setPassword("");
            setRole("");
        })
        .catch((error) => {
            console.error(error);
            alert("Signup Failed!");
        });
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

            <h1>Signup</h1>

            <form onSubmit={handleSignup}>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                />

                <br /><br />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <br /><br />

                <select
                    value={role}
                    onChange={(e) =>
                        setRole(e.target.value)
                    }
                    required
                >
                    <option value="">
                        Select Role
                    </option>

                    <option value="STUDENT">
                        Student
                    </option>

                    <option value="INSTRUCTOR">
                        Instructor
                    </option>

                    <option value="ADMIN">
                        Admin
                    </option>

                </select>

                <br /><br />

                <button type="submit">
                    Signup
                </button>

            </form>

            <br />

            <p>
                Already have an account?{" "}
                <Link to="/">
                    Login
                </Link>
            </p>
            </div>
        </div>
    );
}

export default SignupPage;