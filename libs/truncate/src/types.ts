import type { PropsWithChildren, RefObject } from 'react';

export type Segment = {
    label: string;
    id: string;
};

export type TruncateMode = 'end' | 'middle';

export type TruncateSharedProps = PropsWithChildren<{
    className?: string;
    items: Segment[];
    ellipsisRef: RefObject<HTMLButtonElement>;
    onEllipsisClick: () => void;
    setHiddenSegments: ( segments: Segment[] ) => void;
    hiddenSegments: Segment[];
}>;

export type SharedArgs = Pick<TruncateSharedProps, 'setHiddenSegments'> & {
    ref: RefObject<HTMLDivElement>;
    items: Segment[];
    hiddenSegments?: Segment[];
}
