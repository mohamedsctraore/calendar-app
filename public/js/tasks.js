$(document).ready(function() {
  var getUser = {
    id: sessionStorage.id,
  };

  var currentMonth = moment().month();
  var currentYear = moment().year();

  


  $.post("/api/tasks", getUser, function(user) {
    var eventsArr = [];
    console.log(user);
    var dayAgendaDate = moment();
    var tasksInThisMonth = [];
    //console.log ("Current month is " + moment().format("MMMM"));
    var taskIndex = 0;

    for(var i = 0 ; i < user.Tasks.length; i++){
      eventsArr.push({
        title: user.Tasks[i].taskTitle,
        start: moment(user.Tasks[i].Year +'-'+ user.Tasks[i].Month+'-'+user.Tasks[i].Day+' '+user.Tasks[i].Hour+':'+user.Tasks[i].Minute,"YYYY-MM-DD hh:mm"),
        end: moment(user.Tasks[i].Year +'-'+ user.Tasks[i].Month+'-'+user.Tasks[i].Day+' '+user.Tasks[i].Hour+':'+user.Tasks[i].Minute,"YYYY-MM-DD hh:mm")
      });
    }
    renderDayAgenda(dayAgendaDate);
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
        renderDayAgenda(moment(date));
        dayAgendaDate = moment(date);
        //console.log(dayAgendaDate.date());
        //alert('Clicked on: ' + date.format());
    
        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
    
        //alert('Current view: ' + view.name);
        //console.log(date);
        //alert('Resource: ' + resourceObj);

    
      },
      eventClick: function(calEvent, jsEvent, view) {
        renderDayAgenda(moment(calEvent.start));
        dayAgendaDate = moment(calEvent.start);
        //console.log(dayAgendaDate.date());
        //alert('Event: ' + calEvent.title);
        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        //alert('View: ' + view.name);
    
        // change the border color just for fun
        //$(this).css('border-color', 'red');
    
      },
      events: eventsArr,
      displayEventTime : false
      
    });

    $('#calendar').fullCalendar('render');

    // $("#title").val("sup");
    $("#taskForm").on("submit", function() {
      event.preventDefault();
      // console.log($("#time").val());
      var timeVal = $("#time").val();
      
      var titleVal = $("#title").val();
      var hourVal = parseInt(timeVal.slice(0,2));
      var minuteVal = parseInt(timeVal.slice(3,6));
      var descriptionVal = $("#textarea1").val();
      /*
      console.log("user is " + user.username);
      console.log("user ID is " + user.id);
      console.log("task title is " + titleVal);
      console.log("task description " + descriptionVal);
      console.log("Current year is " + currentYear);
      console.log("Current month is " + currentMonth);
      console.log ("hour is " + hourVal);
      console.log ("minute is " + minuteVal);*/
      console.log(dayAgendaDate.date());
      var newTask = {

        taskTitle: titleVal,
        taskDescription: descriptionVal,
        UserId: user.id,
        Year: dayAgendaDate.year(),
        Month: dayAgendaDate.month()+1,
        Day: dayAgendaDate.date(),
        Hour: hourVal,
        Minute: minuteVal 
      }
      console.log(newTask);
      $.post("/api/Task", newTask, function(user) {
      
        alert("Task added!");
        // window.location.href = "/calendar";
        location.reload();
      });
    });

    function renderDayAgenda(day){
      
      $('#dayAgenda').fullCalendar('destroy');
      $('#dayAgenda').fullCalendar({
        events: eventsArr,
        defaultView : "agendaDay",
        defaultDate : day,
        aspectRatio : 0.65
      });

      $('#dayAgenda').fullCalendar('render');
      
    }
    $('.modal').modal();
   
  });
});

