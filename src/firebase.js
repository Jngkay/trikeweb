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
    //e.preventDefault();

    const fullname = $("#fullname").val();
    const email = $("#email").val();
    const pword = $("#pword").val();
    const fn = $("#fn").val();
    const mt = $("#mt").val();
    const qrc = $("#qrc").val();

    if (fullname === '' || email === '' || pword === '' || fn === '' || mt === '' || qrc === '') {
      alert("Please fill in all fields before submitting.");
      return;
    }

    firebase
      .database()
      .ref("drivers/" + $("#qrc").val())
      .set({
        fullname: fullname,
        email: email,
        pword: pword,
        fn: fn,
        mt: mt,
        qrc: qrc
      });

    alert("Data Inserted");
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("pword").value = "";
    document.getElementById("fn").value = "";
    document.getElementById("mt").value = "";
    document.getElementById("qrc").value = "";
    
});

/*Drivers Read Method*/
$(document).ready(function(){
  const databaseRef = firebase.database().ref("drivers/");
  const tableBody = $(".tableBody"); // Get the table body element

  // This function will clear the existing data rows from the table
  function clearDataRows() {
    tableBody.find("tr:gt(0)").remove();
  }

  // Attach the "value" event listener
  databaseRef.on("value", function(snapshot) {
    clearDataRows(); // Clear the existing data rows

    snapshot.forEach(function(childSnapshot) {
      const driverData = childSnapshot.val();
      const row = $("<tr>");
      row.append($("<td>").text(driverData.fullname));
      row.append($("<td>").text(driverData.email));
      row.append($("<td>").text(driverData.pword));
      row.append($("<td>").text(driverData.fn));
      row.append($("<td>").text(driverData.mt));
      row.append($("<td>").text(driverData.qrc));

      const actionCell = $("<td>");
      actionCell.append($("<button>").text("Edit"));
      actionCell.append($("<button>").text("Delete"));

      row.append(actionCell);
      tableBody.append(row);
    });
  });
});

/*Users Read Method */
$(document).ready(function() {
  var userTable = $(".userTable");
  // Reference to your users data in the database
  var usersRef = firebase.database().ref("users/");

  function clearUserData() {
    userTable.find("tr:gt(0)").remove();
  }

  // Retrieve user data and populate the table
  usersRef.on("value", function(snapshot) {
    //console.log(snapshot.val());
    clearUserData(); // Clear existing rows

    snapshot.forEach(function(childSnapshot) {
      var userData = childSnapshot.val();
      //console.log(userData);

      var firstname = userData.firstname;
      var lastname = userData.lastname;
      var email = userData.email;
      var phone = userData.phone;

      var newRow = $("<tr>");
      newRow.append($("<td>").text(firstname));
      newRow.append($("<td>").text(lastname));
      newRow.append($("<td>").text(email));
      newRow.append($("<td>").text(phone));

      userTable.append(newRow);
    });
  });
});

    


/*Update Method */
/*Delete Method */