interface JsonPathStackEntry {
    key: string
    indentLevel: number
    isArrayValue?: boolean
    currentArrayIndex?: number
}

const CLOSING_TOKENS = new Set( [ '}', '},', ']', '],' ] )
const OBJECT_OPENER  = /^\{,?$/
const ARRAY_OPENER   = /^"([^"]+)"\s*:\s*\[/
const KEY_VALUE_PAIR = /^"([^"]+)"\s*:/
const ROOT_ARRAY_MAX_INDENT = 2

export function getJsonPathAtLine(
    model: any,
    targetLine: number
): string {
    const lines = model.getLinesContent();
    const ancestorStack  : JsonPathStackEntry[] = [];

    let rootArrayIndex = -1
    let isRootArray    = false

    for ( let lineIndex = 0; lineIndex < targetLine; lineIndex++ ) {
        const rawLine = lines[ lineIndex ]
        const trimmedLine = rawLine.trim()

        if ( ! trimmedLine ) {
            continue;
        }

        const indentLevel = rawLine.search( /\S/ )

        if ( trimmedLine === '[' ) {
            isRootArray = true

            continue
        }

        const isObjectOpener = OBJECT_OPENER.test( trimmedLine )

        if ( isObjectOpener && isRootArray && indentLevel <= ROOT_ARRAY_MAX_INDENT ) {
            rootArrayIndex++
            continue
        }

        if ( isObjectOpener ) {
            const parentEntry = ancestorStack.at( -1 )
            if ( parentEntry?.isArrayValue ) {
                parentEntry.currentArrayIndex = ( parentEntry.currentArrayIndex ?? -1 ) + 1
            }
            continue
        }

        if ( CLOSING_TOKENS.has( trimmedLine ) ) continue

        const arrayOpenerMatch = trimmedLine.match( ARRAY_OPENER )
        if ( arrayOpenerMatch ) {
            const [ , key ] = arrayOpenerMatch
            popSameLevelEntries( ancestorStack, indentLevel )
            ancestorStack.push( {
                key,
                indentLevel,
                isArrayValue        : true,
                currentArrayIndex   : -1,
            } )
            continue
        }

        const keyValueMatch = trimmedLine.match( KEY_VALUE_PAIR )
        if ( !keyValueMatch ) continue

        const [ , key ] = keyValueMatch
        popSameLevelEntries( ancestorStack, indentLevel )
        ancestorStack.push( { key, indentLevel } )
    }

    return buildDotPath( ancestorStack, rootArrayIndex, isRootArray )
}

function popSameLevelEntries(
    stack      : JsonPathStackEntry[],
    indentLevel: number
): void {
    while ( stack.length > 0 && stack.at( -1 )!.indentLevel >= indentLevel ) {
        stack.pop()
    }
}

function buildDotPath(
    stack           : JsonPathStackEntry[],
    rootArrayIndex  : number,
    isRootArray     : boolean
): string {
    const keySegments = stack.map( entry => {
        const arrayIndexSuffix =
            entry.isArrayValue && ( entry.currentArrayIndex ?? -1 ) >= 0
                ? `[${ entry.currentArrayIndex }]`
                : ''
        return entry.key + arrayIndexSuffix
    } )

    const dotPath = keySegments.join( '.' )

    if ( isRootArray && rootArrayIndex >= 0 ) {
        return dotPath ? `${ rootArrayIndex }.${ dotPath }` : `${ rootArrayIndex }`
    }

    return dotPath
}
