import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';
import { store } from '@debug-panel/storage';

const INITIAL_HEIGHT = 550;

const INITIAL_WIDTH = 420;

type Position = {
    x: number;
    y: number;
};

type Size = {
    height: number;
    width: number;
};

type SetState<T> = Dispatch<SetStateAction<T>>;

type ContextValue = {
    position: Position;
    setPosition: SetState<Position>;
    size: Size;
    setSize: SetState<Size>;
};

const Context = createContext<ContextValue | undefined>( undefined );

export const LayoutBoundsProvider = ( { children }: PropsWithChildren ) => {
    const [ position, setPosition ] = useState<Position>( { x: 0, y: 0 } );
    const [ size, setSize ] = useState<Size>( () => {
        const stored = store.getLayout();

        return {
            width: stored?.width ?? INITIAL_WIDTH,
            height: stored?.height ?? INITIAL_HEIGHT,
        }
    } );

    useEffect( () => {
        store.setLayout( { height: size.height, width: size.width } )
    }, [ size.height, size.width ] );

    return (
        <Context.Provider value={ { position, setPosition, size, setSize } }>
            { children }
        </Context.Provider>
    );
};

export const useLayoutBounds = () => {
    const context = useContext( Context );

    if ( ! context ) {
        throw new Error( 'useBounds must be used within a BoundsProvider' );
    }

    return context;
};
