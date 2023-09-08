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

    const fullname = $("#fullname").val();
    const email = $("#email").val();
    const conNum = $("#conNum").val();
    const address = $("#address").val();
    const pword = $("#pword").val();
    const fn = $("#fn").val();
    const plateNo = $("#plateNo").val();
    const mt = $("#mt").val();
    const qrc = $("#qrc").val();
    const available = document.getElementById('available').checked;
    const profilePictureInput = document.getElementById("profilePicture");
    const profilePictureFile = profilePictureInput.files[0];

    if (!profilePictureFile) {
      alert("Please select a profile picture.");
      return;
    }

    if (fullname === '' || email === '' || conNum === '' || address === '' || pword === '' || fn === '' || plateNo === '' || mt === '' || qrc === '') {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const storage = firebase.storage();
    const storageRef = storage.ref();
    const profilePictureRef = storageRef.child("profilePictures/" + qrc);

    profilePictureRef.put(profilePictureFile).then(snapshot =>{
      snapshot.ref.getDownloadURL().then(downloadURL =>{

      firebase
        .database()
        .ref("drivers/" + $("#qrc").val())
        .set({
          fullname: fullname,
          email: email,
          conNum: conNum,
          address: address,
          pword: pword,
          fn: fn,
          plateNo: plateNo,
          mt: mt,
          qrc: qrc,
          available: available,
          profilePictureURL: downloadURL
        });

        alert("Data Inserted");
        document.getElementById("profilePicture").value = "";
        document.getElementById("fullname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("conNum").value = "";
        document.getElementById("address").value = "";
        document.getElementById("pword").value = "";
        document.getElementById("fn").value = "";
        document.getElementById("plateNo").value = "";
        document.getElementById("mt").value = "";
        document.getElementById("qrc").value = "";
        document.getElementById("available").value = "";

      });
    })
    
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
  databaseRef.orderByChild("fullname").on("value", function(snapshot) {
    clearDataRows(); // Clear the existing data rows

    snapshot.forEach(function(childSnapshot) {
      const driverData = childSnapshot.val();
      const row = $("<tr>");
      row.append($("<td>").html(`<img src="${driverData.profilePictureURL}" class="profile-picture" alt="Profile Picture">`));
      row.append($("<td>").text(driverData.fullname));
      row.append($("<td>").text(driverData.email));
      row.append($("<td>").text(driverData.conNum));
      row.append($("<td>").text(driverData.address));
      row.append($("<td>").text(driverData.pword));
      row.append($("<td>").text(driverData.fn));
      row.append($("<td>").text(driverData.plateNo));
      row.append($("<td>").text(driverData.mt));
      row.append($("<td>").text(driverData.qrc));
      row.append($("<td>").text(driverData.available));

      const actionCell = $("<td>");
      actionCell.append($("<button>").text("Edit"));
      actionCell.append($("<button>").text("Delete").click(function() {
        deleteDriver(driverData.qrc);
      }));

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
function deleteDriver(driverId) {
  const databaseRef = firebase.database().ref("drivers/");
  const driverRef = databaseRef.child(driverId);

  driverRef.remove()
    .then(function() {
      alert("Driver deleted successfully.");
    })
    .catch(function(error) {
      console.error("Error deleting driver: ", error);
      alert("An error occurred while deleting the driver.");
    });
}