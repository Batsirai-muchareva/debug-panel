import { store } from '@debug-panel/storage';
import { LineTab, useTabs } from '@debug-panel/tabs';

import type { VariantConfig } from '../../../hooks/use-tabs-configs';

export const VariantTabs = () => {
    const { tabs, id, setId: setVariantTab } = useTabs<VariantConfig>();

    //TODO We need a synchonous effect
    store.scope( id )

    return (
        <LineTab.Group onChange={ setVariantTab } defaultActive={id}>
            {
                tabs.map( ( { id, label } ) => (
                    <LineTab.Item id={ id } key={ id }>
                        { label }
                    </LineTab.Item>
                ) )
            }
        </LineTab.Group>
    );
};
