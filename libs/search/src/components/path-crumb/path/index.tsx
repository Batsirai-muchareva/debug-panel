import { RightChevron, CloseIcon } from '@debug-panel/icons';
import { generateUniquePathSegments, usePath } from '@debug-panel/path';
import { Truncate } from '@debug-panel/truncate';
import { Box, Button, cx } from '@debug-panel/ui';

import styles from './path.module.scss';

type Segment = {
    label: string;
    id: string;
};

export const Path = () => {
    const { path, setPath } = usePath();

    const segments = generateUniquePathSegments( path );

    const handleSegmentClick = ( segment: Segment ) => {
        const index = segments.findIndex( s => s.id === segment.id );

        if ( index === -1 ) {
            throw Error( 'Path segment not found' );
        }

        setPath( segments.slice( 0, index + 1 ).map( s => s.label ).join( '.' ) );
    };

    return (
        <Truncate mode="middle" items={ segments } onSelect={ handleSegmentClick } className={ styles.path }>
            {
                segments.map( ( segment, index ) => {
                    const isLastSegment = ( segments.length - 1 ) === index;

                    /**
                     * data-id is have a coupling with truncate where it queries the id
                     * So be careful to remove it because it will break the truncate
                     */
                    return (
                        <Box data-segment className={ styles.segment } key={ segment.id }>
                            <Button
                                data-id={ segment.id }
                                className={ cx( styles.segmentBtn, { [styles.active]: isLastSegment } ) }
                                onClick={ () => handleSegmentClick( segment ) }
                            >
                                { segment.label }
                            </Button>

                            { ! isLastSegment && <RightChevron className={ styles.chevron }/> }

                            { isLastSegment && (
                                <Button onClick={ () => handleSegmentClick( segment ) } className={ styles.lastItem}>
                                    <CloseIcon size={ 8 } />
                                </Button>
                            ) }
                        </Box>
                    )
                } )
            }
        </Truncate>
    )
}
//  className={ styles.chevron }
