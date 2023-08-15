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
        fullname: $("#name").val(),
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

/*Read Method */
$(document).ready(function(){
  const databaseRef = firebase.database().ref("drivers/");

  databaseRef.on("value", function(snapshot) {
    const tableBody = $(".tableBody"); // Get the table body element

    // Clear existing table rows
    //tableBody.empty();

    snapshot.forEach(function(childSnapshot) {
      const driverData = childSnapshot.val();
      const row = $("<tr>");
      row.append($("<td>").text(driverData.fullname));
      row.append($("<td>").text(driverData.franchiseNumber));
      row.append($("<td>").text(driverData.motorType));
      row.append($("<td>").text(driverData.qrcode));

      const actionCell = $("<td>");
      actionCell.append($("<button>").text("Edit"));
      actionCell.append($("<button>").text("Delete"));

      row.append(actionCell);
      tableBody.append(row);
    });
  });
});
    


/*Update Method */
/*Delete Method */