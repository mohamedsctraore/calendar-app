$(document).ready(function() {
  var getUser = {
    id: sessionStorage.id,
  };

  $.post("/api/tasks", getUser, function(user) {

    var tasksInThisMonth = [];
    var currentMonth = moment().month();
    var currentYear = moment().year();
    //console.log ("Current month is " + moment().format("MMMM"));
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
    

        //console.log("Current year is " + currentYear);
        //console.log("Current month is " + currentMonth);
    
    
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
    

        //console.log("Current year is " + currentYear);
        //console.log("Current month is " + currentMonth);
    
    
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
      var eventsArr = [];
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
        
        $(".fc-day-top").each(function(){
          var day = parseInt($(this).attr("data-date").slice(8,10));
    
          var month = parseInt($(this).attr("data-date").slice(5,7))-1;
          for (var i = 0; i < tasksInThisMonth.length; i++) {
            
            if (tasksInThisMonth[i].date.getDate() == day && tasksInThisMonth[i].date.getMonth() == month) {
              //console.log(tasksInThisMonth[i]);
              //$(this).append(tasksInThisMonth[i].taskTitle);
              eventsArr.push({
                title: tasksInThisMonth[i].taskTitle,
                start: tasksInThisMonth[i].date.getYear()+'-'+ tasksInThisMonth[i].date.getMonth()+'-'+tasksInThisMonth[i].date.getDate(),
                end: tasksInThisMonth[i].date.getYear()+'-'+ tasksInThisMonth[i].date.getMonth()+'-'+tasksInThisMonth[i].date.getDate()
              });
            }
          }
        });

      });
      console.log(eventsArr);
      addToCalendar(eventsArr);
    });
  });
  function addToCalendar(eventsArr){
    $('#calendar').fullCalendar({
      dayClick: function(date, jsEvent, view) {
    
        alert('Clicked on: ' + date.format());
    
        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
    
        alert('Current view: ' + view.name);
        //console.log(date);
    
      },
      events: eventsArr
    });
  }
  
/*
  $('#calendar').fullCalendar({
    events: [
      {
        title: 'Event Title1',
        start: '2018-10-01',
        end: '2018-10-01'
      },
      {
        title: 'Event Title2',
        start: '2018-09-17',
        end: '2018-09-17'
      }
    ]
  });*/
 /* var inTitle = $("#title");
  var inDate = $("#date");
  var inDesc = $("#desc");
  var inTime = $("#time");
  $("#taskForm").on("submit", function(){
    event.preventDefault();
    var inTitle = $("#title");
    
  })*/
});

