import React, { PropsWithChildren } from "react"

import { bemBlock } from "@app/utils/bem";

type Props = PropsWithChildren & {
    className?: string;
    onClick?: () => void;
}
export const Button = ( { children, className, onClick }: Props ) => (
    <button onClick={ onClick } className={ `${ bemBlock.element( 'button' ) } ${ className ?? '' }` }>
        { children }
    </button>
)
