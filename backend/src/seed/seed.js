require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Lead = require('../models/Lead');
const { faker } = require('@faker-js/faker');

const run = async () => {
  await connectDB();

  // WARNING: This wipes collections — only run for test DB
  await User.deleteMany({});
  await Lead.deleteMany({});

  const testUser = new User({ email: 'test@erino.io', password: 'Test1234', name: 'Test User' });
  await testUser.save();
  console.log('Created test user: test@erino.io / Test1234');

  const sources = ['website','facebook_ads','google_ads','referral','events','other'];
  const statuses = ['new','contacted','qualified','lost','won'];

  const leads = [];
  for (let i = 0; i < 120; i++) {
    leads.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: `lead${i}_${Date.now()%10000}@example.com`,
      phone: faker.phone.number(),
      company: faker.company.name(),
      city: faker.location.city(),
      state: faker.location.state(),
      source: sources[Math.floor(Math.random()*sources.length)],
      status: statuses[Math.floor(Math.random()*statuses.length)],
      score: Math.floor(Math.random()*101),
      lead_value: Number((Math.random()*10000).toFixed(2)),
      last_activity_at: faker.date.recent({ days: 90 }),
      is_qualified: Math.random() > 0.5
    });
  }

  await Lead.insertMany(leads);
  console.log('Inserted leads:', leads.length);
  process.exit(0);
};

run().catch(e => {
  console.error(e);
  process.exit(1);
});
