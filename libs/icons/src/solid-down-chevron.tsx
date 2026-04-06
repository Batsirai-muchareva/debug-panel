import type { IconProps } from './types';

export const SolidDownChevron = ( { size = 13 }: IconProps ) => {
    return (
        <svg height={ size } width={ size } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18.53 9.53a.75.75 0 0 0 0-1.06H5.47a.75.75 0 0 0 0 1.06l6 6a.75.75 0 0 0 1.06 0z"/>
        </svg>
    )
}
