import { Router } from 'express';
import { createIncident } from './incident.controller.js';
import { requireAuth, requireRole } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post(
  '/',
  requireAuth,
  requireRole('operator'),
  createIncident
);

export default router;