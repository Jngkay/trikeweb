const firebaseConfig = {
  apiKey: "AIzaSyC-JvB2RXrsup4P9oH8IgCwUm1W5Ce08dQ",
  authDomain: "tricyclebooking-ebe95.firebaseapp.com",
  databaseURL: "https://tricyclebooking-ebe95-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tricyclebooking-ebe95",
  storageBucket: "tricyclebooking-ebe95.appspot.com",
  messagingSenderId: "211757260511",
  appId: "1:211757260511:web:08ab4ab453e1eb6c81d36a"
};  

  firebase.initializeApp(firebaseConfig);
  

  /*Create Method */
  $("#submit-btn").click(function(e){
    e.preventDefault();
    firebase
      .database()
      .ref("drivers/" + $("#qrc").val())
      .set({
        fullname: $("#qrc").val(),
        franchiseNumber: $("#fn").val(),
        driverRate: $("#dr").val(),
        motorType: $("#mt").val(),
        qrcode: $("#qrc").val()
      });

    alert("Data Inserted");
    document.getElementById("name").value = "";
    document.getElementById("fn").value = "";
    document.getElementById("dr").value = "";
    document.getElementById("mt").value = "";
    document.getElementById("qrc").value = "";
    
});

