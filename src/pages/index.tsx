import { useCallback, useMemo, useState, useRef } from 'react';
import { SearchInput } from '@/components/SearchInput';
import { CollectionsGrid } from '@/components/CollectionsGrid';
import { fetchCollectionsByAddress } from '@/services';
import strings from '@/strings';
import { CardMetaParams } from '@/types';
import { store } from '@/store';
import styles from '@/styles/Home.module.scss';


export default function Home() {
  const allItems = useRef<CardMetaParams[]>(store.items || []);
  const [items, setItems] = useState<CardMetaParams[] | null>(allItems.current.slice(0, LOAD_ITEMS_STEP));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const renderTitle = useMemo(() => {
    return (
      <div className={styles.titleWrapper}>
        {strings.title.map((str, index) => {
          const className = `${styles.title} ${index === NFT_LABEL_INDEX ? styles.nft : ''}`
          return <p key={index} className={className}>{str}{index !== strings.title.length - 1 ? <>&nbsp;</> : ''}</p>
        })}
      </div>
    )
  }, []);

  const handleSearch = useCallback((value: string) => {
    setLoading(true);
    setError(false);
    fetchCollectionsByAddress(value)
      .then((response) => {
        if (response) {
          allItems.current = response;
          setItems(response.slice(0, LOAD_ITEMS_STEP));
          setLoading(false);
          setError(false);
          store.items = response;
        } else {
          setError(true);
        }
      })
  }, [setItems, setLoading, setError]);

  const loadMore = useCallback(() => {
    if (items) {
      const itemLength = items.length;
      if (itemLength < allItems.current.length) {
        const newItems = allItems.current.slice(0, items.length + LOAD_ITEMS_STEP)
        setItems(newItems)
      }
    }
  }, [setItems, items]);

  return (
    <div className={styles.wrapper}>
      {renderTitle}
      <SearchInput onSearch={handleSearch} />
      <div className={styles.grid}>
        {(loading || items?.length) ?
          <CollectionsGrid
            items={items}
            loadMore={loadMore}
            loading={loading}
            itemsLength={allItems.current.length}
            error={error}
          /> : null}
      </div>
    </div>
  )
}

const NFT_LABEL_INDEX = 1;

const LOAD_ITEMS_STEP = 6;
