import { ButtonTab, useTabs } from '@debug-panel/tabs';

import type { ProviderConfig } from '../../hooks/use-tabs-configs';


export const ProviderTabs = () => {
    const { tabs, id, setId } = useTabs<ProviderConfig>();

    return (
        <ButtonTab.Group onChange={ setId } defaultActive={id}>
            {
                tabs.map( ( { id, title } ) => (
                    <ButtonTab.Item id={ id } key={ id }>
                        { title }
                    </ButtonTab.Item>
                ) )
            }
        </ButtonTab.Group>
    );
};
