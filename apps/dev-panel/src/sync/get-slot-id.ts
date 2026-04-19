type ExtendedWindow = {
  debugPanelConfig?: {
    slot_id?: string;
  };
};

// this should not be here dynamically injected or part of adapter
export const getSlotId = () => {
  const extendedWindow = window as ExtendedWindow;
  const id = extendedWindow.debugPanelConfig?.slot_id;

  if ( ! id ) {
    console.error( 'Element id is required for rendering the Debug Panel' );

    return '';
  }

  return id;
};
