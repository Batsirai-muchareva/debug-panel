import { useEffect, useState } from 'react'

import { ServerIcon } from '@debug-panel/icons';
import { Button } from '@debug-panel/ui';

import styles from './server-view-btn.module.scss';

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}
export const ServerButton = () => {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>( null )

    const [isInstallable, setIsInstallable] = useState( false )

    useEffect( () => {
        const handler = ( e: Event ) => {
            e.preventDefault()
            setDeferredPrompt( e as BeforeInstallPromptEvent )
            setIsInstallable( true )
        }

        window.addEventListener( 'beforeinstallprompt', handler )

        return () => {
            window.removeEventListener( 'beforeinstallprompt', handler )
        }
    }, [] )

    const handleInstall = () => {
        window.open( '/wp-admin/admin.php?page=debug-panel', '_blank' );
        // if ( !deferredPrompt ) return
        //
        // await deferredPrompt.prompt()
        //
        // const choice = await deferredPrompt.userChoice
        // console.log( choice.outcome )
        //
        // setDeferredPrompt( null )
        // setIsInstallable( false )
    }

    // if ( ! isInstallable ) return null

    return (
        <Button
            className={ `${ styles.btn }` }
            onClick={ handleInstall }
            title="Server Logs"
        >
            <ServerIcon size={ 13 } />
        </Button>
    );
};
