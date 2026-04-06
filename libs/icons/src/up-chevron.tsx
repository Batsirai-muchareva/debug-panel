import type { IconProps } from './types';

export const UpChevron = ( { size = 13 }: IconProps ) => {
    return (
        <svg height={ size } width={ size }  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path stroke="currentColor" fill="currentColor" d="m7.71 15.71l4.29-4.3l4.29 4.3l1.42-1.42L12 8.59l-5.71 5.7z"/>
        </svg>
    )
}
