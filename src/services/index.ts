import { CardMetaData, CardMetaParams, CollectionsResponse } from '@/types';

export const fetchCollectionsByAddress = async (address: string): Promise<CardMetaParams[] | undefined> => {
    const query = new URLSearchParams({
        address,
    });

    try {
        const resposne = await fetch(`api/collections/?${query}`);
        const json = await resposne.json();
        
        if (json && json.data && json.data.nfts) {
            return (json.data.nfts as CollectionsResponse[]).map((nft) => ({ ...nft, holderAddress: address }));
        }
    } catch {
        console.log('DUMMY ERROR');
    }
}

export const fetchCardMeta = async (params: CardMetaParams): Promise<CardMetaData | undefined> => {
    const query = new URLSearchParams(params);

    try {
        const resposne = await fetch(`api/meta/?${query}`);
        const json = await resposne.json();
        if (json && !json.error) {
            return json as CardMetaData;
        } else {
            console.log('DUMMY ERROR');
        }
    } catch {
        console.log('DUMMY ERROR');
    }
}
