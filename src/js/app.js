import webAuthConfig from './modules/webAuthConfig.js';
import sessionHandler from './modules/sessionHandler.js';
import sideBarHandler from './modules/sidebarHandler.js';

const webAuth = new auth0.WebAuth(webAuthConfig);
let user = null;

window.addEventListener('DOMContentLoaded', async function() {
    sideBarHandler.init();
    const allGood = await sessionHandler.init();
    if (allGood) {
        user = await sessionHandler.getUser();
        console.log(user);
    } else {
        window.location = '/';
    }
});
