import type { IconProps } from './types';

export const ServerIcon = ( { size = 16, strokeWidth = 1.5, ...rest }: IconProps ) => {
    return (
        <svg
            width={ size }
            height={ size }
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={ strokeWidth }
            strokeLinecap="round"
            strokeLinejoin="round"
            { ...rest }
        >
            <rect x="2" y="3" width="20" height="7" rx="2" />
            <rect x="2" y="14" width="20" height="7" rx="2" />
            <circle cx="6" cy="6.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="6" cy="17.5" r="1" fill="currentColor" stroke="none" />
            <line x1="10" y1="6.5" x2="18" y2="6.5" />
            <line x1="10" y1="17.5" x2="18" y2="17.5" />
        </svg>
    );
};
