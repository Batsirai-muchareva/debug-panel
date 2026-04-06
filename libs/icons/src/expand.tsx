import type { IconProps } from './types';

export const ExpandIcon = ( { size = 13 }: IconProps ) => {
    return (
        <svg height={ size } width={ size } style={ { transform: 'rotate(181deg)' } } viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="17 11 12 6 7 11"/>
            <polyline points="17 18 12 13 7 18"/>
        </svg>
    );
}
