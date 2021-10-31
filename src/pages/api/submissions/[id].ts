import { NextApiRequest, NextApiResponse } from 'next';
import SubmissionsService from '../../../services/SubmissionsService';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method ?? 'GET';
  switch (method) {
    case 'GET':
      return findSubmissionController(req, res);
    case 'DELETE':
      return deleteSubmissionController(req, res);
    default:
      return res.status(400).json('Invalid HTTP method. Try GET or DELETE');
  }
}

async function deleteSubmissionController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sService = new SubmissionsService();
  const serviceResponse = await sService.deleteSubmission(req);

  const { statusCode, message } = serviceResponse
    ? { statusCode: 200, message: 'cool!' }
    : { statusCode: 404, message: 'rip!' };

  return res.status(statusCode).json({ message });
}

async function findSubmissionController(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sService = new SubmissionsService();
  const serviceResponse = await sService.findSubmission({ req });

  const { statusCode, submission } = serviceResponse
    ? { statusCode: 200, submission: serviceResponse }
    : { statusCode: 200, submission: [] };

  return res.status(statusCode).json(submission);
}
