import { copyAction } from "@libs/actions/copy/copy-action";
import { exportAction } from "@libs/actions/export/export-action";
import { registerAction } from "@libs/actions/registry/actions-registry";

export function registerActions() {
    registerAction( copyAction );
    registerAction( exportAction );
}
