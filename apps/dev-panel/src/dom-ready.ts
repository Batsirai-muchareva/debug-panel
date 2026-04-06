export default function domReady( callback: VoidFunction ) {
  if ( typeof document === 'undefined' ) {
    return;
  }

  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    return void callback();
  }

  document.addEventListener( 'DOMContentLoaded', callback );
}
