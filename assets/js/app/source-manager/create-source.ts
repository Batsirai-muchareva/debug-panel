import { Notify, Variant } from "@app/types";

type SourceEffects= {
    setup?: () => void;
    teardown?: () => void;
};

type SourceFn<T, C> = ( notify: Notify<T>, config: C ) => SourceEffects;

export const createSource =
    <T, C = void>( sourceFn: SourceFn<T, C> ): Variant<T, C>['createSource'] => {

    return ( config: C ) => {
        let notify: Notify<T> | null = null;
        let effects: SourceEffects | null = null;

        return {
            start( notifyFn: Notify<T> ) {
                if ( effects ) {
                    return;
                }

                notify = notifyFn;

                effects = sourceFn( ( data: T | null ) => {
                    notify?.( data );
                }, config );

                effects.setup?.();
            },

            stop() {
                effects?.teardown?.();

                effects = null;
                notify = null;
            },
        };
    };
}
