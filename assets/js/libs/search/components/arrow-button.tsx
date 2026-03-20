import React from "react";

import { Arrow } from "@libs/icons";

export const ArrowButton = ( { onClick }: { onClick: () => void } ) => {
    return (
        <button className="search-back" onClick={ onClick } title="Close search">
            <Arrow />
        </button>
    )
}
