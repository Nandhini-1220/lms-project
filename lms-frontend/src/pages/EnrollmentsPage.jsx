import { useState } from "react";
import EnrollmentForm from "../components/EnrollmentForm";
import EnrollmentList from "../components/EnrollmentList";

function EnrollmentsPage() {

    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [refresh, setRefresh] = useState(false);

    return (
        <div>

            <h1>Enrollments</h1>

            <EnrollmentForm
                selectedEnrollment={selectedEnrollment}
                setSelectedEnrollment={setSelectedEnrollment}
                refresh={refresh}
                setRefresh={setRefresh}
            />

            <hr />

            <EnrollmentList
                refresh={refresh}
                setSelectedEnrollment={setSelectedEnrollment}
            />

        </div>
    );
}

export default EnrollmentsPage;