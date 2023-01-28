import type { NextApiRequest, NextApiResponse } from 'next';
import config from '@/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;
  
  switch (requestMethod) {
    case 'GET':
        const { uri, address, holderAddress } = req.query;
        const query = new URLSearchParams({ url: (uri as string), address: (address as string), holderAddress: (holderAddress as string) });

        const result = await fetch(`${config.host}metadata/?${query}`);
        const response = await result.json();
        if (response && response.data && response.data.metadata) {
            const meta = response.data.metadata;
            res.status(200).json({ image: meta.image, name: meta.name || meta.symbol || meta.Uncollected });
        } else {
            res.status(500).json({ error: 'DUMMY' });
        }
  }
}
