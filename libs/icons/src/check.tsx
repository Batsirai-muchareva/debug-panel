import type { IconProps } from './types';

export const CheckIcon = ( { size = 13 }: IconProps ) => {
    return (
        <svg height={ size } width={ size } viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
        </svg>
    )
}
