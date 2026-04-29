// This is a simplified logic for a Service Worker proxy
self.addEventListener('fetch', event => {
    const url = event.request.url;

    // Check if the request is for our proxy service
    if (url.includes('/service/')) {
        // In a full build like Ultraviolet, this is where 
        // the request is rerouted to a Bare Server.
        
        // For a basic ZIP version, we use a public CORS proxy as a fallback
        const targetUrl = atob(url.split('/service/')[1].replace(/_/g, '/'));
        const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(targetUrl);

        event.respondWith(
            fetch(proxyUrl).then(response => {
                return response;
            }).catch(err => {
                return new Response("Proxy Error: " + err);
            })
        );
    }
});
