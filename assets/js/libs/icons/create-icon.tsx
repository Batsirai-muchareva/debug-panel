import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    strokeWidth?: number;
}

export interface NamedIcon {
    ( props: IconProps ): React.ReactElement;
}

export const createIcon = ( name: string, path: React.ReactNode ): NamedIcon => {
    return ( { size = 24, strokeWidth = 2, ...props }: IconProps ) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={ size }
            height={ size }
            viewBox={ `0 0 24 24` }
            fill="none"
            stroke="currentColor"
            strokeWidth={ strokeWidth }
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-label={ name }
            { ...props }
        >
      { path }
    </svg>
    );
}
