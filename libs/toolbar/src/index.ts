import { copy } from './actions/copy';
import { expand } from './actions/expand';
import { exportAction } from './actions/export';
import { fold } from './actions/fold';
import { highlight } from './actions/highlight';
import { search } from './actions/search';
import { valueSearch } from './actions/value-search';
import { registerAction } from './actions-registry';

export { useToolbar } from "./context/toolbar-context";
export { Toolbar } from "./components/toolbar";
export { ToolbarProvider } from "./context/toolbar-context";

export function initToolbarActions() {
    registerAction( highlight );
    registerAction( fold );
    registerAction( expand );
    registerAction( search );
    registerAction( copy );
    registerAction( exportAction );
    registerAction( valueSearch );
}
