import { type PropsWithChildren, useState } from 'react';

import { Popup, Portal } from '@debug-panel/ui';

import { SegmentList } from './components/segment-list';
import { TruncateEnd } from './components/truncate-end';
import { TruncateMiddle } from './components/truncate-middle';
import { usePopup } from './hooks/use-popup';
import type { Segment, TruncateMode } from './types';
import { getPortalElement } from './utils/get-portal-element';
import { Overlay } from './components/overlay';
import { TOOLBAR_CONTENT_PORTAL_ID } from '@debug-panel/constants';

type TruncateProps = PropsWithChildren<{
    mode?: TruncateMode;
    className?: string;
    items: Segment[];
    onSelect?: ( item: Segment ) => void;
}>;

const STRATEGY = {
    end: TruncateEnd,
    middle: TruncateMiddle,
} as const;

export const Truncate = ( { mode = 'end', ...props }: TruncateProps ) => {
    const { ellipsisRef, isOpen, toggle, close, getTriggerRect } = usePopup();
    const [ hiddenSegments, setHiddenSegments ] = useState<Segment[]>( [] );

    const Strategy = STRATEGY[ mode ];

    return (
        <>
            <Strategy
                { ...props }
                ellipsisRef={ ellipsisRef }
                onEllipsisClick={ toggle }
                hiddenSegments={ hiddenSegments }
                setHiddenSegments={ setHiddenSegments }
            />

            { isOpen && (
                <Portal container={ getPortalElement( TOOLBAR_CONTENT_PORTAL_ID ) }>
                     <Overlay>
                    <Popup
                        triggerRect={ getTriggerRect() }
                        onClose={ close }
                        title="Hidden Segments"
                    >
                        <SegmentList
                            showCount
                            onSelect={ ( item ) => {
                                props.onSelect?.( item );
                                close();
                            } }
                            items={ hiddenSegments }
                            activeItem={ getActiveItem( hiddenSegments, mode ) }
                        />
                    </Popup>
                     </Overlay>
                </Portal>
            ) }
        </>
    )
};

const getActiveItem = ( hiddenSegments: Segment[], mode: TruncateMode ) => {
    if ( mode === 'end' ) {
        return hiddenSegments[ hiddenSegments.length - 1]
    }

    return;
}
