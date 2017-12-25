import webAuthConfig from './modules/webAuthConfig.js';
import sessionHandler from './modules/sessionHandler.js';

const webAuth = new auth0.WebAuth(webAuthConfig);
let user = null;

function logout() {
    sessionHandler.logout();
}

window.addEventListener('load', function() {
    sessionHandler.handleAuthentication();
});

document.getElementById('logoutBtn').addEventListener('click', logout);
