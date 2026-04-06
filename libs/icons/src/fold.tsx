import type { IconProps } from './types';

export const FoldIcon = ( { size = 13 }: IconProps ) => {
    return (
        <svg  width={ size } height={ size } viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <polyline points="17 11 12 6 7 11"/>
            <polyline points="17 18 12 13 7 18"/>
        </svg>
    );
}
