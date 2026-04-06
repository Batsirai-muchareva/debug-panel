import type { IconProps } from './types';

export const SearchIcon = ( { size = 13, className }: IconProps ) => {
    return (
        <svg className={ className } width={ size } height={ size } viewBox="0 0 24 24" fill="none" stroke="currentColor"  xmlns="http://www.w3.org/2000/svg" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
    );
}
