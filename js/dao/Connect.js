let apikey = 'AIzaSyB_qCla3aqrru4Y4n0UDrRr5xEOjHoXzc4';
let clientId = '157552515623-r8uv3qfugq1altl40mce9vuacmif4t90.apps.googleusercontent.com';
let scopeAccess = 'https://www.googleapis.com/auth/blogger';
let auth;

export async function init() {
    gapi.load('auth2', start);
}

function start() {

    auth = gapi.auth2.init({
        'client_id': clientId,
        'scope': scopeAccess,
        'apiKey': apikey
    });

    auth.attachClickHandler('init', {}, onSuccess, onFailure);
    renderButton();
}

function renderButton() {
    gapi.signin2.render(
        'init',
        {
            scope: 'email profile',
            width: 300,
            height: 70,
            longtitle: true,
            theme: 'dark',
            onsuccess: onSuccess,
            onfailure: onFailure
        })
}

var onSuccess = function (user) {
        
    console.log('Signed in as ' + user.getBasicProfile().getName());
    localStorage.setItem('userName', user.getBasicProfile().getName())
    localStorage.setItem('accesToken', user.Zi.access_token);
};

/**
* Handle sign-in failures.
*/
var onFailure = function (error) {
    console.log(error);
};