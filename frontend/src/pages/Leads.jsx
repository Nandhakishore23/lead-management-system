import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const statusOptions = ["new", "contacted", "qualified", "lost", "won"];
const sourceOptions = [
  "website",
  "facebook_ads",
  "google_ads",
  "referral",
  "events",
  "other",
];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(true); // toggle for mobile
  const [filters, setFilters] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    city: "",
    state: "",
    status: [],
    source: [],
    score_gte: "",
    score_lte: "",
    lead_value_gte: "",
    lead_value_lte: "",
    is_qualified: false,
    created_at_from: "",
    created_at_to: "",
  });

  const navigate = useNavigate();

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      first_name: "",
      last_name: "",
      email: "",
      company: "",
      city: "",
      state: "",
      status: [],
      source: [],
      score_gte: "",
      score_lte: "",
      lead_value_gte: "",
      lead_value_lte: "",
      is_qualified: false,
      created_at_from: "",
      created_at_to: "",
    });
    setPage(1);
    fetchLeads();
  };

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    ["first_name", "last_name", "email", "company", "city", "state"].forEach(
      (field) => {
        if (filters[field]) params.append(`${field}__contains`, filters[field]);
      }
    );

    if (filters.status.length)
      params.append(`status__in`, filters.status.join(","));
    if (filters.source.length)
      params.append(`source__in`, filters.source.join(","));

    if (filters.score_gte || filters.score_lte) {
      params.append(
        `score__between`,
        `${filters.score_gte || 0},${filters.score_lte || 100}`
      );
    }
    if (filters.lead_value_gte || filters.lead_value_lte) {
      params.append(
        `lead_value__between`,
        `${filters.lead_value_gte || 0},${filters.lead_value_lte || 100000}`
      );
    }

    params.append(`is_qualified`, filters.is_qualified);

    if (filters.created_at_from || filters.created_at_to) {
      const from = filters.created_at_from || "1970-01-01";
      const to =
        filters.created_at_to || new Date().toISOString().split("T")[0];
      params.append(`created_at__between`, `${from},${to}`);
    }

    params.append("page", page);
    params.append("limit", limit);
    return params.toString();
  };

  const fetchLeads = async () => {
    try {
      const query = buildQueryParams();
      const res = await api.get(`/leads?${query}`);
      setLeads(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page]);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Leads</h1>
        <button
          className="md:hidden px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          {filtersOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filters Panel */}
      {filtersOpen && (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "first_name",
              "last_name",
              "email",
              "company",
              "city",
              "state",
            ].map((f) => (
              <input
                key={f}
                type="text"
                placeholder={f.replace("_", " ").toUpperCase()}
                value={filters[f]}
                onChange={(e) => handleFilterChange(f, e.target.value)}
                className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
              />
            ))}

            {/* Status */}
            <select
              multiple
              value={filters.status}
              onChange={(e) =>
                handleFilterChange(
                  "status",
                  Array.from(e.target.selectedOptions, (o) => o.value)
                )
              }
              className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Source */}
            <select
              multiple
              value={filters.source}
              onChange={(e) =>
                handleFilterChange(
                  "source",
                  Array.from(e.target.selectedOptions, (o) => o.value)
                )
              }
              className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
            >
              {sourceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Numbers */}
            <input
              type="number"
              placeholder="Score Min"
              value={filters.score_gte}
              onChange={(e) => handleFilterChange("score_gte", e.target.value)}
              className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Score Max"
              value={filters.score_lte}
              onChange={(e) => handleFilterChange("score_lte", e.target.value)}
              className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Lead Value Min"
              value={filters.lead_value_gte}
              onChange={(e) =>
                handleFilterChange("lead_value_gte", e.target.value)
              }
              className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Lead Value Max"
              value={filters.lead_value_lte}
              onChange={(e) =>
                handleFilterChange("lead_value_lte", e.target.value)
              }
              className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
            />

            {/* Date Range */}
            <input
              type="date"
              value={filters.created_at_from}
              onChange={(e) =>
                handleFilterChange("created_at_from", e.target.value)
              }
              className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={filters.created_at_to}
              onChange={(e) =>
                handleFilterChange("created_at_to", e.target.value)
              }
              className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
            />

            {/* Qualified */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.is_qualified}
                onChange={(e) =>
                  handleFilterChange("is_qualified", e.target.checked)
                }
              />
              Qualified
            </label>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setPage(1);
                fetchLeads();
              }}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {[
                "First Name",
                "Last Name",
                "Email",
                "Phone",
                "Company",
                "City",
                "State",
                "Status",
                "Source",
                "Score",
                "Lead Value",
                "Qualified",
              ].map((h) => (
                <th key={h} className="border px-2 py-1 text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{lead.first_name}</td>
                <td className="border px-2 py-1">{lead.last_name}</td>
                <td className="border px-2 py-1">{lead.email}</td>
                <td className="border px-2 py-1">{lead.phone}</td>
                <td className="border px-2 py-1">{lead.company}</td>
                <td className="border px-2 py-1">{lead.city}</td>
                <td className="border px-2 py-1">{lead.state}</td>
                <td className="border px-2 py-1">
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                    {lead.status}
                  </span>
                </td>
                <td className="border px-2 py-1">
                  <span className="px-2 py-1 rounded bg-green-100 text-green-800">
                    {lead.source}
                  </span>
                </td>
                <td className="border px-2 py-1">{lead.score}</td>
                <td className="border px-2 py-1">{lead.lead_value}</td>
                <td className="border px-2 py-1">
                  {lead.is_qualified ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Advanced Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
        {/* First Page */}
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {"<<"}
        </button>

        {/* Previous Page */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(
            (p) =>
              p === 1 || p === totalPages || (p >= page - 2 && p <= page + 2)
          )
          .map((p, idx, arr) => {
            if (idx > 0 && p - arr[idx - 1] > 1) {
              return (
                <span key={`dots-${p}`} className="px-2 py-1 text-gray-500">
                  ...
                </span>
              );
            }
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded ${
                  p === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {p}
              </button>
            );
          })}

        {/* Next Page */}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next
        </button>

        {/* Last Page */}
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
