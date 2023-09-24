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
    
    document.getElementById("lightBox-loader").style.display = "block";
    const fullname = $("#fullname").val();
    const email = $("#email").val();
    const conNum = $("#conNum").val();
    const address = $("#address").val();
    const pword = $("#pword").val();
    const fn = $("#fn").val();
    const plateNo = $("#plateNo").val();
    const mt = $("#mt").val();
    const available = document.getElementById('available').checked;
    const profilePictureInput = document.getElementById("profilePicture");
    const profilePictureFile = profilePictureInput.files[0];

    if (!profilePictureFile) {
      alert("Please select a profile picture.");
      return;
    }

    if (fullname === '' || email === '' || conNum === '' || address === '' || pword === '' || fn === '' || plateNo === '' || mt === '') {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const storage = firebase.storage();
    const storageRef = storage.ref();
    const profilePictureRef = storageRef.child("profilePictures/" + plateNo);

    profilePictureRef.put(profilePictureFile).then(snapshot =>{
      snapshot.ref.getDownloadURL().then(downloadURL =>{

      firebase
        .database()
        .ref("drivers/" + $("#plateNo").val())
        .set({
          fullname: fullname,
          email: email,
          conNum: conNum,
          address: address,
          pword: pword,
          fn: fn,
          plateNo: plateNo,
          mt: mt,
          available: available,
          profilePictureURL: downloadURL
        });

        alert("Data Inserted");
        document.getElementById("lightBox-loader").style.display = "none";

        document.getElementById("profilePicture").value = "";
        document.getElementById("fullname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("conNum").value = "";
        document.getElementById("address").value = "";
        document.getElementById("pword").value = "";
        document.getElementById("fn").value = "";
        document.getElementById("plateNo").value = "";
        document.getElementById("mt").value = "";
        document.getElementById("available").value = "";

        document.getElementById("cancel-btn").click();
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
      console.log("Data");
      console.log(driverData.fullname);
      const row = $("<tr>");
      row.append($("<td>").html(`<img src="${driverData.profilePictureURL}" class="profile-picture" alt="Profile Picture">`));
      row.append($("<td>").text(driverData.fullname));
      row.append($("<td>").text(driverData.email));
      row.append($("<td>").text(driverData.conNum));
      row.append($("<td>").text(driverData.address));
      row.append($("<td>").text(driverData.fn));
      row.append($("<td>").text(driverData.plateNo));
      row.append($("<td>").text(driverData.mt));

      const qrCell = $("<td>");
      qrCell.append($("<button class='viewQR'>").text("View QR Code").click(function(){
        $("#qrModalView").show();
        $('#qrcode').qrcode({text: "http://dhrrp2trikeapp.com/profile/profile.html?plateno=" + driverData.plateNo});	
      }));
      row.append(qrCell);

      row.append($("<td>").text(driverData.available));

      const actionCell = $("<td>");
      actionCell.append($("<button>").text("Edit").addClass("edit-btn"));
      actionCell.append($("<button>").text("Delete").click(function() {
        deleteDriver(driverData.plateNo);
      }));

      row.append(actionCell);
      tableBody.append(row);
    });
  });
});

/*Users Read Method */
$(document).ready(function(){
  const databaseRef = firebase.database().ref("users/");
  const userTableBody = $(".userTableBody"); 

  function userclearDataRows() {
    userTableBody.find("tr:gt(0)").remove();
  }

  databaseRef.orderByChild("firstname").on("value", function(snapshot) {
    userclearDataRows(); 

    snapshot.forEach(function(childSnapshot) {
      const userData = childSnapshot.val();
      const newrow = $("<tr>");
      newrow.append($("<td>").text(userData.firstname));
      newrow.append($("<td>").text(userData.lastname));
      newrow.append($("<td>").text(userData.email));
      newrow.append($("<td>").text(userData.phone));

      userTableBody.append(newrow);
    });
  });
});


/*Search Users in database */




