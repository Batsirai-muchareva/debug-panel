import React from "react";
import { useRef } from "@wordpress/element";

import { HighlightScroller } from "@libs/json-change-viewer";

import { useBrowse } from "@app/context/browse-context";
import { useFilteredData } from "@app/context/filtered-data-context";
import { useHasData } from "@app/hooks/use-has-data";
import { MonacoEditor } from "@component/monaco-editor";
import { NoData } from "@component/no-data";
import { Scrollable } from "@component/scrollable";
import { Toolbar } from "@component/toolbar";
import { BrowseView } from "@component/views/browse-view";
import { JsonView } from "@component/views/json-view";

export const ActiveTabContent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const hasData = useHasData();
  const { data } = useFilteredData();
  const { isBrowsing } = useBrowse();

  const enableHighlight = true; // your condition

  if (!hasData) {
    return <NoData />;
  }

  // Browse mode - show list of keys to select from
  if (isBrowsing) {
    return <BrowseView />;
  }

  const content = (
    // <Scrollable ref={ref}> #1e1e1e
    <>
      {/*<Toolbar />*/}
      <div className="editor-wrapper">
        <div className="editor-toolbar">
          <div className="toolbar-group">
            <button
              className="tool-btn"
              id="highlightBtn"
              title="Click lines to highlight them"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Highlight
            </button>

            <button
              className="tool-btn"
              id="collapseBtn"
              title="Collapse all foldable sections"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="17 11 12 6 7 11" />
                <polyline points="17 18 12 13 7 18" />
              </svg>
              Collapse all
            </button>

            <button
              className="tool-btn icon-only"
              id="clearBtn"
              title="Clear highlights"
              style={{ display: "none" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="toolbar-divider"></div>

          <div className="toolbar-group">
            <button className="tool-btn" id="copyBtn">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              <span id="copyLabel">Copy</span>
            </button>

            <button className="tool-btn">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </button>
          </div>
        </div>
        <MonacoEditor />
      </div>
    </>
    // </Scrollable>
  );

  if (!enableHighlight) {
    return content;
  }

  return (
    <HighlightScroller ref={ref} data={data}>
      {content}
    </HighlightScroller>
  );

  // Detail mode - show JSON data with back button
  // TODO conditional render highlight with condition
  // return (
  //     <HighlightScroller ref={ ref } data={ data }>
  //         <Scrollable ref={ ref }>
  //             <JsonView />
  //         </Scrollable>
  //     </HighlightScroller>
  // );
};

// const Content = createContent( () => {
//     const { isBrowsing } = useBrowse();
//
//     if ( isBrowsing ) {
//         return <BrowseView />
//     }
//
//     return <JsonView />
// } );
//
//
// const createContent = () => {
//
// }

// // Use dedicated SchemaViewer for schema tab (virtualized for performance)
// if ( activeTab === 'schema' ) {
//     return <SchemaViewer />;
// }
//
// if ( ! shouldShowData?.( originalData ) ) {
//     return <EmptyState text={ getMessage?.( originalData ) } />
// }
//
// const activeVariant = variants.find( v => v.id === activeSubTab );
// const showVariantData = activeVariant?.shouldShowData?.( originalData );
//
// // handle properly empty state
// return (
//     <>
//         {/*<When if={  }>*/}
//
//         {/*</When>*/}
//         <Toolbar />
//         {/*<Search disabled={ ! showVariantData }/>*/}
//         {/*<Actions disabled={ ! showVariantData } />*/}
//         {
//             showVariantData
//                 ? <JsonView />
//                 : <EmptyState text={ activeVariant?.getEmptyMessage?.( data ) } />
//         }
//     </>
// )
// }

// const useView = () => {
//     // how do we say the view is browse view
//     // how do we say its now json view
//     // how do we say its empty
//
//     // we need to define these
//
//     return {
//         isBrowsing: provider.supportsBrowsing && selectedBrowsedKeys
//     }
// }
