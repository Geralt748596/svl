import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;
  
  switch (requestMethod) {
    case 'GET':
      const query = req.query;
      const { address } = query;

      const result = await fetch(`${config.host}address/${address}`);
      const response = await result.json();
      res.status(200).json(response)
  }
}
