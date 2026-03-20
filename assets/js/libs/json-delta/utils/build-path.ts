export const buildPath = ( basePath: string, key: string ): string => {
    return basePath ? `${ basePath }.${ key }` : key;
};
