import { useKey } from "@libs/key-context";
import { Variant } from "@libs/types";

import { Tab } from "@app/context/tabs/types";

export const createIndexResolver =
    (
        tabs: Tab[],
        activeTabId?: Tab["id"],
        activeVariantId?: Variant["id"]
    ) =>
        (): number => {
            const target = useKey();

            if ( target === "tab" ) {
                return tabs.findIndex( tab => tab.id === activeTabId );
            }

            if ( ! activeTabId ) {
                return -1;
            }

            const tab = tabs.find( tab => tab.id === activeTabId );

            return tab?.variants.findIndex( st => st.id === activeVariantId ) ?? -1;
        };
