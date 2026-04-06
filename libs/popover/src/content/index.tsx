import type { PropsWithChildren } from 'react';

import { Box } from '@debug-panel/ui';

import styles from './content.module.scss';

export const POPOVER_CONTENT_PORTAL_ID = 'popover-content-portal-id';

export const Content = ( { children }: PropsWithChildren ) => {
  return (
      <Box className={ styles.wrapper }>
          <Box id={ POPOVER_CONTENT_PORTAL_ID }/>
          <Box className={ styles.content }>
              { children }
          </Box>
      </Box>
  );
};
