import { Provider, Variant } from "@app/types";

const DEFAULT_ORDER = 10;

/*
  Source is a definition of provider & its variants
 */
const createSourceManager = () => {
    const providers = new Map< Provider['id'], Provider >();

    const registerSource = ( providerFxn: () => Provider<any, any> ) => {
        const provider = providerFxn();

        if ( providers.has( provider.id ) ) {
            throw new Error(`Source ${ provider.id } is already registered`);
        }

        providers.set( provider.id, provider );
    }

    const getAll = () => Array.from( providers.values() );

    const sortByOrder = <T extends { order?: number }>( a: T, b: T ) => {
        return ( a.order ?? DEFAULT_ORDER ) - ( b.order ?? DEFAULT_ORDER );
    }

    const stripVariantInternals = (
        { sourceConfig, createSource, ...variant }: Variant
    ): Omit<Variant, 'createSource' | 'sourceConfig'> => variant;

    const getConfigs = (): Provider[] => {
        return Array.from( providers.values() )
            .sort( sortByOrder )
            .map( ( { order, variants, ...provider } ) => ( {
                ...provider,
                variants: variants
                    .sort( sortByOrder )
                    .map( stripVariantInternals ),
            } ) ) as Provider[];
    }

    const find = ( providerId: string ) => {
        return providers.get( providerId );
    }

    const findVariant = ( providerId: Provider['id'], variantId: Variant['id'] ) => {
        const variant = find( providerId )
            ?.variants.find( ( { id } ) => id === variantId );

        if ( ! variant ) {
            throw Error( ' Variant not found' )
        }

        return variant;
    }

    return {
        registerSource,
        getAll,
        getConfigs,
        findVariant,
        find,
    }
}

export const sourceManager = createSourceManager();
