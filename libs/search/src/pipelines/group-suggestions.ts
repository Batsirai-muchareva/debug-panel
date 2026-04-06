export const groupSuggestions = ( data: string[], scope: string ) => {
    const keys = data.filter( path => isTopLevelKey( path, scope ) );
    const nested = data.filter( path => ! isTopLevelKey( path, scope ) );

    return [
        {
            label: 'Keys',
            type: 'key',
            items: keys,
        },
        {
            label: 'Paths',
            type: 'path',
            items: nested,
        },
    ]
}

export const isTopLevelKey = ( path: string, scope: string ): boolean => {
    return ! path.includes( '.' );
};
