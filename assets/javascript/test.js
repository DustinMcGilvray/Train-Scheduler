//Initializing Firebase
var config = {
    apiKey: "AIzaSyBO8FwJP8NP0pzUh8G221QUHsSa96EyGZw",
    authDomain: "train-scheduler-smu.firebaseapp.com",
    databaseURL: "https://train-scheduler-smu.firebaseio.com",
    projectId: "train-scheduler-smu",
    storageBucket: "",
    messagingSenderId: "238135618143"
  };

  firebase.initializeApp(config);

  var database=firebase.database();

  //Button for adding trains
  $("#submit").on("click", function(event) {
      event.preventDefault();

  //Gets user input
  var name=$("#trainName").val().trim();  
  var dest=$("#destination").val().trim();
  var time=$("#firstTrain").val().trim();
  var freq=$("#frequency").val().trim();

  //Holds train data
  var newTrain= {
      name:name,
      destination:dest,
      time:time,
      frequency:freq
  };

  //pushes train data to database
  database.ref().push(newTrain);

  //Logs to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  //Clear out input fields
  $("#trainName").val("");  
  $("#destination").val("");
  $("#firstTrain").val("");
  $("#frequency").val("");
  });

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var name=childSnapshot.val().name;
    var dest=childSnapshot.val().destination;
    var time=childSnapshot.val().time;
    var freq=childSnapshot.val().frequency;

    console.log(name);
    console.log(dest);
    console.log(time);
    console.log(freq);

    var trainFreq=freq;
    var firstTrainTime=$("#firstTrain").val().trim();
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTrainTimeConverted);

    //getting currentTime
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var timesDifference = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timesDifference);

    var timesModulus = timesDifference % trainFreq;
    
    var trainArrival = trainFreq - timesModulus;
    console.log("MINUTES TILL TRAIN: " + trainArrival);

    var nextArrival = moment().add(trainArrival, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    var convertedNextArrival = moment(nextArrival).format("hh:mm");

    var newItem=$("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(dest),
        $("<td>").text(freq),
        $("<td>").text(trainArrival),
        $("<td>").text(convertedNextArrival)
    );
    $("#trains > tbody").append(newItem);

});