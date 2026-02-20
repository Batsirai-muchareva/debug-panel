import React, { forwardRef, useCallback, useMemo } from "react";
import { PropsWithChildren } from "react";
import { bemBlock } from "@app/utils/bem";
import { useEffect, useRef } from "@wordpress/element";
import { subtract, useBounds } from "@app/context/bounds-context";
import { usePath } from "@app/context/path-context";
import { useTabs } from "@app/context/tabs/tabs-context";
import { lineMap } from "@libs/data-indexes";

type Props = PropsWithChildren & {
    scrollToLine?: number;
}

export const Scrollable = forwardRef<HTMLDivElement, Props>( ( { children, scrollToLine }, ref ) => {
    const { size } = useBounds();
    const { setPath, path } = usePath();
    const { activeProvider } = useTabs();

    const currentPath = useRef( path )

    useEffect( () => {
        currentPath.current = path;
    }, [ path ]);

    const concatPaths = useCallback( ( next: string ) => {
        const result = currentPath.current
            ? `${currentPath.current}.${next}`
            : next;

        currentPath.current = result;
        return result;
    }, []);


    const getClickedLine = useCallback((target: HTMLElement) => {
        const lineEl =
            target instanceof HTMLSpanElement && target.dataset.line
                ? target
                : target.closest<HTMLElement>("[data-line]");

        return lineEl?.dataset.line
            ? Number(lineEl.dataset.line)
            : undefined;
    }, []);


    useEffect(() => {
        if (!ref || typeof ref === "function" || !ref.current) {
            return;
        }

        const handleDblClick = (event: MouseEvent) => {
            if (!event.metaKey && !event.ctrlKey) return;

            const line = getClickedLine(event.target as HTMLElement);
            if (line == null) return;

            const pathAtLine = lineMap.pathAtLine(line);
            if (!pathAtLine) return;

            setPath(concatPaths(pathAtLine));
        };

        const el = ref.current;
        el.addEventListener("dblclick", handleDblClick);

        return () => {
            el.removeEventListener("dblclick", handleDblClick);
        };
    }, [ref, concatPaths, getClickedLine, setPath]);

    const heightSubtract = useMemo(
        () => subtract - (activeProvider === "schema" ? 26 : 0),
        [activeProvider]
    );


    // useEffect( () => {
    //     if ( ! ref || ! ( 'current' in ref ) || ! ref.current ) {
    //         return;
    //     }
    //
    //     const handleClick = ( event: MouseEvent ) => {
    //         if ( ! event.metaKey && ! event.ctrlKey ) {
    //             return;
    //         }
    //
    //         const clickedLineNumber = getClickedLine( event.target as HTMLElement ) as number;
    //
    //         const pathAtLine = lineMap.pathAtLine( clickedLineNumber );
    //
    //         if ( pathAtLine ) {
    //             setPath( concatPaths( pathAtLine ) );
    //         }
    //     }
    //
    //     ref.current.addEventListener('dblclick', handleClick );
    //
    //     return () => {
    //         ref.current?.removeEventListener('click', handleClick);
    //     };
    // }, [] );
    //
    // const getClickedLine = ( target: HTMLSpanElement ) => {
    //     if ( ! ( target instanceof HTMLSpanElement ) ) {
    //         return;
    //     }
    //
    //     let lineSpan = target.dataset.line ? target : target.closest( '[data-line]' ) as HTMLElement;
    //
    //     if ( ! lineSpan ) {
    //         return;
    //     }
    //
    //     return parseInt( lineSpan.dataset.line as string );
    // }

    // it has to be a calculated popover size
    // 26
    // const heightSubtract = subtract - ( activeProvider === 'schema' ? 26 : 0 );

    return (
        <div
            ref={ ref }
            style={ { height: size.height - heightSubtract } }
            className={ bemBlock.element( 'scrollable' ) }
        >
            { children }
        </div>
    );
} )
