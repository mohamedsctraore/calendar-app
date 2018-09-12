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
                window.location.href = "/calendar";
            }
            else{
                alert("Incorrect login credentials");
            }
            //window.location.href = "/calendar";
        });
    });
});