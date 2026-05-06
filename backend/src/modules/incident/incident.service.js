export const createIncidentService = async ({
  type_id,
  area_id,
  description,
  created_by
}) => {

  // mocks (después será DB)
  const validTypes = [1, 2, 3];
  const validAreas = [1, 2, 3];

  if (!validTypes.includes(type_id)) {
    throw new Error('Invalid type_id');
  }

  if (!validAreas.includes(area_id)) {
    throw new Error('Invalid area_id');
  }

  const newIncident = {
    id: 1,
    type_id,
    area_id,
    description,
    status: 'CREADO',
    created_by,
    created_at: new Date()
  };

  return newIncident;
};