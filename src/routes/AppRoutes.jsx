import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainChat from "../pages/MainChat";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/admin/login" />}/>
        <Route exact path="/chat" element={<MainChat />} />
        <Route exact path="/admin/*" element={<PublicRoutes />} />
      </Routes>
    </Router>
  );
};
export default AppRoutes;
