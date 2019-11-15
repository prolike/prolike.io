if (sessionStorage.getItem("user") != null ) {
    document.querySelector(".logout-button").innerHTML = "Log out";
    document.querySelector(".logout-button").setAttribute("onclick", "logoutFunction()")
    document.querySelector(".logout-popup-link").innerHTML = "Log out";
    document.querySelector(".logout-popup-link").setAttribute("onclick", "logoutFunction()")
    document.querySelector(".boards-button").removeAttribute("style")

}

else {
    document.querySelector(".logout-button").setAttribute("href", "/customer-login/")
    document.querySelector(".boards-button").setAttribute("style", "display: none;")
    document.querySelector(".boards-popup").setAttribute("style", "display: none;")
    document.querySelector(".logout-popup-link").setAttribute("href", "/customer-login/")
}

function logoutFunction() {
    sessionStorage.clear();
    window.location.replace("/")
};