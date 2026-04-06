import type { IconProps } from './types';

export const ArrowIcon = ( { size = 13, strokeWidth = 2 }: IconProps ) => {
    return (
        <svg width={ size } height={ size } viewBox="0 0 24 24" fill="none" strokeWidth={ strokeWidth } stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
        </svg>
    )
}
