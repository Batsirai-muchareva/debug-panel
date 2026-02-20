import React from "react";
import { useBrowse } from "@app/context/browse-context";
import { NoData } from "@component/no-data";
import { JsonView } from "@component/json-viewer/json-view";
import { BrowseView } from "@component/json-viewer/browse-view";
import { useFilteredData } from "@app/context/filtered-data/filtered-data-context";

export const ActiveTabContent = () => {
    const { data } = useFilteredData();
    const { isBrowsing } = useBrowse();

    if ( ! Boolean( data ) ) {
        return <NoData />;
    }

    // Browse mode - show list of keys to select from
    if ( isBrowsing ) {
        return (
            <BrowseView />
        );
    }

    // Detail mode - show JSON data with back button
    return <JsonView />;
};




















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
