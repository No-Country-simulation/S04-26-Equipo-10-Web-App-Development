import { createIncidentService } from './incident.service.js';

export const createIncident = async (req, res) => {
  try {
    const { type_id, area_id, description } = req.body || {};

    if (!type_id || !area_id || !description) {
      return res.status(400).json({ error: 'type_id, area_id and description are required' });
    }

    const user = req.user;

    const incident = await createIncidentService({
      type_id,
      area_id,
      description,
      created_by: user.user_id
    });

    res.status(201).json(incident);

  } catch (error) {
  if (error.message === 'Invalid type_id' || error.message === 'Invalid area_id') {
    return res.status(400).json({ error: error.message });
  }

  return res.status(500).json({ error: 'Internal server error' });
  }
};