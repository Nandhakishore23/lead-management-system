const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Lead = require('../models/Lead');
const { parseFilters } = require('../utils/filterParser');

// Create lead -> POST /api/leads
router.post('/', auth, async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    return res.status(201).json(lead);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Email must be unique' });
    return res.status(400).json({ message: err.message });
  }
});

// List leads with pagination & filters -> GET /api/leads
router.get('/', auth, async (req, res) => {
  let { page = 1, limit = 20 } = req.query;
  page = Math.max(1, Number(page));
  limit = Math.min(100, Number(limit) || 20);
  const skip = (page - 1) * limit;

  const filters = parseFilters(req.query);

  const [total, data] = await Promise.all([
    Lead.countDocuments(filters),
    Lead.find(filters).sort({ created_at: -1 }).skip(skip).limit(limit)
  ]);

  return res.status(200).json({
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  });
});

// Get single lead -> GET /api/leads/:id
router.get('/:id', auth, async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  return res.status(200).json(lead);
});

// Update lead -> PUT /api/leads/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    return res.status(200).json(lead);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Email must be unique' });
    return res.status(400).json({ message: err.message });
  }
});

// Delete lead -> DELETE /api/leads/:id
router.delete('/:id', auth, async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  return res.status(200).json({ message: 'Deleted' });
});

module.exports = router;
