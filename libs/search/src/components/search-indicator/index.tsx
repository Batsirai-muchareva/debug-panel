import { usePath } from '@debug-panel/path';
import { Box } from "@debug-panel/ui";

import styles from './search-indicator.module.scss';

export const SearchIndicator = ( { state }: { state: boolean } ) => {
    const { path } = usePath();

    if ( ! path || state ) {
        return null;
    }

    return (
        <Box className={ styles.indicator } />
    )
}
// https://www.facebook.com/share/v/1GVAeHYNr3/?mibextid=wwXIfr