/*Update Method */
$(".tableBody").on("click", ".edit-btn", function() {
  const selectedRow = $(this).closest("tr");
  const driverId = selectedRow.find("td:eq(6)").text();
  
  // Fetch data for the selected driver from Firebase
  const databaseRef = firebase.database().ref("drivers/" + driverId);
  databaseRef.once('value', (snapshot) => {
    const driverData = snapshot.val();
    
    $("#fullname").val(driverData.fullname);
    $("#email").val(driverData.email);
    $("#conNum").val(driverData.conNum);
    $("#address").val(driverData.address);
    $("#pword").val(driverData.pword);
    $("#fn").val(driverData.fn);
    $("#plateNo").val(driverData.plateNo);
    $("#mt").val(driverData.mt);
    $("#available").prop("checked", driverData.available); 

    // Show the existing profile picture
    const profilePictureUrl = driverData.profilePictureURL;
    $(".current-profile-picture").attr("src", profilePictureUrl);

    // Show the modal in "Edit" mode
    $("#submit-btn").text("Update"); // Change button text to "Update"
    // Enable the profile picture input for updates
    $("#profilePicture").prop("disabled", false);
    
    $("#AddDriverModal").show();
  });
});

// Update data in Firebase when the modal is submitted in "Edit" mode
$("#submit-btn").click(function(e) {
  e.preventDefault();
  
  const driverId = $("#plateNo").val(); 
  
  // Fetch the current data for the driver from Firebase
  const databaseRef = firebase.database().ref("drivers/" + driverId);
  databaseRef.once('value', (snapshot) => {
    const currentDriverData = snapshot.val();
    
    currentDriverData.fullname = $("#fullname").val();
    currentDriverData.email = $("#email").val();
    currentDriverData.conNum = $("#conNum").val();
    currentDriverData.address = $("#address").val();
    currentDriverData.pword = $("#pword").val();
    currentDriverData.fn = $("#fn").val();
    currentDriverData.mt = $("#mt").val();
    currentDriverData.available = $("#available").prop("checked"); 

    // Check if a new profile picture was selected
    const profilePictureInput = document.getElementById("profilePicture");
    const newProfilePictureFile = profilePictureInput.files[0];

    if (newProfilePictureFile) {
      // Upload the new profile picture to Firebase Storage
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const profilePictureRef = storageRef.child("profilePictures/" + driverId);

      profilePictureRef.put(newProfilePictureFile).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURL) => {
          currentDriverData.profilePictureURL = downloadURL;

          // Update the data in Firebase
          databaseRef.set(currentDriverData)
            .then(function() {
              alert("Driver Data and Profile Picture updated successfully.");
              
              $("#cancel-btn").click();
            })
            .catch(function(error) {
              console.error("Error: ", error);
              alert("An error occurred while updating the driver data.");
            });
        });
      });
    } else {
      // If no new profile picture was selected, update the data without uploading a new picture
      databaseRef.set(currentDriverData)
        .then(function() {
          alert("Driver Data updated successfully.");
         
          $("#cancel-btn").click();
        })
        .catch(function(error) {
          console.error("Error: ", error);
          alert("An error occurred while updating the driver data.");
        });
    }
  });
});



/*Delete Method */
function deleteDriver(driverId) {
  if (confirm("Are you sure you want to delete this driver?")) {
    const databaseRef = firebase.database().ref("drivers/");
    const driverRef = databaseRef.child(driverId);

    driverRef.remove()
      .then(function() {
        alert("Driver Data deleted successfully.");
      })
      .catch(function(error) {
        console.error("Error: ", error);
        alert("An error occurred while deleting the driver.");
      });
  }
}




// Fetch the count of users
$(document).ready(function(){
  const databaseRef = firebase.database().ref("users/");

  databaseRef.once('value', (snapshot) => {
    const usersCount = snapshot.numChildren();
    $(".usersCount").html(usersCount);
    console.log("Users Count: " + usersCount);
  });
})


// Fetch the count of drivers

$(document).ready(function(){
  const databaseRef = firebase.database().ref("drivers/");
 
  databaseRef.orderByChild("available").equalTo(true).on("value", function(snapshot) {
    const availableDrivers = snapshot.numChildren();
    $(".driversCount").html(availableDrivers);
    console.log("Drivers Count: " + availableDrivers);
  });
});


// Fetch the count of active bookings
$(document).ready(function(){
  const databaseRef = firebase.database().ref("active_bookings/");

  databaseRef.once('value', (snapshot) => {
    const bookingsCount = snapshot.numChildren();
  
    $(".bookingsCount").html(bookingsCount);
    console.log("Bookings Count: " + bookingsCount);
  });
})







