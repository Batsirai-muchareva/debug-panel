import React, { Fragment } from 'react';

import styles from './suggestion-meta.module.scss';

export const SuggestionMeta = ( { path }: { path: string } ) => {
    return (
        <span className={ styles.meta }>
            {
                path.split( '.' ).map( ( segment, index, arr ) => (
                    <Fragment key={ segment + index }>
                        <span className={ styles.segment }>
                            { segment }
                        </span>

                        { index < arr.length - 1 && (
                            <span className={ styles.segmentSeparator }>›</span>
                        ) }
                    </Fragment>
                ) )
            }
        </span>
    )
}
