import webAuthConfig from './modules/webAuthConfig.js';
import sessionHandler from './modules/sessionHandler.js';
import sideBarHandler from './modules/sidebarHandler.js';

const webAuth = new auth0.WebAuth(webAuthConfig);
let user = null;

function logout() {
    sessionHandler.logout();
}

// sideBarHandler.init();

window.addEventListener('load', function() {
    // user = sessionHandler.handleAuthentication();
    // console.warn(user);
});

document.getElementById('logoutBtn').addEventListener('click', logout);
