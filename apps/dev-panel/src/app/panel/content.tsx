import { MonacoEditor } from '@debug-panel/monaco-editor'
import { Toolbar, ToolbarProvider } from '@debug-panel/toolbar';

import { useData } from '../../context/data-context';

export const Content = () => {
    const { data } = useData();

    return (
        <>
            <Toolbar data={ data } />
            <MonacoEditor data={ data } />
        </>

    )
}
// <ToolbarProvider>
// </ToolbarProvider>
