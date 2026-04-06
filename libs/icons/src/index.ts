import { createElement, type ReactElement } from 'react';

import { ArrowIcon } from './arrow';
import { BugIcon } from './bug';
import { CheckIcon } from './check';
import { RightChevron } from './right-chevron';
import { ClockIcon } from './clock';
import { CloseIcon } from './close';
import { CopyIcon } from './copy';
import { ExpandIcon } from './expand';
import { ExportIcon } from './export';
import { FoldIcon } from './fold';
import { HighlightIcon } from './highlight';
import { Info } from './info';
import { NoIcon } from './no-icon';
import { PinIcon } from './pin';
import { SearchIcon } from './search';
import type { IconProps } from './types';
import { Warning } from './warning';
import { UpChevron } from './up-chevron';

const iconRegistry = {
    bug: BugIcon,
    close: CloseIcon,
    copy: CopyIcon,
    expand: ExpandIcon,
    export: ExportIcon,
    fold: FoldIcon,
    highlight: HighlightIcon,
    search: SearchIcon,
    arrow: ArrowIcon,
    clock: ClockIcon,
    chevron: RightChevron,
    pin: PinIcon,
    check: CheckIcon,
    warning: Warning,
    info: Info,
    'up-chevron': UpChevron,
} as const;

export type IconName = keyof typeof iconRegistry;

export function renderIcon( name: IconName ): ReactElement< IconProps > {
    const icon = iconRegistry[ name ];

    if ( ! icon ) {
        return createElement( NoIcon )
    }

    return createElement( icon )
}

export {
    BugIcon,
    CloseIcon,
    CopyIcon,
    ExpandIcon,
    ExportIcon,
    FoldIcon,
    HighlightIcon,
    SearchIcon,
    ArrowIcon,
    ClockIcon,
    RightChevron,
    PinIcon,
    CheckIcon,
    Warning,
    Info,
    UpChevron,
}
