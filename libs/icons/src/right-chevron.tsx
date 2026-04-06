import type { IconProps } from './types';

export const RightChevron = ( { size = 13, className }: IconProps ) => {
    return (
        <svg className={ className } xmlns="http://www.w3.org/2000/svg" width={ size } height={ size } viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
    )
}
