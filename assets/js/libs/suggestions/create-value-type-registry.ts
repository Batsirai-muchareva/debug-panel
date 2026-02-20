export type ValueTypeHandler = {
    type: string; // e.g. "object"
    match: ( value: unknown ) => boolean;
    format: ( value: unknown ) => string;
    isEmpty?: (value: any) => boolean;
    meta: {
        name: string;
        icon: string;
        label: string;
    };
};

export function createValueTypeRegistry() {
    const valueTypes: ValueTypeHandler[] = [];

    const registerValueType = ( handler: ValueTypeHandler ) => {
        valueTypes.push( handler );
    }

    const resolveValueType = ( value: unknown ) => {
        const handler = valueTypes.find( ( handler ) => handler.match( value ) );

        return handler ?? fallbackTypeHandler();
    }

    const getValueTypes = () => {
        return [ ...valueTypes, fallbackTypeHandler() ];
    }

    const fallbackTypeHandler: () => ValueTypeHandler = () => ( {
        type: "unknown",
        match: () => true,
        format: ( value) => String( value ),
        meta: { name: "Unknown", icon: "❓", label: "Unknown" }
    } )

    return {
        registerValueType,
        resolveValueType,
        getValueTypes,
    }
}
