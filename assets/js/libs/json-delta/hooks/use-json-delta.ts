import { useEffect, useState } from "@wordpress/element";

import { Data } from "@libs/types";

import { jsonDelta } from "../state/json-delta";
import { CommitResult, JsonObject } from "../types";

type UseJsonDeltaResult = Pick<CommitResult, "lines" | "scrollTarget"> & {
    highlightLines: number[];
    scrollToLine: number | null;
};

const EMPTY: UseJsonDeltaResult = {
    highlightLines: [],
    scrollToLine: null,
    lines: [],
    scrollTarget: null,
};

export const useJsonDelta = ( data: Data, isActive = true ): UseJsonDeltaResult => {
    const [ result, setResult ] = useState<UseJsonDeltaResult>( EMPTY );

    useEffect( () => {
        if ( ! data ) {
            setResult( EMPTY );
            return;
        }

        const { lines, scrollTarget } = jsonDelta.commit( data as JsonObject );

        // always commit to keep previous in sync
        // but only update result if highlight is active
        if ( ! isActive ) {
            setResult( EMPTY );
            return;
        }

        setResult( {
            highlightLines: lines,
            scrollToLine: scrollTarget,
            lines,
            scrollTarget,
        } );
    }, [ data ] );

    return result;
};
