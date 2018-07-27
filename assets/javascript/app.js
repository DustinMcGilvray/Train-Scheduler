$(document).ready(function (){

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAK8DT5PJHfnw4_oaniSQx0DjdodBZv9Ns",
    authDomain: "train-scheduler-project-8916c.firebaseapp.com",
    databaseURL: "https://train-scheduler-project-8916c.firebaseio.com",
    projectId: "train-scheduler-project-8916c",
    storageBucket: "train-scheduler-project-8916c.appspot.com",
    messagingSenderId: "790464243378"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //BUTTON FOR ADDING TRAIN 
$("#addTrainButton").on("click", function(event) {
    event.preventDefault();
  
    // USER INPUT IS GRABED HERE
    var trainName = $("#nameInput").val().trim();
    var destination = $("#destInput").val().trim();
    var trainTime = $("#trainTimeInput").val().trim();
    var frequency = $("#freqInput").val().trim();
  
    //TEMPORARY OBJECT FOR HOLDING TRAIN DATA LOCALLY
    var newTrain = {
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency
    };
  
    //SENDS (UPLOADS) TRAIN INFORMATION TO DATABASE
    database.ref().push(newTrain);
  
    //LOGGING TO CONSOLE
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency);
    
    //INPUT BOXES CLEARED
    $("#nameInput").val("");
    $("#destInput").val("");
    $("#trainTimeInput").val("");
    $("#freqInput").val("");
  });


  //EVENT IN FIREBASE IS CREATED TO ADD NEW TRAIN AND CREATES ROW IN HTML WHEN USER ADDS AND SUBMITS
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    //VARIABLE FOR STORAGE(BUCKET)
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;
  
    //CONSOLE LOG TRAIN INFO
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);


//MOMENT.JS TIME TRACKER
    var trainFreq = frequency;
    var trainTime = $("#trainTimeInput").val().trim();

    //PUSH BACK FIRST TIME BY 1 YEAR TO ASSURE IT COMES BEFORE CURRENT TIME
    var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(trainTimeConverted);
    //Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    //TIME DIFFERENCE 
    var timeDiff = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDiff);
    //TRAIN TIME APART
    var timeApart = timeDiff % timeFreq;
    console.log(timeApart);
    //MINUTES UNTIL NEXT TRAIN
    var arrivalTrain = trainFreq - timeApart;
    console.log("MINUTES TILL TRAIN: " + arrivalTrain);
    //NEXT TRAIN ARRIVAL
    var nextTrain = moment().add(arrivalTrain, "minutes");
    var nextTrainTimeConverted = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    //ADD NEW TRAIN TO SCHEDULE IN HTML
    var addNewTrain = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(nextTrainTimeConverted)
    );
    $("#train_table > tbody").append(addNewTrain);
});

//END BRACKET FOR DOCUMENT.READY FUNCTION
});