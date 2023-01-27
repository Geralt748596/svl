import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'

import { CardMetaParams } from '@/types';
import { fetchCardMeta } from '@/services';

import ArrowIcon from './images/arrow.svg';
import PlaceHolderImage from './images/placeholder.png';
import styles from './styles.module.scss';

export const CollectionCard = memo((props: Props) => {
    const [image, setImage] = useState<string>('');
    const [label, setLabel] = useState<string>('');

    useEffect(() => {
        fetchCardMeta(props)
            .then((cardData) => {
                if (cardData) {
                    setLabel(cardData.name);
                    const image = new window.Image();
                    image.onload = () => {
                        setImage(cardData.image);
                    }
                    image.src = cardData.image;
                }
            })
    }, [])

    if (!image) {
        return <PlaceHolder />;
    }

    return (
        <Link href={props.address} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img
                    src={image}
                    alt=''
                />
            </div>
            <div className={styles.footer}>
                <div className={styles.label}>{label}</div>
                <Image
                    src={ArrowIcon}
                    alt=''
                    className={styles.arrow}
                />
            </div>
        </Link>
    )
});

const PlaceHolder = () => {
    return (
        <div className={styles.placeholder}>
            <div className={styles.background}>
                <Image
                    src={PlaceHolderImage}
                    alt=''
                />
            </div>
        </div>
    )
}

type Props = CardMetaParams;