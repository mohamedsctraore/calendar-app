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

    //This is how you can then loop through the tasksInThisMonth array to gather specific pieces of data from it afterwards
    console.log(tasksInThisMonth);
    for (var i = 0; i < tasksInThisMonth.length; i++) {
       console.log("We have " + tasksInThisMonth.length + " task(s) that is in " + moment(tasksInThisMonth[i].date).format("MMMM"));      
    }


    $(".fc-day-top").each(function(){
      var day = parseInt($(this).attr("data-date").slice(8,10));
      // console.log("day is " + day);
      var month = parseInt($(this).attr("data-date").slice(5,7))-1;
      for (var i = 0; i < tasksInThisMonth.length; i++) {
        
      console.log("task day is " + tasksInThisMonth[i].date.getDate());
        // console.log ("wait: "+ tasksInThisMonth[i].date.getMonth());
        if (tasksInThisMonth[i].date.getDate() == day && tasksInThisMonth[i].date.getMonth() == month) {
          // console.log ("We found it! " + tasksInThisMonth[i].date.getDay());
          $(this).append(tasksInThisMonth[i].taskTitle);
        }
      }
      // console.log(month);
      // console.log(typeof day);
      // console.log(day.getMonth());
      //  console.log(moment(day).format("MMMM"));
    });

    $('.fc-day-top').click(function() {
      // var date = this;
      // $('#calendar').fullCalendar("gotoDate", "15" );
      // var moment = $('#calendar').fullcalendar('getDate');
      // alert("The current date of the calendar is " + moment.format());
    });
    //window.location.href = "/calendar";
  });
});
