import { useState } from 'react';

import { eventBus } from '@debug-panel/events';
import { SearchIcon } from '@debug-panel/icons';
import { store } from '@debug-panel/storage';
import { Box, Button, Text,TextField } from '@debug-panel/ui';

import { useData } from '../../context/data-context';

import styles from './data-explorer.module.scss';

export const DataExplorer = () => {
    const { data: keys } = useData();

    const [ value, setValue ] = useState( '' );

    const filteredData = buildListData( keys as string[] )
        .filter( p =>
            p.label.includes( value )
        );

    const selectKey = ( key: string ) => {
        store.setBrowseKey( key );

        eventBus.emit( 'browser:key:selected' );
    };

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
                         onClick={ () => selectKey( p.label ) }
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

const buildListData = ( data: string[] ) => {
    return data.map( ( p, index ) => ( { label: p, index: index + 1 } ) );
}
