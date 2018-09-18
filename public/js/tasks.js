$(document).ready(function() {
  var getUser = {
    id: sessionStorage.id,
  };

  $.post("/api/tasks", getUser, function(user) {

    var tasksInThisMonth = [];
    var currentMonth = moment().month();
    var currentYear = moment().year();
    console.log ("Current month is " + moment().format("MMMM"));
    var taskIndex = 0;

    for (var i = 0 ; i < user.Tasks.length; i++) {
      
      if (user.Tasks[i].Month == currentMonth  && user.Tasks[i].Year == currentYear) {
        tasksInThisMonth[taskIndex] = {
          taskIndex: taskIndex,
          taskTitle: user.Tasks[i].taskTitle,
          taskDescription: user.Tasks[i].taskDescription, 
          date: (new Date(user.Tasks[i].Year, user.Tasks[i].Month, user.Tasks[i].Day, user.Tasks[i].Hour, user.Tasks[i].Minute))   
        }
        taskIndex++;
      }
    }

    $(".fc-day-top").each(function(){
      var day = parseInt($(this).attr("data-date").slice(8,10));

      var month = parseInt($(this).attr("data-date").slice(5,7))-1;
      for (var i = 0; i < tasksInThisMonth.length; i++) {
        


        if (tasksInThisMonth[i].date.getDate() == day && tasksInThisMonth[i].date.getMonth() == month) {

          $(this).append(tasksInThisMonth[i].taskTitle);
        }
      }

    });

    $(".fc-today-button").on("click", function(){
      $.post("/api/tasks", getUser, function(user) {

        currentMonth = moment().month();
        currentYear = moment().year();
        tasksInThisMonth = [];

        var taskIndex = 0;
    
        for (var i = 0 ; i < user.Tasks.length; i++) {
          
          if (user.Tasks[i].Month == currentMonth  && user.Tasks[i].Year == currentYear) {
            tasksInThisMonth[taskIndex] = {
              taskIndex: taskIndex,
              taskTitle: user.Tasks[i].taskTitle,
              taskDescription: user.Tasks[i].taskDescription, 
              date: (new Date(user.Tasks[i].Year, user.Tasks[i].Month, user.Tasks[i].Day, user.Tasks[i].Hour, user.Tasks[i].Minute))   
            }
            taskIndex++;
          }
        }
    

        console.log("Current year is " + currentYear);
        console.log("Current month is " + currentMonth);
    
    
        $(".fc-day-top").each(function(){
          var day = parseInt($(this).attr("data-date").slice(8,10));
    
          var month = parseInt($(this).attr("data-date").slice(5,7))-1;
          for (var i = 0; i < tasksInThisMonth.length; i++) {
          
            if (tasksInThisMonth[i].date.getDate() == day && tasksInThisMonth[i].date.getMonth() == month) {
    
              $(this).append(tasksInThisMonth[i].taskTitle);
            }
          }
    
        });
    

      });
    });

    $(".fc-next-button").on("click", function(){
      $.post("/api/tasks", getUser, function(user) {
    
        tasksInThisMonth = [];

        if (currentMonth < 11) {
          currentMonth++;
       } else {
          currentMonth = 0;
          currentYear++;
       }

        var taskIndex = 0;
    
        for (var i = 0 ; i < user.Tasks.length; i++) {
          
          if (user.Tasks[i].Month == currentMonth  && user.Tasks[i].Year == currentYear) {
            tasksInThisMonth[taskIndex] = {
              taskIndex: taskIndex,
              taskTitle: user.Tasks[i].taskTitle,
              taskDescription: user.Tasks[i].taskDescription, 
              date: (new Date(user.Tasks[i].Year, user.Tasks[i].Month, user.Tasks[i].Day, user.Tasks[i].Hour, user.Tasks[i].Minute))   
            }
            taskIndex++;
          }
        }
    

        console.log("Current year is " + currentYear);
        console.log("Current month is " + currentMonth);
    
    
        $(".fc-day-top").each(function(){
          var day = parseInt($(this).attr("data-date").slice(8,10));
    
          var month = parseInt($(this).attr("data-date").slice(5,7))-1;
          for (var i = 0; i < tasksInThisMonth.length; i++) {
          
            if (tasksInThisMonth[i].date.getDate() == day && tasksInThisMonth[i].date.getMonth() == month) {
    
              $(this).append(tasksInThisMonth[i].taskTitle);
            }
          }
    
        });
    

      });
    });
    
    $(".fc-prev-button").on("click", function(){

      $.post("/api/tasks", getUser, function(user) {

         if (currentMonth > 0) {
          currentMonth--;
         } else {
          currentMonth = 11;
          currentYear--;
         }
        tasksInThisMonth = [];

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

        console.log("Current year is " + currentYear);
        console.log("Current month is " + currentMonth);
    
        $(".fc-day-top").each(function(){
          var day = parseInt($(this).attr("data-date").slice(8,10));
    
          var month = parseInt($(this).attr("data-date").slice(5,7))-1;
          for (var i = 0; i < tasksInThisMonth.length; i++) {
            

    
            if (tasksInThisMonth[i].date.getDate() == day && tasksInThisMonth[i].date.getMonth() == month) {
    
              $(this).append(tasksInThisMonth[i].taskTitle);
            }
          }
    
        });
    

      });
    });

  });
});

