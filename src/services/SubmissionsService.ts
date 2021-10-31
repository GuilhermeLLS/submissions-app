import { NextApiRequest } from 'next';
import { Db, ObjectId } from 'mongodb';
import clientPromise from '../config/database';
import type { Submission, SubmissionSchema } from '../types/common';

export default class SubmissionsService {
  private database: Promise<Db>;
  constructor() {
    this.database = this.initDatabase();
  }

  private async initDatabase() {
    const client = await clientPromise;
    return client.db(process.env.mongodb_db);
  }

  private parseRequestBody(req: NextApiRequest) {
    return JSON.parse(req.body);
  }

  private parseSubmission(submission: SubmissionSchema): Submission {
    return {
      id: submission._id.toString(),
      content: submission.content,
      createdAt: submission.created_at,
    };
  }

  async insertSubmission(req: NextApiRequest): Promise<string> {
    const submissionContent = this.parseRequestBody(req).content;
    const database = await this.database;

    const submission = (
      await database.collection<SubmissionSchema>('submissions').insertOne({
        _id: new ObjectId(),
        content: submissionContent,
        created_at: Date.now(),
      })
    ).insertedId;

    return submission.toString();
  }

  async deleteSubmission(req: NextApiRequest) {
    const submissionId = req.query.id as string;
    const database = await this.database;

    return (
      await database
        .collection<SubmissionSchema>('submissions')
        .deleteOne({ _id: new ObjectId(submissionId) })
    ).acknowledged;
  }

  async findSubmission({ req, id }: { req?: NextApiRequest; id?: string }) {
    const submissionId = (req?.query?.id as string) || id;
    const database = await this.database;

    const submission = await database
      .collection<SubmissionSchema>('submissions')
      .findOne({ _id: new ObjectId(submissionId) });

    return submission ? this.parseSubmission(submission) : undefined;
  }

  async getSubmissions() {
    const database = await this.database;

    const submissions = await database
      .collection<SubmissionSchema>('submissions')
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    return submissions.map((item) => this.parseSubmission(item));
  }
}
