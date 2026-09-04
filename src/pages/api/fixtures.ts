import type { NextApiRequest, NextApiResponse } from 'next';
import { saveFixture, getFixtures, getFixtureById, deleteFixture } from '@/services/fixturesService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET':
        if (id && typeof id === 'string') {
          const fixture = await getFixtureById(id);
          if (!fixture) {
            return res.status(404).json({ success: false, message: 'Fixture not found' });
          }
          return res.status(200).json({ success: true, data: fixture });
        } else {
          const fixtures = await getFixtures();
          return res.status(200).json({ success: true, data: fixtures });
        }

      case 'POST':
        const body = req.body;
        if (!body || !body.name || !body.gameType) {
          return res.status(400).json({ success: false, message: 'Missing tournament name or gameType' });
        }
        const saved = await saveFixture(body, id as string | undefined);
        return res.status(200).json(saved);

      case 'DELETE':
        if (!id || typeof id !== 'string') {
          return res.status(400).json({ success: false, message: 'Missing fixture id' });
        }
        const deleted = await deleteFixture(id);
        return res.status(200).json({ success: deleted });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('API /api/fixtures error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
