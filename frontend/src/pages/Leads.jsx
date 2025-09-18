// // import React, { useEffect, useState } from 'react';
// // import { AgGridReact } from 'ag-grid-react';
// // import api from '../services/api';
// // // import 'ag-grid-community/dist/styles/ag-grid.css';
// // // import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// // // ✅ Correct imports for AG Grid 34.x
// // import "ag-grid-community/styles/ag-grid.css";
// // import "ag-grid-community/styles/ag-theme-alpine.css";

// // import { useNavigate } from 'react-router-dom';

// // export default function Leads() {
// //   const [rows, setRows] = useState([]);
// //   const [page, setPage] = useState(1);
// //   const [limit] = useState(20);
// //   const [total, setTotal] = useState(0);
// //   const [filters, setFilters] = useState({}); // { 'email__contains': 'acme' }
// //   const nav = useNavigate();

// //   const colDefs = [
// //     { field: 'first_name' },
// //     { field: 'last_name' },
// //     { field: 'email' },
// //     { field: 'phone' },
// //     { field: 'company' },
// //     { field: 'city' },
// //     { field: 'status' },
// //     { field: 'source' },
// //     { field: 'score' },
// //     { field: 'lead_value' },
// //     { field: 'is_qualified' },
// //     { headerName: 'Actions', field: '_id', cellRenderer: params => {
// //         return `<button data-id="${params.value}" class="edit-btn">Edit</button>
// //                 <button data-id="${params.value}" class="del-btn">Del</button>`;
// //       }, suppressSizeToFit: true
// //     }
// //   ];

// //   const fetchLeads = async (p = 1, f = filters) => {
// //     const params = { page: p, limit, ...f };
// //     const res = await api.get('/leads', { params });
// //     setRows(res.data.data);
// //     setPage(res.data.page);
// //     setTotal(res.data.total);
// //   };

// //   useEffect(() => { fetchLeads(1); }, []);

// //   // simple DOM delegation for action buttons inside AG Grid
// //   useEffect(() => {
// //     const onClick = async (e) => {
// //       const edit = e.target.closest('.edit-btn');
// //       const del = e.target.closest('.del-btn');
// //       if (edit) {
// //         const id = edit.dataset.id;
// //         nav(`/leads/${id}/edit`);
// //       } else if (del) {
// //         if (!confirm('Delete lead?')) return;
// //         const id = del.dataset.id;
// //         try {
// //           await api.delete(`/leads/${id}`);
// //           await fetchLeads(page);
// //         } catch (err) {
// //           alert(err.response?.data?.message || 'Delete failed');
// //         }
// //       }
// //     };
// //     document.addEventListener('click', onClick);
// //     return () => document.removeEventListener('click', onClick);
// //   }, [page]);

// //   // filter form
// //   const [emailContains, setEmailContains] = useState('');
// //   const applyFilter = () => {
// //     const f = {};
// //     if (emailContains) f['email__contains'] = emailContains;
// //     setFilters(f);
// //     fetchLeads(1, f);
// //   };

// //   return (
// //     <div style={{ padding: 12 }}>
// //       <h2>Leads</h2>

// //       <div style={{ marginBottom: 12 }}>
// //         <input placeholder="Email contains" value={emailContains} onChange={e => setEmailContains(e.target.value)} />
// //         <button onClick={applyFilter}>Apply</button>
// //         <button onClick={() => { setEmailContains(''); setFilters({}); fetchLeads(1, {}); }}>Clear</button>
// //       </div>

// //       <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
// //         <AgGridReact
// //           rowData={rows}
// //           columnDefs={colDefs}
// //           domLayout='autoHeight'
// //           frameworkComponents={{}}
// //           pagination={false}
// //           rowSelection='single'
// //         />
// //       </div>

// //       <div style={{ marginTop: 12 }}>
// //         <button onClick={() => { if (page > 1) fetchLeads(page - 1); }}>Prev</button>
// //         <span style={{ margin: '0 12px' }}>Page {page} — Total {total}</span>
// //         <button onClick={() => { if (rows.length === limit) fetchLeads(page + 1); }}>Next</button>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import api from "../services/api";
// import { useNavigate } from "react-router-dom";

