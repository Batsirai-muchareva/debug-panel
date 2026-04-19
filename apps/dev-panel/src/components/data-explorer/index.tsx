import { useState } from 'react';

import { SearchIcon } from '@debug-panel/icons';
import { Box, Button, Text,TextField } from '@debug-panel/ui';

import { useBrowsePath } from '../../context/browse-context';
import { useData } from '../../context/data-context';

import styles from './data-explorer.module.scss';

export const DataExplorer = () => {
    const { rawData } = useData();
    const { setBrowsePath } = useBrowsePath();

    const [ value, setValue ] = useState( '' );

    const data = Object.keys( rawData ?? {} ).map( ( p, index ) => ( { label: p, index: index + 1 } ) );

    const filteredData = data.filter( p => p.label.includes( value ) );

    return (
        <Box className={ styles.container }>
             <Box className={ styles.search }>
                 <TextField
                     value={ value }
                     onChange={ setValue }
                     startIcon={ SearchIcon }
                 />
            </Box>
             <Box className={ styles.list }>
                 { filteredData.map( ( p ) => (
                     <Button
                         key={ p.index }
                         className={ styles.row }
                         onClick={ () => setBrowsePath( p.label ) }
                     >
                         <Box className={ styles.numbering }>
                             {p.index }
                         </Box>
                         <Text className={ styles.keyName }>{ p.label }</Text>
                     </Button>
                 ) ) }

                 {
                     filteredData.length === 0 && (
                         <Text className={styles.noresult}>
                             No matches
                         </Text>
                     )
                 }
             </Box>
        </Box>
    )
}
