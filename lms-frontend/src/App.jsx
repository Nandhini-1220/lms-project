import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import AdminPage from "./pages/AdminPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import DashboardPage from "./pages/DashboardPage";
import StudentPage from "./pages/StudentPage";
import InstructorPage from "./pages/InstructorPage";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    path="/signup"
                    element={<SignupPage />}
                />

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/student"
                    element={<StudentPage />}
                />

                <Route
                    path="/instructor"
                    element={<InstructorPage />}
                />

                <Route
                    path="/course/:id"
                    element={<CourseDetailsPage />}
                />

                <Route
                    path="/admin"
                    element={<AdminPage />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;