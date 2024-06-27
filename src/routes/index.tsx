import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "src/pages/dashboard";

const PrivateRoute = () => {
    return (
        <Routes>
            <Fragment>
                <Route path="/" element={<DashboardPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Fragment>
        </Routes>
    );
};

export default PrivateRoute;
