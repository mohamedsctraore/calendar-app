$(document).ready(function() {
  var getUser = {
    id: sessionStorage.id,
  };
  //console.log("hello");
  $.post("/api/tasks", getUser, function(user) {
    //if "user" not empty redirect to /calendar, else display error
    console.log(user);
    //This is placeholder code that creates an array with all the tasks that fit a certain month, e.g. September
    //We can later loop through this array to put all the tasks for the current month
    //We can consider using momentjs to find the month
    var tasksInThisMonth = [];
    var currentMonth = moment().month();
    console.log ("Current month is " + moment().format("MMMM"));

    for (var i = 0 ; i < user.Tasks.length; i++) {
      if (user.Tasks[i].Month == currentMonth) {
        tasksInThisMonth.push(new Date(user.Tasks[i].Year, user.Tasks[i].Month, user.Tasks[i].Hour, user.Tasks[i].Minute));
      }
    }

    //This is how you can then loop through the tasksInThisMonth array to gather specific pieces of data from it afterwards
    console.log(tasksInThisMonth);
    for (var i = 0; i < tasksInThisMonth.length; i++) {
    //use tasksInThisMonth[i].getMonth() if you want to get the month as a number
      console.log("We have a task that is in " + moment(tasksInThisMonth[i]).format("MMMM"));      
    }
    //window.location.href = "/calendar";
  });
});
