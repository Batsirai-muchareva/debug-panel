import type { IconProps } from './types';

export const ListIcon = ( { size = 13 }: IconProps ) => {
    return (
        <svg height={ size } width={ size }  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7.5 8h14c.6 0 1-.4 1-1s-.4-1-1-1h-14c-.6 0-1 .4-1 1s.4 1 1 1m14 3h-10c-.6 0-1 .4-1 1s.4 1 1 1h10c.6 0 1-.4 1-1s-.4-1-1-1m0 5h-6c-.6 0-1 .4-1 1s.4 1 1 1h6c.6 0 1-.4 1-1s-.4-1-1-1M3.5 6c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4 5c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1m4 5c-.6 0-1 .4-1 1s.4 1 1 1s1-.4 1-1s-.4-1-1-1"/>
        </svg>
    )
}
