import React from 'react';
import { memo } from "react";

import { Toolbar, ToolbarProvider } from "@libs/toolbar";

import { useFilteredData } from "@app/context/filtered-data-context";
import { useTabs } from "@app/context/tabs/tabs-context";
import { MonacoEditor } from "@component/monaco-editor";

export const JsonView = memo( () => {
    const { activeVariant } = useTabs();
    const { data } = useFilteredData();

    return (
        <ToolbarProvider>
            <div className="editor-wrapper">
                <Toolbar variantId={ activeVariant } data={ data } />
                <MonacoEditor />
            </div>
        </ToolbarProvider>
    )
} );
