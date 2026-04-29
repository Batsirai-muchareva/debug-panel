import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Box } from '@debug-panel/ui';

import type { IndicatorProps } from '../../shared/group';

import styles from './indicator.module.scss';

export const ButtonIndicator = ( { activeIndex, tabCount, containerRef: trackRef }: IndicatorProps ) => {
  const [ width, setWidth ] = useState( 0 );
  const padding = 3;

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
