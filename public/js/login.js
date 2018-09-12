$(document).ready(function() {
    var usernameInput = $("#username");
    var passwordInput = $("#password");
    
    $("loginForm").on("submit", function(){
        event.preventDefault();

        var findUser = {
            username: usernameInput
              .val()
              .trim(),
            password: passwordInput
              .val()
              .trim()
        };

        $.post("/api/login", findUser, function(user) {
            //if "user" not empty redirect to /calendar, else display error
            if(user !== ""){
                redirectPost("/calendar", user);
            }
            else{
                alert("Incorrect login credentials");
            }
            //window.location.href = "/calendar";
        });
    });

    function redirectPost(url, data) {
        var form = document.createElement('form');
        document.body.appendChild(form);
        form.method = 'post';
        form.action = url;
        for (var name in data) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = data[name];
            form.appendChild(input);
        }
        form.submit();
    }
});