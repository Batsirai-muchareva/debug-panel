import React, {
  Children,
  isValidElement,
  type ReactElement,
  useRef,
  useState,
} from 'react';

import { Indicator } from '../indicator';
import type { InjectedProps } from '../item';

import styles from './group.module.scss';

interface GroupProps {
  defaultActive: string;
  children: React.ReactNode;
  onChange?: ( id: string ) => void;
}

export const Group = ( { defaultActive, children, onChange }: GroupProps ) => {
  const [ active, setActive ] = useState( defaultActive );
  const trackRef = useRef<HTMLDivElement>( null );

  const items = Children.toArray( children ).filter( isValidElement );
  const tabCount = items.length;

  function activate( id: string ) {
    setActive( id );

    onChange?.( id );
  }

  const activeIndex = items.findIndex(
    ( child ) => ( child as ReactElement< InjectedProps > ).props.id === active,
  );

  return (
    <div className={ styles.group } ref={ trackRef }>
      <Indicator
        trackRef={ trackRef }
        tabCount={ tabCount }
        activeIndex={ activeIndex }
      />

      {
        items.map( ( child ) => {
          const item = child as React.ReactElement<InjectedProps>;

          return React.cloneElement( item, {
            isActive: item.props.id === active,
            onClick: () => activate( item.props.id ),
          } );
        } )
      }
    </div>
  );
};
