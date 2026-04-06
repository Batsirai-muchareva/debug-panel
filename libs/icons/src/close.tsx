import type { IconProps } from './types';

export const CloseIcon = ( { size = 13, className }: IconProps  ) => {
    return (
        <svg className={ className } width={ size } height={ size } viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    );
}
