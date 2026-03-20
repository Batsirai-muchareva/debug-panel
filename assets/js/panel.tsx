import React from "react";

import { useBrowse } from "@app/context/browse-context";
import { useHasData } from "@app/hooks/use-has-data";
import { BrowseView } from "@app/views/browse-view";
import { JsonView } from "@app/views/json-view";
import { NoData } from "@component/no-data";

export const Panel = () => {
  const hasData = useHasData();
  const { isBrowsing } = useBrowse();

  if ( ! hasData ) {
    return <NoData />;
  }

  if ( isBrowsing ) {
    return <BrowseView />;
  }

    return <JsonView />
};
