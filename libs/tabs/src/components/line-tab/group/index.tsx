import React, { useState } from 'react';

import { Indicator } from '../indicator';
import type { InjectedProps } from '../item';

import styles from './group.module.scss';

interface GroupProps {
  defaultActive: string;
  children: React.ReactNode;
  onChange?: ( id: string ) => void;
}

export const Group = ( { defaultActive, children, onChange }: GroupProps ) => {
  const [active, setActive] = useState( defaultActive );

  const items = React.Children.toArray( children ).filter( React.isValidElement );
  const activeIndex = items.findIndex(
    ( child ) => ( child as React.ReactElement<InjectedProps> ).props.id === active,
  );

  function activate( id: string ) {
    setActive( id );
    onChange?.( id );
  }

  return (
    <div className={ styles.group }>
      <Indicator count={ items.length } index={ activeIndex } />

      { items.map( ( child ) => {
        const item = child as React.ReactElement<InjectedProps>;

        return React.cloneElement( item, {
          isActive: item.props.id === active,
          onClick: () => activate( item.props.id ),
        } );
      } ) }
    </div>
  );
};
