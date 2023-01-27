import { memo, useRef } from 'react';
import { CollectionCard } from '@/components/CollectionCard';
import { useInView } from 'react-intersection-observer';
import { CardMetaParams } from '@/types';

import styles from './styles.module.scss';
import strings from '@/strings';

export const CollectionsGrid = memo(({ items, loadMore, loading, itemsLength, error }: Props) => {
    const { ref } = useInView({
        threshold: 0,
        onChange: (inView) => {
            if (inView) {
                loadMore();
            }
        }
    });

    const renderTitle = () => {
        if (loading) {
            return (
                <div className={styles.loadTitle}>
                    Wait a bit...
                </div>
            )
        }
        return (
            <div className={styles.titleWrapper}>
                <span>My collections</span>
                <span className={styles.count}>{itemsLength}</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.errorWrapper}>
                {strings.collectionError}
            </div>
        )
    }

    return (
        <>
            {renderTitle()}
            <div className={styles.wrapper}>
                {items && items.length ? items.map((card) => <CollectionCard {...card} key={card.address} />) : null}
            </div>
            <div className={styles.trigger} ref={ref}></div>
        </>
    )
});

type Props = {
    items: CardMetaParams[] | null;
    loading: boolean;
    loadMore: () => void;
    itemsLength: number;
    error: boolean;
}