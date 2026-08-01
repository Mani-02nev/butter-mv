export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('Butter MV ServiceWorker registered: ', reg.scope);
        })
        .catch((err) => {
          console.log('Butter MV ServiceWorker registration failed: ', err);
        });
    });
  }
}
