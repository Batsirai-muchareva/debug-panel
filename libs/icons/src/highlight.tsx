import type { IconProps } from './types';

export const HighlightIcon = ( { size = 13 }: IconProps ) => {
    return (
        <svg height={ size } width={ size } viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
    );
}
