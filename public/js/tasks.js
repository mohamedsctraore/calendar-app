$(document).ready(function() {
  var getUser = {
    id: sessionStorage.id,
  };
  //console.log("hello");
  $.post("/api/tasks", getUser, function(user) {
    //if "user" not empty redirect to /calendar, else display error
    console.log(user);

    var tasksInThisMonth = [];
    var currentMonth = moment().month();
    console.log ("Current month is " + moment().format("MMMM"));
    var taskIndex = 0;

    for (var i = 0 ; i < user.Tasks.length; i++) {
      
      if (user.Tasks[i].Month == currentMonth) {
        tasksInThisMonth[taskIndex] = {
          taskIndex: taskIndex,
          taskTitle: user.Tasks[i].taskTitle,
          taskDescription: user.Tasks[i].taskDescription, 
          date: (new Date(user.Tasks[i].Year, user.Tasks[i].Month, user.Tasks[i].Day, user.Tasks[i].Hour, user.Tasks[i].Minute))   
        }
        taskIndex++;
      }
    }

    console.log(tasksInThisMonth);
    for (var i = 0; i < tasksInThisMonth.length; i++) {
       console.log("We have " + tasksInThisMonth.length + " task(s) that is in " + moment(tasksInThisMonth[i].date).format("MMMM"));      
    }


    $(".fc-day-top").each(function(){
      var day = parseInt($(this).attr("data-date").slice(8,10));

      var month = parseInt($(this).attr("data-date").slice(5,7))-1;
      for (var i = 0; i < tasksInThisMonth.length; i++) {
        
      console.log("task day is " + tasksInThisMonth[i].date.getDate());

        if (tasksInThisMonth[i].date.getDate() == day && tasksInThisMonth[i].date.getMonth() == month) {

          $(this).append(tasksInThisMonth[i].taskTitle);
        }
      }

    });

    $('.fc-day-top').click(function() {

    });
    //window.location.href = "/calendar";
  });
});
