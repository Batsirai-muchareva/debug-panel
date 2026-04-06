import { defineAction } from "../define-action"

export const exportAction  = defineAction( {
    id: 'export',
    title: 'Export',
    icon: 'export',
    onExecute: async ( { bind, data } ) => {
        const filename = createExportFilename( bind );

        downloadJson( data, filename );
    },
    options: {
        success: {
            message: 'Exported successfully',
        }
    }
} );

const createExportFilename = ( bind?: string ): string => {
    const safeBind = bind?.toString().replace( /[^a-z0-9-_]/gi, "_" ) || "export";

    return `${safeBind}-schema-${Date.now()}.json`;
}

const downloadJson = ( data: unknown, filename: string ): void => {
    const json = JSON.stringify( data, null, 2 );
    const blob = new Blob( [ json ], { type: "application/json" } );
    const url = URL.createObjectURL( blob );

    try {
        const anchor = document.createElement( "a" );
        anchor.href = url;
        anchor.download = filename;
        anchor.style.display = "none";

        document.body.appendChild( anchor );
        anchor.click();
        document.body.removeChild( anchor );
    } finally {
        URL.revokeObjectURL( url );
    }
}
