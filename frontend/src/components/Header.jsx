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
