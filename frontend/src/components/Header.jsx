// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import api from '../services/api';

// // // export default function Header() {
// // //   const handleLogout = async () => {
// // //     await api.post('/auth/logout');
// // //     window.location.href = '/login';
// // //   };

// // //   return (
// // //     <header style={{ display: 'flex', gap: 12, padding: 12 }}>
// // //       <Link to="/leads">Leads</Link>
// // //       <Link to="/leads/new">Create Lead</Link>
// // //       <button onClick={handleLogout}>Logout</button>
// // //     </header>
// // //   );
// // // }


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await api.post("/auth/logout");
//     navigate("/login");
//   };

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Brand */}
//           <div className="flex-shrink-0">
//             <Link to="/leads" className="text-xl font-bold text-blue-600">
//               Lead Manager
//             </Link>
//           </div>

//           {/* Desktop Links */}
//           <nav className="hidden md:flex space-x-6 items-center">
//             <Link
//               to="/leads"
//               className="text-gray-700 hover:text-blue-600 transition font-medium"
//             >
//               Leads
//             </Link>
//             <Link
//               to="/leads/new"
//               className="text-gray-700 hover:text-blue-600 transition font-medium"
//             >
//               Create Lead
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//             >
//               Logout
//             </button>
//           </nav>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
//             >
//               {menuOpen ? (
//                 <XMarkIcon className="h-6 w-6 text-gray-700" />
//               ) : (
//                 <Bars3Icon className="h-6 w-6 text-gray-700" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white border-t shadow-md">
//           <nav className="flex flex-col p-4 space-y-3">
//             <Link
//               to="/leads"
//               onClick={() => setMenuOpen(false)}
//               className="text-gray-700 hover:text-blue-600 transition font-medium"
//             >
//               Leads
//             </Link>
//             <Link
//               to="/leads/new"
//               onClick={() => setMenuOpen(false)}
//               className="text-gray-700 hover:text-blue-600 transition font-medium"
//             >
//               Create Lead
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full text-left"
//             >
//               Logout
//             </button>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import api from "../services/api";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ Check login state once on mount
//   useEffect(() => {
//     const token = localStorage.getItem("loggedIn");
//     setLoggedIn(token === "true");
//   }, []);

//   // ✅ Re-check when route changes (handles logout redirect)
//   useEffect(() => {
//     const token = localStorage.getItem("loggedIn");
//     setLoggedIn(token === "true");
//   }, [location.pathname]);

//   const handleLogout = async () => {
//     try {
//       await api.post("/auth/logout");
//     } catch (e) {
//       // ignore errors from server
//     }
//     localStorage.removeItem("loggedIn");
//     setLoggedIn(false);
//     navigate("/login");
//   };

//   // ✅ Hide header on login page or if not logged in
//   if (!loggedIn || location.pathname === "/login") {
//     return null;
//   }

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Brand */}
//           <Link
//             to="/leads"
//             className="text-xl font-bold text-blue-600 hover:text-blue-700 transition"
//           >
//             Lead Manager
//           </Link>

//           {/* Desktop Links */}
//           <nav className="hidden md:flex space-x-6 items-center">
//             <Link
//               to="/leads"
//               className="text-gray-700 hover:text-blue-600 transition font-medium"
//             >
//               Leads
//             </Link>
//             <Link
//               to="/leads/new"
//               className="text-gray-700 hover:text-blue-600 transition font-medium"
//             >
//               Create Lead
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//             >
//               Logout
//             </button>
//           </nav>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
//             >
//               {menuOpen ? (
//                 <XMarkIcon className="h-6 w-6 text-gray-700" />
//               ) : (
//                 <Bars3Icon className="h-6 w-6 text-gray-700" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {menuOpen && (
//         <div className="md:hidden bg-white border-t shadow-md">
//           <nav className="flex flex-col p-4 space-y-3">
//             <Link
//               to="/leads"
//               onClick={() => setMenuOpen(false)}
//               className="text-gray-700 hover:text-blue-600 transition font-medium"
//             >
//               Leads
//             </Link>
//             <Link
//               to="/leads/new"
//               onClick={() => setMenuOpen(false)}
//               className="text-gray-700 hover:text-blue-600 transition font-medium"
//             >
//               Create Lead
//             </Link>
//             <button
//               onClick={() => {
//                 setMenuOpen(false);
//                 handleLogout();
//               }}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full text-left"
//             >
//               Logout
//             </button>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Check login state once
  useEffect(() => {
    const token = localStorage.getItem("loggedIn");
    setLoggedIn(token === "true");
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {}
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    navigate("/login");
  };

  // Hide header if not logged in or on login/register pages
  if (!loggedIn || location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/leads"
            className="text-xl font-bold text-blue-600 hover:text-blue-700 transition"
          >
            Lead Manager
          </Link>

          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/leads" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Leads
            </Link>
            <Link to="/leads/new" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Create Lead
            </Link>
            <button
              onClick={handleLogout}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Logout
            </button>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              {menuOpen ? <XMarkIcon className="h-6 w-6 text-gray-700" /> : <Bars3Icon className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col p-4 space-y-3">
            <Link to="/leads" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 transition font-medium">
              Leads
            </Link>
            <Link to="/leads/new" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 transition font-medium">
              Create Lead
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full text-left"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
