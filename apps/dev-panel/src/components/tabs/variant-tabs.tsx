import { useTabs } from '../../context/tabs-context';
import { LineIndicator } from './line/indicator';
import { Group } from './shared/group';
import { Tab } from './tab';

import styles from './line/line-group.module.scss';

export const VariantTabs = () => {
    const { variant: { tabs, id, setId } } = useTabs();

    return (
        <Group className={ styles.group } onActivate={ setId } activeId={ id } indicator={ LineIndicator } >
            {
                tabs.map( ( { id, label } ) => (
                    <Tab id={ id } key={ id } label={ label } type="line" />
                ) )
            }
        </Group>
    )
}
