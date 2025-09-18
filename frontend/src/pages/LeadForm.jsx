import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const initial = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company: '',
  city: '',
  state: '',
  source: 'other',
  status: 'new',
  score: 0,
  lead_value: 0,
  is_qualified: false,
  last_activity_at: '',
};

export default function LeadForm() {
  const { id } = useParams();
  const [form, setForm] = useState(initial);
  const nav = useNavigate();
  const editMode = Boolean(id);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await api.get(`/leads/${id}`);
        const data = res.data;
        setForm({
          ...data,
          last_activity_at: data.last_activity_at
            ? new Date(data.last_activity_at).toISOString().slice(0, 16)
            : '',
        });
      } catch (err) {
        alert(err.response?.data?.message || 'Failed fetching lead');
      }
    })();
  }, [id]);

  const handle = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (!payload.last_activity_at) delete payload.last_activity_at;
      if (editMode) {
        await api.put(`/leads/${id}`, payload);
        alert('Updated');
      } else {
        await api.post('/leads', payload);
        alert('Created');
      }
      nav('/leads');
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <form
        onSubmit={submit}
        className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-6 md:p-10 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {editMode ? 'Edit Lead' : 'Create Lead'}
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="First name"
              value={form.first_name}
              onChange={(e) => handle('first_name', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Last name"
              value={form.last_name}
              onChange={(e) => handle('last_name', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handle('email', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => handle('phone', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Company"
              value={form.company}
              onChange={(e) => handle('company', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="City"
              value={form.city}
              onChange={(e) => handle('city', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Source</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.source}
              onChange={(e) => handle('source', e.target.value)}
            >
              <option value="website">website</option>
              <option value="facebook_ads">facebook_ads</option>
              <option value="google_ads">google_ads</option>
              <option value="referral">referral</option>
              <option value="events">events</option>
              <option value="other">other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.status}
              onChange={(e) => handle('status', e.target.value)}
            >
              <option value="new">new</option>
              <option value="contacted">contacted</option>
              <option value="qualified">qualified</option>
              <option value="lost">lost</option>
              <option value="won">won</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Score</label>
            <input
              type="number"
              min="0"
              max="100"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.score}
              onChange={(e) => handle('score', Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lead Value</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.lead_value}
              onChange={(e) => handle('lead_value', Number(e.target.value))}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Last Activity
            </label>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={form.last_activity_at}
              onChange={(e) => handle('last_activity_at', e.target.value)}
            />
          </div>
          <div className="md:col-span-2 flex items-center space-x-2">
            <input
              id="qualified"
              type="checkbox"
              className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
              checked={form.is_qualified}
              onChange={(e) => handle('is_qualified', e.target.checked)}
            />
            <label htmlFor="qualified" className="text-sm font-medium">
              Qualified
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          {editMode ? 'Update Lead' : 'Create Lead'}
        </button>
      </form>
    </div>
  );
}
