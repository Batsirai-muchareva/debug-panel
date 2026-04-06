import type { IconProps } from './types';

export const Info = ( { size = 13 }: IconProps ) => {
    return (
        <svg height={ size } width={ size } viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
    );
}
