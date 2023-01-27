import { memo, useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import SearchIcon from './images/search.svg';
import CloseIcon from './images/close.svg';

import strings from '@/strings';

export const SearchInput = memo(({ onSearch }: Props) => {
    const [value, setValue] = useState<string>('');

    const renderCloseIcon = useMemo(() => {
        return !!value ? (
            <div className={styles.iconWrapper} onClick={() => setValue('')}>
                <Image
                    src={CloseIcon}
                    alt=''
                    className={styles.close}
                />
            </div>
        ) : null;
    }, [!!value, setValue]);

    const renderIcon = useMemo(() => {
        return (
            <div className={styles.iconWrapper}>
                <Image
                    src={SearchIcon}
                    alt=''
                    className={styles.icon}
                />
            </div>
        )
    }, [])

    const handleSearch = () => {
        if (value) {
            onSearch(value);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchInput}>
                {renderIcon}
                <input
                    className={styles.input}
                    placeholder={strings.placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {renderCloseIcon}
            </div>
            <button className={styles.button} onClick={handleSearch}>{strings.search}</button>
        </div>
    )
});

type Props = {
    onSearch: (value: string) => void;
}
