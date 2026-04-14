import { useState } from '@wordpress/element';

import { eventBus, useEventBus } from '@debug-panel/events';
import { ArrowIcon, type IconName, renderIcon } from '@debug-panel/icons';
import { store } from '@debug-panel/storage';
import { useTabs } from '@debug-panel/tabs';
import { ActionsClip, bindActionsClip } from '@debug-panel/truncate';
import { Box, Button, cx, Text } from '@debug-panel/ui';

import { getActions } from '../../actions-registry';
import { useToolbar } from '../../context/toolbar-context';
import type { ActionConfig } from '../../define-action';
import { ActionPanel } from '../action-panel';

import styles from './toolbar.module.scss';

export const Toolbar = ( { data }: { data: unknown } ) => {
    const actions = getActions();
    const { states, setState } = useToolbar( actions );
    const key = store.getBrowseKey();
    const { id } = useTabs();
    const [ hiddenActions, setHiddenActions ] = useState<string[]>( [] );
    const [ shoulShowOverflow, setshoulShowOverflow ] = useState( false );

    useEventBus( 'actions:clip:hide', ( ids ) => {
        setHiddenActions( ids );
    } );

    const renderAction = ( action: ActionConfig ) => {
        const state = states[ action.id ];
        const Indicator = action.indicator;

        return (
            <Button
                { ...bindActionsClip }
                key={ action.id }
                id={ action.id }
                className={ cx( styles.action, {
                    [ styles.actionActive ]: state,
                } ) }
                onClick={ () => action?.onExecute?.( {
                    bind: id,
                    data,
                    onSetState: () => setState( action, !state ),
                } ) }
            >
                { renderIcon( action.icon as IconName ) }
                { action.title }
                { Indicator && <Indicator state={ Boolean( state ) } /> }
            </Button>
        );
    };

    const overflowActions = actions.filter( ( a ) => hiddenActions.includes( a.id ) );

    return (
        <Box className={ styles.toolbar }>
            <ActionsClip moreActive={ shoulShowOverflow } toggleMore={ setshoulShowOverflow } className={ styles.toolbarActions }>
                { actions.map( renderAction ) }
            </ActionsClip>

            { shoulShowOverflow && overflowActions.length > 0 && (
                <Box className={ styles.overflow }>
                    { overflowActions.map( renderAction ) }
                </Box>
            ) }

            {
                key && (
                    <Box className={ styles.back}>
                        <Button onMouseDown={ () => eventBus.emit( 'browse:key:clear' ) } className={ styles.backBtn }>
                            <ArrowIcon />
                        </Button>
                        <Text className={styles.backTxt}>
                            { store.getBrowseKey() }
                        </Text>
                    </Box>
                )
            }
            <ActionPanel data={ data }/>
        </Box>
    );
};
