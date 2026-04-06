import { jsonDiffs } from "../core/json-diffs";
import {
    applyPolicy,
    changesToLineRanges,
    findScrollTarget,
    lineRangesToLines,
} from "../core/transforms";
import type { CommitResult, JsonObject } from "../types";

type JsonDelta = {
    commit: ( next: JsonObject ) => CommitResult;
    reset: () => void;
};

const createJsonDelta = (): JsonDelta => {
    let previous: JsonObject | null = null;

    return {
        commit( next ) {
            const raw = jsonDiffs( next, previous );
            const changes = applyPolicy( raw );
            const ranges  = changesToLineRanges( changes );
            const lines   = lineRangesToLines( ranges );
            const scroll  = findScrollTarget( ranges );

            previous = next;

            return {
                changes,
                lineRanges: ranges,
                lines,
                scrollTarget: scroll,
            };
        },

        reset() {
            previous = null;
        },
    };
};

export const jsonDelta = createJsonDelta();
