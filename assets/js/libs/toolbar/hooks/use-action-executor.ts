import { showNotification } from "@libs/notification";
import { Data } from "@libs/types";

import { ActionConfig, ActionExecutionContext } from "../actions/registry/define-action";

// export const useActionExecutor = () => {
//     const { data } = useFilteredData();
//
//     return async ( action: ActionConfig, ctx: ActionContext ) => {
//         if ( ! data ) {
//             showNotification(
//                 `No content to ${ action.title }`,
//                 "warning"
//             );
//             return;
//         }
//
//         await action.onExecute?.( {
//             ...ctx,
//             data,
//         } );
//     };
// };
export const useActionExecutor = ( data: Data ) => {
    return async ( action: ActionConfig, ctx: Omit<ActionExecutionContext, 'data'> ) => {
        // if ( ! data ) {
        //     showNotification(
        //         `No content to ${ action.title }`,
        //         "warning"
        //     );
        //     return;
        // }

        await action.onExecute?.( {
            ...ctx,
            data,
        } );
    };
};
