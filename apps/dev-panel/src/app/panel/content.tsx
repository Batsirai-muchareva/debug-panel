import { MonacoEditor } from '@debug-panel/monaco-editor'
import { Toolbar } from '@debug-panel/toolbar';

import { useData } from '../../context/data-context';
import { useVariant } from '../../hooks/use-variant';

export const Content = () => {
    const { data } = useData();
    const { id } = useVariant();

    return (
        <>
            <Toolbar data={ data } variantId={ id }/>
            <MonacoEditor data={ data } variantId={ id } />
        </>
    )
}
