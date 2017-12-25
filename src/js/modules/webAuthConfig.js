//save all configuration for Auth
const config = {
    domain: 'brunoviera.auth0.com',
    clientID: 'kQg3yYWoD4d8YaNVLNC1Pf82uRV7br67',
    responseType: 'token id_token',
    audience: 'https://brunoviera.auth0.com/userinfo',
    scope: 'openid profile email',
    redirectUri: window.location.href + 'app'
};
export default config;
