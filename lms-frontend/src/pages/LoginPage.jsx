import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {

        e.preventDefault();

        axios.post(
            "http://localhost:8080/auth/login",
            {
                email,
                password
            }
        )
        .then((response) => {

            if(response.data) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data)
                );

                const role = response.data.role;

                if(role === "INSTRUCTOR") {
                    navigate("/instructor");
                }
                else if (response.data.role === "ADMIN") {
                    navigate("/admin");
                }
                else {
                    navigate("/student");
                }
            }
            else {
                alert("Invalid Credentials");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Login Failed");
        });
    };

    return (
        
        <div className ="auth-page">
            
            <div className="auth-card">

            <h4 className="app-name">Learning Management System</h4>

            <h1>Login</h1>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br /><br />

                <button type="submit" className="auth-btn">
                    Login
                </button>


                <p className="auth-link">
                    New User?
                    <a href="/signup">Signup Here</a>
                </p>

            </form>
            </div>

        </div>
    );
}

export default LoginPage;