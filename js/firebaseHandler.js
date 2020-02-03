$(document).ready(function() {
    init();
});


var isSet = false;
var token;

function init() {
    if (isSet === false) {
        isSet = true;
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }
};

async function onAuthStateChanged(user) {
    if (user) {
        console.log("Signing in successfully");
        var email = user.email
        var prolike = email.split("@")[1]
        if (prolike !== "prolike.io") {
            alert("Not a prolike account!! LOGGING OUT ")
            signOut()
        } else {
            token = await firebase.auth().currentUser.getIdToken()
            setEmail(user.email) //Setting email for email-field document in dillyDally.js
            if (window.location.pathname === "/ddlogin/") 
            {
                window.location.replace("/DillyDally");
            }
        }
    } else {
        if (
            window.location.pathname === "/DillyDally/") {
            window.location.replace("/ddlogin");
        }
    }
};

// Initiates the sign-in flow using GoogleAuthProvider sign in in a popup.
function signIn() {
    console.log("signing in")
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

// Signs-out of Firebase.
function signOut() {
    console.log("signing out")
    firebase.auth().signOut();
    // clear the __session cookie
    document.cookie = '__session=';
};

function getToken() {
    return token;
}




// // Does an authenticated request to a Firebase Functions endpoint using an Authorization header.
// Demo.prototype.startFunctionsRequest = function() {
//   firebase.auth().currentUser.getIdToken().then(function(token) {
//     console.log('Sending request to', this.helloUserUrl, 'with ID token in Authorization header.');
//     var req = new XMLHttpRequest();
//     req.onload = function() {
//       this.responseContainer.innerText = req.responseText;
//     }.bind(this);
//     req.onerror = function() {
//       this.responseContainer.innerText = 'There was an error';
//     }.bind(this);
//     req.open('GET', this.helloUserUrl, true);
//     req.setRequestHeader('Authorization', 'Bearer ' + token);
//     req.send();
//   }.bind(this));
// };

// // Does an authenticated request to a Firebase Functions endpoint using a __session cookie.
// Demo.prototype.startFunctionsCookieRequest = function() {
//   // Set the __session cookie.
//   firebase.auth().currentUser.getIdToken(true).then(function(token) {
//     // set the __session cookie
//     document.cookie = '__session=' + token + ';max-age=3600';

//     console.log('Sending request to', this.helloUserUrl, 'with ID token in __session cookie.');
//     var req = new XMLHttpRequest();
//     req.onload = function() {
//       this.responseContainerCookie.innerText = req.responseText;
//     }.bind(this);
//     req.onerror = function() {
//       this.responseContainerCookie.innerText = 'There was an error';
//     }.bind(this);
//     req.open('GET', this.helloUserUrl, true);
//     req.send();
//   }.bind(this));
// };