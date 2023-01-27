export type CollectionsResponse = {
    uri: string;
    address: string;
}

export type CardMetaParams = CollectionsResponse & {
    holderAddress: string;
}

export type CardMetaData = {
    name: string;
    image: string;
}
