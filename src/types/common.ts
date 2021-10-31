import { ObjectId } from 'mongodb';

export type SubmissionSchema = {
  _id: ObjectId;
  content: string;
  created_at: number;
};

export type Submission = {
  id: string;
  content: string;
  createdAt: number;
};
