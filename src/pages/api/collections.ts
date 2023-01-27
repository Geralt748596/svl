// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@/config';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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
