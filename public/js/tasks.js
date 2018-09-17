function calendarRefresh(currentMonth, currentYear){
  var getUser = {
    id: sessionStorage.id,
  };

  console.log(currentMonth);
  console.log(currentYear);

  $.post("/api/tasks", getUser, function(user) {
    //if "user" not empty redirect to /calendar, else display e rror
    
    //console.log(user);

    var tasksInThisMonth = [];
    // var currentMonth = moment().month();
    // console.log ("Current month is " + moment().format("MMMM"));
    var taskIndex = 0;

    for (var i = 0 ; i < user.Tasks.length; i++) {
      
      if (user.Tasks[i].Month == currentMonth && user.Tasks[i].Year == currentYear) {
        tasksInThisMonth[taskIndex] = {
          taskIndex: taskIndex,
          taskTitle: user.Tasks[i].taskTitle,
          taskDescription: user.Tasks[i].taskDescription, 
          date: (new Date(user.Tasks[i].Year, user.Tasks[i].Month, user.Tasks[i].Day, user.Tasks[i].Hour, user.Tasks[i].Minute))   
        }
        taskIndex++;
      }
    }

    //  console.log("Tasks in this month are: ");
    //  console.log(tasksInThisMonth);
    
    // for (var i = 0; i < tasksInThisMonth.length; i++) {
    //    console.log("We have " + tasksInThisMonth.length + " task(s) that is in " + moment(tasksInThisMonth[i].date).format("MMMM"));      
    // }


    $(".fc-day-top").each(function(){
      var day = parseInt($(this).attr("data-date").slice(8,10));

      var month = parseInt($(this).attr("data-date").slice(5,7))-1;
      for (var i = 0; i < tasksInThisMonth.length; i++) {
        
      // console.log("task day is " + tasksInThisMonth[i].date.getDate());

        if (tasksInThisMonth[i].date.getDate() == day && tasksInThisMonth[i].date.getMonth() == month) {

          $(this).html("<div style='background-color:lightblue'>" + tasksInThisMonth[i].taskTitle + "</div>");
        }
      }

    });

    $(".fc-next-button").on("click", function(){
         if (currentMonth < 11) {
            currentMonth++;
         } else {
            currentMonth = 0;
            currentYear++;
         }
         calendarRefresh(currentMonth, currentYear);
    });
      
    $(".fc-prev-button").on("click", function(){
         if (currentMonth > 0) {
          currentMonth--;
         } else {
          currentMonth = 11;
          currentYear--;
         }
         calendarRefresh(currentMonth, currentYear);
    });

    $(".fc-today-button").on("click", function(){
      currentMonth = moment().month();
      currentYear = moment().year();
      calendarRefresh(currentMonth, currentYear);
    });


  });
};

$(document).ready(function() {
  var getUser = {
    id: sessionStorage.id,
  };

  var currentMonth = moment().month();
  var currentYear = moment().year();
  calendarRefresh(currentMonth, currentYear);
  
  //window.location.href = "/calendar";
  
});
