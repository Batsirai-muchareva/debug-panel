export function formatTime( utcTime: string ): string {
    const [ h, m, s ] = utcTime.split( ':' ).map( Number );
    const date = new Date();
    date.setUTCHours( h, m, s );
    return date.toLocaleTimeString( undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' } );
}
