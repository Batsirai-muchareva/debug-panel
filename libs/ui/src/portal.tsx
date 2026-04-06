import { createPortal } from 'react-dom';

import type { PropsWithChildren } from 'react';

export const Portal = ( { children, container }: PropsWithChildren<{ container: HTMLElement }> ) => {
    return createPortal( children, container )
}


