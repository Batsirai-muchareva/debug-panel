import {
    createContext,
    type PropsWithChildren,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';

type TabItem = { id: string };

export type ContextValue<T extends TabItem = TabItem> = {
  id: string;
  setId: ( tabId: string ) => void;
  tabs: T[];
};

type Props<T extends TabItem> = PropsWithChildren<{ tabs: T[] }>;

const TabsContext = createContext< ContextValue | null >( null );

export const TabsProvider = <T extends TabItem>( { tabs, children }: Props<T> ) => {
    const [ id, setId ] = useState<string>( tabs[ 0 ].id );

    return (
        <TabsContext.Provider value={ { id, setId, tabs } }>
            { children }
        </TabsContext.Provider>
    );
};

export const useTabs = <T extends TabItem = TabItem>(): ContextValue<T> => {
  const context = useContext( TabsContext );

  if ( ! context ) {
    throw new Error( 'useTabs must be used within a TabsProvider' );
  }

  return context as ContextValue<T>;
};
