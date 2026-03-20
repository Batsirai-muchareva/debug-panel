import React from "react";

import { createIcon } from "./create-icon";

export const SearchIcon = createIcon(
    "search",
    <>
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </>
);


export const Arrow = createIcon(
    'arrow',
    <>
        <line x1="19" y1="12" x2="5" y2="12"/>
        <polyline points="12 19 5 12 12 5"/>
    </>
)

export const Cancel = createIcon(
    'cancel',
    <path d="M2 2l6 6M8 2l-6 6"/>
)
