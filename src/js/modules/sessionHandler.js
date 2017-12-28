import webAuthConfig from './webAuthConfig.js';

const webAuth = new auth0.WebAuth(webAuthConfig);
const clientID = 'kQg3yYWoD4d8YaNVLNC1Pf82uRV7br67';

function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    webAuth.logout({
        returnTo: 'http://localhost:3000/',
        client_id: clientID
    });
}

function getUser() {
    return new Promise(resolve => {
        webAuth.client.userInfo(localStorage.getItem('access_token'), function(err, user) {
            if (err) {
                window.location = '/';
            }
            return resolve(user);
        });
    });
}

function init() {
    return new Promise(resolve => {
        webAuth.parseHash(function(err, authResult) {
            if (err) {
                console.log('sessionHandler init() error, ', err);
                return resolve(false);
            } else if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
                localStorage.setItem('access_token', authResult.accessToken);
                localStorage.setItem('id_token', authResult.idToken);
                localStorage.setItem('expires_at', expiresAt);
            } else {
                const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
                if (new Date().getTime() > expiresAt) {
                    console.log('expires_at vencido');
                    return resolve(false);
                }
            }
            return resolve(true);
        });
    });
}

export default { init, logout, getUser };
