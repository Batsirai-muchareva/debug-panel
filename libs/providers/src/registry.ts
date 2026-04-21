import type { Provider } from './types';

const providers = new Map< string, Provider>();
let sealed = false;

const add = <TData>( provider: Provider<TData> ) => {
    assertNotSealed( provider.id );

    if ( providers.has( provider.id ) ) {
        throw new Error( `[DevPanel] Provider ${ provider.id } is already registered` );
    }

    for ( const variant of provider.variants ) {
         if ( findVariant( variant.id ) ) {
             throw new Error( `[DevPanel] Variant "${ variant.id }" is already registered` );
        }
    }

    providers.set( provider.id, provider as Provider );
};

const assertNotSealed = ( id: string ) => {
    if ( sealed ) {
        throw new Error(
            `[DevPanel] Cannot register "${ id }" after init. ` +
            `Register inside the "dev-panel:init" event.`,
        );
    }
};

const getAll = (): Provider[] => {
  return [ ...providers.values() ];
};

const find = ( providerId: string ) => {
    const provider = providers.get( providerId );

    if ( ! provider ) {
        throw Error( 'Provider not found' )
    }

    return provider;
};

const findVariant = ( variantId: string ) => {
    for ( const provider of providers.values() ) {
        const variant = provider.variants.find( ( { id } ) => id === variantId );

        if ( variant ) {
            return variant;
        }
    }

    return undefined;
}

const seal = (): void => {
  sealed = true;
};

export const providerRegistry = { add, seal, getAll, find, findVariant };
