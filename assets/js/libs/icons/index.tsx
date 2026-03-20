import { NamedIcon } from "./create-icon";
import { Arrow, Cancel, SearchIcon } from "./icons";

const iconRegistry = {
    search: SearchIcon,
    arrow: Arrow,
    cancel: Cancel
} as const;

export type IconName = keyof typeof iconRegistry;

export function getIcon( name: IconName ): NamedIcon {
    return iconRegistry[ name ];
}

export {
    SearchIcon,
    Arrow,
    Cancel
}
