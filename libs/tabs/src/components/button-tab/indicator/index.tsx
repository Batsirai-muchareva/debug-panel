import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Box } from '@debug-panel/ui';

import styles from './indicator.module.scss';


type Props = {
  tabCount: number;
  padding?: number;
  activeIndex: number;
  trackRef: React.RefObject<HTMLDivElement>;
};

export const Indicator = ( { tabCount, padding = 3, activeIndex, trackRef }: Props ) => {
  const [ width, setWidth ] = useState( 0 );

  const calculateSize = useCallback( () => {
    const el = trackRef.current;

    if ( ! el || tabCount === 0 ) {
      return;
    }

    setWidth( ( el.clientWidth - padding * 2 ) / tabCount );

  }, [ trackRef, tabCount, padding ] );

  useEffect( () => {
    requestAnimationFrame( calculateSize );
  }, [ calculateSize ] );

  useEffect( () => {
    const el = trackRef.current;

    if ( ! el ) {
      return;
    }

    const observer = new ResizeObserver( calculateSize );
    observer.observe( el );

    return () => observer.disconnect();
  }, [ calculateSize ] );

  const style: React.CSSProperties = {
    width,
    transform: `translateX(${activeIndex * width + padding}px)`,
    opacity: width === 0 ? 0 : 1, /** hide the flash on first render before width is measured **/
  };

  return <Box style={ style } className={ styles.indicator } />;
};












//export const PillIndicator = forwardRef<HTMLDivElement, Props>(
//   ( { tabCount, className, padding = 3, activeIndex }, ref ) => {
//     const [width, setWidth] = useState( 0 );
//     // const { getActiveIndex } = useTabs();
//     // const activeIndex = getActiveIndex();
//
//     const calculateSize = useCallback( () => {
//       if ( !ref || typeof ref === 'function' || !ref.current || tabCount === 0 ) {
//         return;
//       }
//
//       const element = ref.current;
//
//       const elementWidth = element?.clientWidth;
//
//       setWidth( elementWidth / tabCount );
//     }, [] );
//
//     useEventBus( 'window:mousemove', calculateSize );
//
//     useEffect( () => {
//       requestAnimationFrame( () => {
//         calculateSize();
//       } );
//     }, [] );
//
//     const styles = {
//       width: width,
//       transform: `translateX(${activeIndex * ( width - 3 )}px)`,
//     };
//
//     return <Box style={styles} className={className} />;
//   },
// );
