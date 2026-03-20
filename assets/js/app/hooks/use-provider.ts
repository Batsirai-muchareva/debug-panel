import { useEffect, useMemo, useRef, useState } from "@wordpress/element";

import { Provider, RawData, Source, Variant } from "@libs/types";

import { useTabs } from "@app/context/tabs/tabs-context";
import { sourceManager } from "@app/source-manager/source-manager";

type State = Record< Provider['id'], Record<Variant['id'], RawData> >;

export function useProvider() {
    const { activeProvider, activeVariant } = useTabs();
    const [ data, setData ] = useState<State>({});
    const activeSource = useRef< Source | null >( null );

    const update =
        ( providerId: Provider['id'], variantId: Variant['id'], data: unknown ) => {

        setData( ( prev: any ) => ( {
            ...prev,
            [ providerId ]: {
                ...prev[ providerId ],
                [ variantId ]: data
            }
        } ) );
    }

    useEffect( () => {
        sourceManager.getAll().forEach( ( provider ) => {
            provider.variants.forEach( ( variant ) => {
                update( provider.id, variant.id, null );
            } )
        } );
    }, [] );

    const stopActiveSource = () => {
        activeSource.current?.stop();
        activeSource.current = null;
    }

    // Re-run when tab, variant, OR selectedKey changes
    useEffect( () => {
        const variant = sourceManager.findVariant( activeProvider, activeVariant );

        const source = variant.createSource( variant.sourceConfig );

        source.start( ( sourceData ) => {
            update( activeProvider, activeVariant, sourceData );
        } );

        activeSource.current = source;

        return () => {
            source.stop();
            activeSource.current = null;
        };
        // startSource();
        //
        // return stopActiveSource
    }, [ activeProvider, activeVariant ] )

    const startSource = () => {
        const variant = sourceManager.findVariant( activeProvider, activeVariant );

        activeSource.current = variant.createSource( variant.sourceConfig );

        activeSource.current.start( ( sourceData ) => {
            update( activeProvider, activeVariant, sourceData )
        } );
    }

    const config = useMemo( () =>
            sourceManager.getConfigs().find( ( { id }) =>
                id === activeProvider
            ),
        [ activeProvider ]
    );

    return {
        data: data[ activeProvider ]?.[ activeVariant ],
        config
    }
}
