const loginBtn = document.getElementById('btn-login');
const webAuth = new auth0.WebAuth({
    domain: 'brunoviera.auth0.com',
    clientID: 'kQg3yYWoD4d8YaNVLNC1Pf82uRV7br67',
    responseType: 'token id_token',
    audience: 'https://brunoviera.auth0.com/userinfo',
    scope: 'openid profile',
    redirectUri: window.location.href
});

function setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
}

function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
}

function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            window.location.hash = '';
            setSession(authResult);
            window.location.href = 'app';
        } else if (err) {
            console.log(err);
        } else {
            console.log('no estlas logueado');
        }
    });
}

window.addEventListener('load', function() {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        webAuth.authorize();
    });

    handleAuthentication();
});
