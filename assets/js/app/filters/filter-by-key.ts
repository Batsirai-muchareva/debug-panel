import { Data } from "@libs/types";
import { isNotEmpty } from "@libs/utils";

export const filterByKey = ( key?: string | null ) => {
    return ( data: Data ): Data => {
        if ( ! key || ! isNotEmpty( data ) ) {
            return data
        }

        return data[ key ] as Data
    }
}
