var login_url = "http://52.229.58.170:8000/hub/login"

function updateUrl() {
    var randomNumber = Math.floor(Math.random() * 100);
    element = document.getElementById("notebook1")
    username = "user" + randomNumber;
    password = "user" + randomNumber + "magickey"
    url = "http://52.229.58.170:8000/user/user" + randomNumber + "/notebooks/BeginHere_TextClassificationPython.ipynb";

    if (element != null) {
        setCredentials(username, password);
        element.setAttribute("href", url);
    }

    ret = $.ajax(login_url,
        {
            method: 'POST',
            data: { 'username': username, 'password': password },
            xhrFields: { withCredentials: true },
            crossDomain: true,
        });

    ret = $.ajax(url,
        {
            method: 'GET',
            xhrFields: { withCredentials: true },
            crossDomain: true,
            error: function (data) {
                document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/;"); });
                document.cookie += "jupyter-hub-token=; path='/'; domain=52.229.58.170; expires=" + new Date(0).toGMTString();
                document.cookie += "_xsrf=; path='/'; domain=52.229.58.170; expires=" + new Date(0).toGMTString();
            }
        });

};

function setCredentials(username, password) {
    element = document.getElementById("notebook1")
    if (element != null) {
        element.setAttribute("username", username);
        element.setAttribute("password", password);
    }
}

function showCredentials() {
    element = document.getElementById("notebook1");
    username = element.getAttribute("username");
    password = element.getAttribute("password");
    var creds = window.open('', 'Credentials', 'width=400,height=100');
    creds.document.write(`<html>
        <head>
        <title>Credentials information</title>
        </head>
        <body>
            <p> Please use the following credentials : </p>
            <p>Username = ` + username + `
           <br>Password = ` + password + `</p >
        </body>
        </html>`);
}