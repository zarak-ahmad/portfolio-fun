const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/projects — public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
});

// POST /api/projects — protected
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, techStack, liveUrl, githubUrl, imageUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const parsedTechStack = Array.isArray(techStack)
      ? techStack
      : typeof techStack === 'string'
        ? techStack.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

    const project = await Project.create({
      title,
      description,
      techStack: parsedTechStack,
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      imageUrl: imageUrl || '',
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
});

module.exports = router;
