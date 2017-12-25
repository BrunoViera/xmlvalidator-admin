import webAuthConfig from './webAuthConfig.js';

const webAuth = new auth0.WebAuth(webAuthConfig);
let user = null;

function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    window.location.href = '/';
}

function setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
}

function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            window.location.hash = '';
            setSession(authResult);
        } else if (err) {
            console.log(err);
        } else {
            const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
            if (new Date().getTime() < expiresAt) {
                webAuth.authorize();
            }
        }
        setUser();
    });
}

function checkAuthentication() {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    if (new Date().getTime() < expiresAt) {
        webAuth.authorize();
    } else {
        setUser();
    }
}

function setUser() {
    const accessToken = localStorage.getItem('access_token');
    webAuth.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
            user = profile;
        } else if (err) {
            console.error(err);
        }
    });
}

function getUser() {
    return user;
}

export default { logout, handleAuthentication, getUser };
