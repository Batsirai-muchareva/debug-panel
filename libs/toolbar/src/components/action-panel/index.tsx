import { findAction } from '../../actions-registry';
import { useActionPanel } from '../../context/toolbar-context';

export const ActionPanel =  ( { data }: { data: unknown } ) => {
    const { activePanelId, setActivePanelId } = useActionPanel();

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
