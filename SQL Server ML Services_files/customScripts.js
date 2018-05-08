var login_url = "http://52.229.58.170:8000/hub/login"

function updateUrl() {
    var randomNumber = Math.floor(Math.random() * 100);
    element = document.getElementById("notebook1")
    username = "user" + randomNumber;
    password = "user" + randomNumber + "magickey"

    if (element != null) {
        setCredentials(username, password);
        element.setAttribute("url","http://52.229.58.170:8000/user/user" + randomNumber + "/notebooks/user" + randomNumber);
    }
    ret = $.ajax(login_url,
        {
            method: 'POST',
            data: { 'username': username, 'password': password },
            crossDomain: true,
        });
};

function goToJupyterHub(id) {
    element = document.getElementById(id);
    url = element.getAttribute("url");
    username = element.getAttribute("username");
    password = element.getAttribute("password");
    $.ajax(url,
        {
            method: 'GET',
            xhrFields: { withCredentials: true },
            crossDomain: true,
            success: function (data) {
                $(".result").html(data);
            }
        });
}

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