import { defineAction } from "../define-action"

export const copy  = defineAction( {
    id: 'copy',
    title: 'Copy',
    icon: 'copy',
    onExecute: async ( { data } ) => {
        const textToCopy = JSON.stringify( data, null, 2 );

        await copyToClipboard( textToCopy );
    },
    options: {
        success: {
            message: 'Copied to clipboard!'
        }
    }
} );
 
const copyToClipboard = async  ( text: string ): Promise<void> => {
    if ( navigator.clipboard?.writeText ) {
        await navigator.clipboard.writeText( text );

        return;
    }

    const textArea = document.createElement( "textarea" );
    textArea.value = text;
    textArea.setAttribute( "readonly", "true" );
    textArea.style.position = "absolute";
    textArea.style.left = "-9999px";

    document.body.appendChild( textArea );
    textArea.select();

    const success = document.execCommand( "copy" );
    document.body.removeChild( textArea );

    if ( ! success ) {
        throw new Error( "Clipboard copy command failed" );
    }
}
