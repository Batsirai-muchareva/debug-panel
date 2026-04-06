import { findAction } from '../../actions-registry';
import { useActionPanel, useToolbar } from '../../context/toolbar-context';

export const ActionPanel =  ( { data }: { data: unknown } ) => {
    const { activePanelId, setActivePanelId } = useActionPanel();
    // const { states, setState, setData } = useToolbar(  );

    if ( ! activePanelId ) {
        return null;
    }

    const action = findAction( activePanelId );

    const Panel = action.panel;

    if ( ! Panel ) {
        return null
    }

    return (
        <Panel data={ data } onClose={ () => setActivePanelId( null ) } />
    );
}
