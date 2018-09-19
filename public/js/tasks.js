$(document).ready(function() {
  var getUser = {
    id: sessionStorage.id,
  };
  $.post("/api/tasks", getUser, function(user) {
    var eventsArr = [];
    console.log(user);
    var tasksInThisMonth = [];
    var currentMonth = moment().month();
    var currentYear = moment().year();
    //console.log ("Current month is " + moment().format("MMMM"));
    var taskIndex = 0;

    for(var i = 0 ; i < user.Tasks.length; i++){
      eventsArr.push({
        title: user.Tasks[i].taskTitle,
        start: moment(user.Tasks[i].Year +'-'+ user.Tasks[i].Month+'-'+user.Tasks[i].Day,"YYYY-MM-DD"),
        end: moment(user.Tasks[i].Year +'-'+ user.Tasks[i].Month+'-'+user.Tasks[i].Day,"YYYY-MM-DD")
      });
    }
/*
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

    //console.log(tasksInThisMonth);

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
              // eventsArr.push({
              //   title: tasksInThisMonth[i].taskTitle,
              //   start: tasksInThisMonth[i].date.getYear()+'-'+ tasksInThisMonth[i].date.getMonth()+'-'+tasksInThisMonth[i].date.getDate(),
              //   end: tasksInThisMonth[i].date.getYear()+'-'+ tasksInThisMonth[i].date.getMonth()+'-'+tasksInThisMonth[i].date.getDate()
              // });
              //console.log(eventsArr);
            }
          }
        });

      });
      //console.log(eventsArr);
      //addToCalendar(eventsArr);
    });*/
    console.log(eventsArr);
    
    $('#calendar').fullCalendar('destroy');

    $('#calendar').fullCalendar({
      dayClick: function(date, jsEvent, view) {
    
        alert('Clicked on: ' + date.format());
    
        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
    
        alert('Current view: ' + view.name);
        //console.log(date);
    
      },
      eventClick: function(calEvent, jsEvent, view) {

        alert('Event: ' + calEvent.title);
        alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        alert('View: ' + view.name);
    
        // change the border color just for fun
        $(this).css('border-color', 'red');
    
      },
      events: eventsArr,
      displayEventTime : false
      
    });

    $('#calendar').fullCalendar('render');
  
    
    
    
  
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

    console.log("");

    // $("#title").val("sup");
      $("#taskForm").on("submit", function() {
        event.preventDefault();
        // console.log($("#time").val());
        var timeVal = $("#time").val();
        
        var titleVal = $("#title").val();
        var hourVal = parseInt(timeVal.slice(0,2));
        var minuteVal = parseInt(timeVal.slice(3,6));
        var descriptionVal = $("#textarea1").val();
        
        console.log("user is " + user.username);
        console.log("user ID is " + user.id);
        console.log("task title is " + titleVal);
        console.log("task description " + descriptionVal);
        console.log("Current year is " + currentYear);
        console.log("Current month is " + currentMonth);
        console.log ("hour is " + hourVal);
        console.log ("minute is " + minuteVal);

        var newTask = {

          taskTitle: titleVal,
          taskDescription: descriptionVal,
          UserId: user.id,
          Year: currentYear,
          Month: currentMonth,
          Day: "12",
          Hour: hourVal,
          Minute: minuteVal 
        }

        $.post("/api/Task", newTask, function(user) {
        
          alert("Task added!");
          // window.location.href = "/calendar";
          location.reload();
        });
      });
    $('.modal').modal();
  });
});

