// parse query params like field__op=val -> returns Mongo filter combined with AND
const parseFilters = (qs = {}) => {
  const filter = {};
  for (const [k, v] of Object.entries(qs)) {
    if (!k.includes('__')) continue;
    const [field, op] = k.split('__');
    if (!v) continue;

    // String fields: equals, contains
    if (['email','company','city','first_name','last_name','state'].includes(field)) {
      if (op === 'equals') filter[field] = v;
      if (op === 'contains') filter[field] = { $regex: v, $options: 'i' };
    }
    // Enums: equals, in
    else if (['status','source'].includes(field)) {
      if (op === 'equals') filter[field] = v;
      if (op === 'in') filter[field] = { $in: v.split(',') };
    }
    // Numbers: equals, gt, lt, between
    else if (['score','lead_value'].includes(field)) {
      if (op === 'equals') filter[field] = Number(v);
      if (op === 'gt') filter[field] = { $gt: Number(v) };
      if (op === 'lt') filter[field] = { $lt: Number(v) };
      if (op === 'between') {
        const [a,b] = v.split(',').map(Number);
        filter[field] = { $gte: a, $lte: b };
      }
    }
    // Dates: on, before, after, between (use ISO date strings)
    else if (['created_at','last_activity_at'].includes(field)) {
      if (op === 'on') {
        const day = new Date(v);
        const next = new Date(day);
        next.setDate(next.getDate() + 1);
        filter[field] = { $gte: day, $lt: next };
      }
      if (op === 'before') filter[field] = { $lt: new Date(v) };
      if (op === 'after') filter[field] = { $gt: new Date(v) };
      if (op === 'between') {
        const [a,b] = v.split(',');
        filter[field] = { $gte: new Date(a), $lte: new Date(b) };
      }
    }
    // Boolean
    else if (field === 'is_qualified') {
      filter[field] = (v === 'true' || v === '1');
    }
  }
  return filter;
};

module.exports = { parseFilters };
