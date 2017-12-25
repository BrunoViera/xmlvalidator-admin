/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//save all configuration for Auth
const config = {
    domain: 'brunoviera.auth0.com',
    clientID: 'kQg3yYWoD4d8YaNVLNC1Pf82uRV7br67',
    responseType: 'token id_token',
    audience: 'https://brunoviera.auth0.com/userinfo',
    scope: 'openid profile email',
    redirectUri: window.location.href + 'app'
};
/* harmony default export */ __webpack_exports__["a"] = (config);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_webAuthConfig_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_sessionHandler_js__ = __webpack_require__(3);



const webAuth = new auth0.WebAuth(__WEBPACK_IMPORTED_MODULE_0__modules_webAuthConfig_js__["a" /* default */]);
let user = null;

function logout() {
    __WEBPACK_IMPORTED_MODULE_1__modules_sessionHandler_js__["a" /* default */].logout();
}

window.addEventListener('load', function() {
    __WEBPACK_IMPORTED_MODULE_1__modules_sessionHandler_js__["a" /* default */].handleAuthentication();
});

document.getElementById('logoutBtn').addEventListener('click', logout);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webAuthConfig_js__ = __webpack_require__(0);


const webAuth = new auth0.WebAuth(__WEBPACK_IMPORTED_MODULE_0__webAuthConfig_js__["a" /* default */]);
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

/* harmony default export */ __webpack_exports__["a"] = ({ logout, handleAuthentication, getUser });


/***/ })
/******/ ]);