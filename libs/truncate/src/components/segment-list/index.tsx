import { Button, cx, Text } from '@debug-panel/ui';

import type { Segment } from '../../types';

import styles from './segment-list.module.scss';

type Props = {
    onSelect?: ( item: Segment ) => void;
    items: Segment[];
    activeItem?: Segment;
    showCount?: boolean;
};

export const SegmentList = ( { items, onSelect, activeItem, showCount }: Props ) => {
    return items.map( ( item, index ) => (
        <Button
            onClick={ () => onSelect?.( item ) }
            key={ item.id }
            className={cx(
                styles.item, {
                [styles.itemActive]: item.id === activeItem?.id,
            } ) }
        >
            { showCount && <Text className={ styles.count }>{ index + 1 }</Text>}

            <Text className={ styles.label }>{ item.label }</Text>
            <Text className={ styles.ret }>↵</Text>
        </Button>
    ) );
};