// const Leads = () => {
//   const [leads, setLeads] = useState([]);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(20);
//   const [totalPages, setTotalPages] = useState(1);
//   const navigate = useNavigate();

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await api.get(`/leads?page=${page}&limit=${limit}`);
//         setLeads(res.data.data);
//         setTotalPages(res.data.totalPages);
//       } catch (err) {
//         if (err.response?.status === 401) {
//           navigate("/login");
//         }
//       }
//     })();
//   }, [page, limit, navigate]);

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Leads</h1>
//       <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border border-gray-400 px-2 py-1">First Name</th>
//             <th className="border border-gray-400 px-2 py-1">Last Name</th>
//             <th className="border border-gray-400 px-2 py-1">Email</th>
//             <th className="border border-gray-400 px-2 py-1">Phone</th>
//             <th className="border border-gray-400 px-2 py-1">Company</th>
//             <th className="border border-gray-400 px-2 py-1">City</th>
//             <th className="border border-gray-400 px-2 py-1">State</th>
//             <th className="border border-gray-400 px-2 py-1">Status</th>
//             <th className="border border-gray-400 px-2 py-1">Score</th>
//             <th className="border border-gray-400 px-2 py-1">Lead Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           {leads.map((lead) => (
//             <tr key={lead._id} className="hover:bg-gray-50">
//               <td className="border border-gray-300 px-2 py-1">{lead.first_name}</td>
//               <td className="border border-gray-300 px-2 py-1">{lead.last_name}</td>
//               <td className="border border-gray-300 px-2 py-1">{lead.email}</td>
//               <td className="border border-gray-300 px-2 py-1">{lead.phone}</td>
//               <td className="border border-gray-300 px-2 py-1">{lead.company}</td>
//               <td className="border border-gray-300 px-2 py-1">{lead.city}</td>
//               <td className="border border-gray-300 px-2 py-1">{lead.state}</td>
//               <td className="border border-gray-300 px-2 py-1">{lead.status}</td>
//               <td className="border border-gray-300 px-2 py-1">{lead.score}</td>
//               <td className="border border-gray-300 px-2 py-1">{lead.lead_value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination controls */}
//       <div className="flex justify-between items-center mt-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//           className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
//         >
//           Previous
//         </button>
//         <span>
//           Page {page} of {totalPages}
//         </span>
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//           className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Leads;


import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/leads?page=${page}&limit=${limit}`);
        setLeads(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
      }
    })();
  }, [page, limit, navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">📋 Leads Dashboard</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto border-collapse shadow-md rounded-xl overflow-hidden">
          <thead className="bg-indigo-600 text-white sticky top-0">
            <tr>
              <th className="px-4 py-2 text-left">First Name</th>
              <th className="px-4 py-2 text-left">Last Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Company</th>
              <th className="px-4 py-2 text-left">City</th>
              <th className="px-4 py-2 text-left">State</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Score</th>
              <th className="px-4 py-2 text-left">Lead Value</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="px-4 py-2">{lead.first_name}</td>
                <td className="px-4 py-2">{lead.last_name}</td>
                <td className="px-4 py-2">{lead.email}</td>
                <td className="px-4 py-2">{lead.phone}</td>
                <td className="px-4 py-2">{lead.company}</td>
                <td className="px-4 py-2">{lead.city}</td>
                <td className="px-4 py-2">{lead.state}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      lead.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-2">{lead.score}</td>
                <td className="px-4 py-2 font-semibold">{lead.lead_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">
                {lead.first_name} {lead.last_name}
              </h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  lead.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {lead.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{lead.email}</p>
            <p className="text-sm text-gray-600">{lead.phone}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <p>
                <span className="font-medium">Company:</span> {lead.company}
              </p>
              <p>
                <span className="font-medium">City:</span> {lead.city}
              </p>
              <p>
                <span className="font-medium">State:</span> {lead.state}
              </p>
              <p>
                <span className="font-medium">Score:</span> {lead.score}
              </p>
              <p>
                <span className="font-medium">Value:</span> {lead.lead_value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-600 transition-colors"
        >
          ⬅ Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-600 transition-colors"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Leads;
