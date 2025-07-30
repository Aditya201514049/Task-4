const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// List users (sorted by lastLogin)
router.get('/', auth, async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { lastLogin: 'desc' },
    select: { id: true, name: true, email: true, lastLogin: true, status: true, createdAt: true }
  });
  res.json(users);
});

// Block users
router.post('/block', auth, async (req, res) => {
  const { ids } = req.body;
  await prisma.user.updateMany({ where: { id: { in: ids } }, data: { status: 'blocked' } });
  res.json({ message: 'Users blocked successfully' });
});

// Unblock users
router.post('/unblock', auth, async (req, res) => {
  const { ids } = req.body;
  await prisma.user.updateMany({ where: { id: { in: ids } }, data: { status: 'active' } });
  res.json({ message: 'Users unblocked successfully' });
});

// Delete users
router.post('/delete', auth, async (req, res) => {
  const { ids } = req.body;
  await prisma.user.deleteMany({ where: { id: { in: ids } } });
  res.json({ message: 'Users deleted successfully' });
});

module.exports = router;