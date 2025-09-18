import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Leads from './pages/Leads';
import LeadForm from './pages/LeadForm';
import Header from './components/Header';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/leads/new" element={<LeadForm />} />
        <Route path="/leads/:id/edit" element={<LeadForm />} />
        <Route path="/" element={<Navigate to="/leads" replace />} />
      </Routes>
    </div>
  );
}


// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Leads from "./pages/Leads";
// import LeadForm from "./pages/LeadForm";
// import ProtectedLayout from "./components/ProtectedLayout";

// export default function App() {
//   const isLoggedIn = localStorage.getItem("loggedIn") === "true";

//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Protected routes */}
//       <Route element={<ProtectedLayout />}>
//         <Route path="/leads" element={isLoggedIn ? <Leads /> : <Navigate to="/login" />} />
//         <Route path="/leads/new" element={isLoggedIn ? <LeadForm /> : <Navigate to="/login" />} />
//         <Route path="/leads/:id/edit" element={isLoggedIn ? <LeadForm /> : <Navigate to="/login" />} />
//       </Route>

//       {/* Default redirect */}
//       <Route path="/" element={<Navigate to={isLoggedIn ? "/leads" : "/login"} />} />
//     </Routes>
//   );
// }
