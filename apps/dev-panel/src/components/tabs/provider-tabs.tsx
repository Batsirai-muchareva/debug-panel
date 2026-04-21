import {  useTabs } from '../../context/tabs-context';
import { ButtonIndicator } from './pill/indicator';
import { Group } from './shared/group';
import { Tab } from './tab';

import styles from './pill/pill-group.module.scss';


export const ProviderTabs = () => {
    const { provider: { tabs, id, setId } } = useTabs();

    return (
        <Group className={ styles.group } onActivate={ setId } activeId={ id } indicator={ ButtonIndicator } >
            {
                tabs.map( ( { id, label } ) => (
                    <Tab id={ id } key={ id } label={ label } type="button" />
                ) )
            }
        </Group>
    );
};
