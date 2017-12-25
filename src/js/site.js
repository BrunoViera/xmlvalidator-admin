import webAuthConfig from './modules/webAuthConfig.js';

const loginBtn = document.getElementById('btn-login');
const webAuth = new auth0.WebAuth(webAuthConfig);

window.addEventListener('load', function() {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        webAuth.authorize();
    });
});
