require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const projects = [
  {
    title: 'Library Management System',
    description:
      'A centralized library operations platform designed to simplify book cataloging, member registration, lending, returns, and availability tracking. The system reduces manual record keeping through structured workflows, searchable inventory, overdue monitoring, and a responsive dashboard for efficient day-to-day administration.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
  },
  {
    title: 'Traveling Portal',
    description:
      'A modern travel discovery and planning portal that helps users explore destinations, review travel options, and organize trip information through one intuitive interface. Built around responsive navigation and reusable components, it delivers a smooth experience across desktop and mobile devices.',
    techStack: ['React', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    title: 'Attendance Portal',
    description:
      'A role-focused attendance management solution for recording, monitoring, and reviewing student attendance with greater accuracy. It replaces repetitive paperwork with organized digital records, clear attendance summaries, and streamlined workflows that help faculty identify trends and maintain dependable academic data.',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Dashboard UI'],
  },
  {
    title: 'Student Helping Desk',
    description:
      'A digital support platform that gives students a structured way to submit questions, report concerns, and track requests from creation to resolution. The portal centralizes communication, improves transparency, and helps administrators prioritize and manage student support efficiently.',
    techStack: [
      'MERN Stack',
      'REST API',
      'Authentication',
      'Responsive Design',
      'Workflow Management',
    ],
  },
  {
    title: 'Restaurant Finance Management',
    description:
      'A finance management dashboard tailored to restaurant operations, bringing income, expenses, transactions, and financial summaries into one organized workspace. It helps decision-makers monitor cash flow, understand spending patterns, and maintain clearer records through practical data views and reporting workflows.',
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Financial Dashboard',
    ],
  },
];

async function seedProjects() {
  await mongoose.connect(process.env.MONGO_URI);
  await Project.deleteMany({ title: 'Sample Portfolio' });

  const baseTime = Date.now();

  for (const [index, project] of projects.entries()) {
    await Project.findOneAndUpdate(
      { title: project.title },
      {
        ...project,
        liveUrl: '',
        githubUrl: '',
        imageUrl: '',
        createdAt: new Date(baseTime - index * 60_000),
      },
      { upsert: true, runValidators: true }
    );
  }

  console.log(`Seeded ${projects.length} professional projects.`);
  await mongoose.disconnect();
}

seedProjects().catch(async (error) => {
  console.error('Project seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
});
