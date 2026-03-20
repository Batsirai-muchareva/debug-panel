import { copy } from "./actions/copy";
import { expand } from "./actions/expand";
import { exportAction } from "./actions/export";
import { fold } from "./actions/fold";
import { highlight } from "./actions/highlight";
import { registerAction } from "./actions/registry/actions-registry";
import { search } from "./actions/search";

export { useToolbarState } from "./context/toolbar-context";
export { Toolbar } from "./toolbar";
export { ToolbarProvider } from "./context/toolbar-context";

export function registerToolbarActions() {
    registerAction( highlight );
    registerAction( fold );
    registerAction( expand );
    registerAction( search );
    registerAction( copy );
    registerAction( exportAction );
}
