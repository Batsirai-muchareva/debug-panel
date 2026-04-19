import { pathIndex } from '@debug-panel/path';

type DynamicSegment = {
    pattern: string;        // e.g. 'styles.{elementId}'
    segments: string[];     // e.g. ['styles', '{elementId}']
    root: string;           // e.g. 'styles'
    dynamicNames: string[]; // e.g. ['elementId']
};

const registry: DynamicSegment[] = [];

function parsePattern( pattern: string ): DynamicSegment {
    const segments = pattern.split( '.' );
    const root = segments[ 0 ];
    const dynamicNames = segments
        .filter( s => /^\{[^}]+\}$/.test( s ) )
        .map( s => s.slice( 1, -1 ) );

    return { pattern, segments, root, dynamicNames };
}

function findPatternForSegments( segments: string[] ): DynamicSegment | null {
    return registry.find( entry => entry.root === segments[ 0 ] ) ?? null;
}

function isDynamicToken( token: string ): boolean {
    return /^\{[^}]+\}$/.test( token );
}

export const dynamicSegments = {
    register( pattern: string ): void {
        const parsed = parsePattern( pattern );
        const existing = registry.findIndex( s => s.pattern === pattern );

        if ( existing !== -1 ) {
            registry[ existing ] = parsed;
        } else {
            registry.push( parsed );
        }
    },

    unregister( pattern: string ): void {
        const index = registry.findIndex( s => s.pattern === pattern );
        if ( index !== -1 ) registry.splice( index, 1 );
    },

    // Check if a path string contains any dynamic tokens
    // 'styles.{elementId}.variants.0.props' → true
    // 'styles.e-gv345678.variants.0.props'  → false
    isTemplate( path: string ): boolean {
        return /\{[^}]+\}/.test( path );
    },

    // Check if a segment token is dynamic
    // '{elementId}' → true
    // 'styles'      → false
    isDynamicSegment( token: string ): boolean {
        return isDynamicToken( token );
    },

    // Check if a segment at a given index is dynamic by pattern
    // segments.map( ( segment, index ) => {
    //     const isDynamic = dynamicSegments.isDynamic( segment, segments, index )
    isDynamic( segment: string, segments: string[], index: number ): boolean {
        const match = findPatternForSegments( segments );
        if ( !match ) return false;

        const patternSegment = match.segments[ index ];
        if ( !patternSegment ) return false;

        return isDynamicToken( patternSegment );
    },

    // Get the dynamic name for a segment at a position
    // getName( 'e-gv345678', segments, 1 ) → 'elementId'
    getName( segment: string, segments: string[], index: number ): string | null {
        const match = findPatternForSegments( segments );
        if ( !match ) return null;

        const patternSegment = match.segments[ index ];
        if ( !patternSegment ) return null;

        return isDynamicToken( patternSegment )
            ? patternSegment.slice( 1, -1 )
            : null;
    },

    // Build a template from a live path
    // 'styles.e-gv345678.variants.0.props' → 'styles.{elementId}.variants.0.props'
    build( path: string ): string {
        const pathSegments = path.split( '.' );
        const match = findPatternForSegments( pathSegments );
        if ( !match ) return path;

        return pathSegments
            .map( ( seg, index ) => match.segments[ index ] ?? seg )
            .join( '.' );
    },

    // Resolve a dynamic token against the keys of the current data level
    // resolveFromData( '{elementId}', { 'e-gv345678': {...} } ) → 'e-gv345678'
    resolveFromData( token: string, data: Record<string, unknown> ): string | null {
        if ( !isDynamicToken( token ) ) return token;

        const name = token.slice( 1, -1 );

        // find which registered pattern has this dynamic name
        const match = registry.find( entry => entry.dynamicNames.includes( name ) );
        if ( !match ) return null;

        // find the key in data that fits — first key that isn't a static segment
        const staticSegments = match.segments.filter( s => !isDynamicToken( s ) );
        const dynamicKey = Object.keys( data ).find(
            key => !staticSegments.includes( key )
        );

        return dynamicKey ?? null;
    },

    // Match a template against a live path structurally
    // template: 'styles.{elementId}.variants.0.props'
    // path:     'styles.e-gv345678.variants.0.props'
    // → true
    matchesTemplate( template: string, path: string ): boolean {
        const templateSegments = template.split( '.' );
        const pathSegments = path.split( '.' );

        if ( templateSegments.length !== pathSegments.length ) return false;

        return templateSegments.every( ( seg, index ) => {
            if ( isDynamicToken( seg ) ) return true; // dynamic matches anything
            return seg.toLowerCase() === pathSegments[ index ].toLowerCase();
        } );
    },

    matchesTemplatePrefix( template: string, path: string ): boolean {
        const templateSegments = template.split( '.' );
        const pathSegments = path.split( '.' );

        // Path must be at least as deep as the template
        if ( pathSegments.length < templateSegments.length ) return false;

        // All template segments must match the corresponding path segments
        return templateSegments.every( ( seg, index ) => {
            if ( isDynamicToken( seg ) ) return true;
            return seg.toLowerCase() === pathSegments[ index ].toLowerCase();
        } );
    },

    // Extract dynamic values from a live path using registered pattern
    // 'styles.e-gv345678.variants.0.props' → { elementId: 'e-gv345678' }
    extract( path: string ): Record<string, string> {
        const pathSegments = path.split( '.' );
        const match = findPatternForSegments( pathSegments );
        if ( !match ) return {};

        return match.segments.reduce( ( acc, seg, index ) => {
            if ( isDynamicToken( seg ) ) {
                acc[ seg.slice( 1, -1 ) ] = pathSegments[ index ];
            }
            return acc;
        }, {} as Record<string, string> );
    },

    // Fill a template with known values
    // fill( 'styles.{elementId}.variants.0.props', { elementId: 'e-gv345678' } )
    // → 'styles.e-gv345678.variants.0.props'
    fill( template: string, values: Record<string, string> ): string {
        return template
            .split( '.' )
            .map( seg => {
                if ( isDynamicToken( seg ) ) {
                    const name = seg.slice( 1, -1 );
                    return values[ name ] ?? seg;
                }
                return seg;
            })
            .join( '.' );
    },

    getLiveSegmentValue ( template: string, index: number ): string | null {
        const livePaths = pathIndex.get();
        const livePath = livePaths.find( p => dynamicSegments.matchesTemplate( template, p ) );
        if ( !livePath ) return null;

        return livePath.split( '.' )[ index ] ?? null;
    },

    // Check if a live path falls under any registered pattern
    matches( path: string ): boolean {
        const pathSegments = path.split( '.' );
        return findPatternForSegments( pathSegments ) !== null;
    },
};
