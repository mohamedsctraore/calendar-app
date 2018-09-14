$(document).ready(function() {
    var getUser = {
        id: sessionStorage.id,
    };
    //console.log("hello");
    $.post("/api/tasks", getUser, function(user) {
        //if "user" not empty redirect to /calendar, else display error
        console.log(user);
        //window.location.href = "/calendar";
    });
});
