document.getElementsByClassName('js-hypothesis-config')[0].innerHTML = JSON.stringify(window.hypothesisConfig());
(function() {

    var popupwindow = function(url, title, w, h) {
        if (w > screen.width)
            w = screen.width;
        if (h > screen.height)
            h = screen.height;
        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2);
        var newwindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
        if (window.focus) {newwindow.focus()};
    }
    var onLogoutRequest = function() {
        // TODO: if hypothesis changes how it stores the data, this won't work anymore
        var apiDomain = new URL(window.hypothesisConfig().services[0].apiUrl).hostname;
        apiDomain = apiDomain.replace(/\./g, '%2E');
        var storageKey = `hypothesis.oauth.${apiDomain}.token`;
        localStorage.removeItem('access_token');
        localStorage.removeItem(storageKey);
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        window.location.reload();
    }
    var h = window.hypothesisConfig();
    var onLoginRequest = function() {
        var newWindow = popupwindow(h.oauthEndpoint + '?popup=true', 'Linalgo oauth', 500, 500);
    };
    if (h.services && h.services[0]) {
        h.services[0].onLoginRequest = onLoginRequest;
        h.services[0].onLogoutRequest = onLogoutRequest;
    }
    window.hypothesisConfig = function() {
        return h;
    };
})();