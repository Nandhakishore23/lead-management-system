// // import React from "react";
// // import { Link, Outlet } from "react-router-dom";

// // export default function Layout() {
// //   return (
// //     <div className="flex h-screen bg-gray-100">
// //       {/* Sidebar */}
// //       <aside className="w-64 bg-white shadow-xl flex flex-col">
// //         <div className="text-2xl font-bold text-center py-6 border-b">
// //           Lead Manager
// //         </div>
// //         <nav className="flex flex-col gap-2 p-4">
// //           <Link
// //             to="/leads"
// //             className="px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
// //           >
// //             Leads
// //           </Link>
// //           <Link
// //             to="/dashboard"
// //             className="px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
// //           >
// //             Dashboard
// //           </Link>
// //         </nav>
// //       </aside>

// //       {/* Content Area */}
// //       <div className="flex-1 flex flex-col">
// //         <header className="bg-white shadow p-4 flex justify-between items-center">
// //           <h1 className="text-xl font-semibold">Lead Management System</h1>
// //           <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
// //             Logout
// //           </button>
// //         </header>
// //         <main className="p-6 overflow-auto">
// //           <Outlet />
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useState } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import {
//   Bars3Icon,
//   XMarkIcon,
//   Squares2X2Icon,
//   UsersIcon,
//   ArrowRightOnRectangleIcon,
// } from "@heroicons/react/24/outline";

// export default function Layout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Add logout logic here (clear token etc.)
//     navigate("/login");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:static z-30 inset-y-0 left-0 transform ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 w-64 bg-white shadow-xl flex flex-col transition-transform duration-200`}
//       >
//         <div className="text-2xl font-bold text-center py-6 border-b bg-blue-600 text-white">
//           Lead Manager
//         </div>
//         <nav className="flex flex-col gap-2 p-4">
//           <Link
//             to="/leads"
//             className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 transition"
//           >
//             <UsersIcon className="h-5 w-5 text-blue-500" />
//             Leads
//           </Link>
//           <Link
//             to="/dashboard"
//             className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700 transition"
//           >
//             <Squares2X2Icon className="h-5 w-5 text-blue-500" />
//             Dashboard
//           </Link>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-2 mt-auto rounded-lg hover:bg-red-100 text-red-600 transition"
//           >
//             <ArrowRightOnRectangleIcon className="h-5 w-5" />
//             Logout
//           </button>
//         </nav>
//       </aside>

//       {/* Content Area */}
//       <div className="flex-1 flex flex-col">
//         <header className="bg-white shadow px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-10">
//           <div className="flex items-center gap-3">
//             <button
//               className="lg:hidden p-2 rounded-md hover:bg-gray-100"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               {sidebarOpen ? (
//                 <XMarkIcon className="h-6 w-6 text-gray-700" />
//               ) : (
//                 <Bars3Icon className="h-6 w-6 text-gray-700" />
//               )}
//             </button>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Lead Management System
//             </h1>
//           </div>
//           <div className="hidden lg:block">
//             <button
//               onClick={handleLogout}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//             >
//               Logout
//             </button>
//           </div>
//         </header>

//         <main className="p-4 md:p-6 overflow-auto bg-gray-50 flex-1">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
