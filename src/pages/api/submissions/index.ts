import { NextApiRequest, NextApiResponse } from 'next';
import SubmissionsService from '../../../services/SubmissionsService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method ?? 'GET';
  switch (method) {
    case 'GET':
      return findSubmissionsController(req, res);
    case 'POST':
      return addSubmissionController(req, res);
    default:
      return res.status(400).json('Invalid HTTP method. Try POST or GET ');
  }
}

async function findSubmissionsController(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const sService = new SubmissionsService();
  const serviceResponse = await sService.getSubmissions();

  const { statusCode, submissions } =
    serviceResponse.length > 0
      ? { statusCode: 200, submissions: serviceResponse }
      : { statusCode: 200, submissions: [] };

  return res.status(statusCode).json(submissions);
}

async function addSubmissionController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sService = new SubmissionsService();
  const serviceResponse = await sService.insertSubmission(req);

  const { statusCode, insertedId } = serviceResponse
    ? { statusCode: 200, insertedId: serviceResponse }
    : { statusCode: 404, insertedId: '' };

  return res.status(statusCode).json({ insertedId });
}
