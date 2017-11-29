const webAuth = new auth0.WebAuth({
    domain: 'brunoviera.auth0.com',
    clientID: 'kQg3yYWoD4d8YaNVLNC1Pf82uRV7br67',
    responseType: 'token id_token',
    audience: 'https://brunoviera.auth0.com/userinfo',
    scope: 'openid profile',
    redirectUri: window.location.href
});

function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayButtons();
}

window.addEventListener('load', function() {
    console.log('ready');
    webAuth.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
            console.log(profile);
        }
    });
});
