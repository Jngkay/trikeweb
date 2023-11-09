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
    const occ = $("#occ").val();
    const mt = $("#mt").val();
    const available = document.getElementById('available').checked;
    const profilePictureInput = document.getElementById("profilePicture");
    const profilePictureFile = profilePictureInput.files[0];

    if (!profilePictureFile) {
      alert("Please select Profile Picture when you ADD a Driver.");
      document.getElementById("lightBox-loader").style.display = "none";
      return;
    } 

    if (fullname === '' || email === '' || conNum === '' || address === '' || pword === '' || fn === '' || plateNo === '' || mt === '') {
      alert("Please fill in all fields before submitting.");
      document.getElementById("lightBox-loader").style.display = "none";
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
          occ: occ,
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
        document.getElementById("occ").value = "";
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
      row.append($("<td>").text(driverData.occ));
      row.append($("<td>").text(driverData.mt));

      const qrCell = $("<td>");
      qrCell.append($("<button class='viewQR'>").text("View QR Code").click(function(){
        $("#qrModalView").show();
        $('#qrcode').qrcode("http://dhrrp2trikeapp.com/profile/profile.html?plateno=" + driverData.plateNo);	
      }));
      row.append(qrCell);
      
      row.append($("<td>").text(driverData.available));

      const actionCell = $("<td>");
      //actionCell.append($("<button>").text("Edit").addClass("edit-btn"));
      // Modify your loop to include an Edit button with a unique ID
      const editButton = $("<button>").text("Edit").addClass("edit-btn");
      editButton.attr("data-plate-no", driverData.plateNo); // Add a custom attribute to store the plateNo
      actionCell.append(editButton);

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

      const actionCell_user = $("<td>");
      actionCell_user.append($("<button>").text("Delete").click(function() {
        deleteDriver(driverData.plateNo);
      }));


      
      newrow.append($("<button>").text("Delete").click(function() {
        deleteDriver(driverData.plateNo);
      }));
      userTableBody.append(newrow);
    });
  });
});

/*Search Users in database */
$(document).ready(function () {
  $("#searchUserInput").on("input", function () {
    const searchQuery = $(this).val().toLowerCase();
    filterAndDisplayUserData(searchQuery);
  });
  function filterAndDisplayUserData(searchQuery) {
  const databaseRef = firebase.database().ref("users/");

  userclearDataRows();

  databaseRef.orderByChild("firstname").on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      const userData = childSnapshot.val();

      if (
        userData.firstname.toLowerCase().includes(searchQuery) ||
        userData.lastname.toLowerCase().includes(searchQuery) ||
        userData.email.toLowerCase().includes(searchQuery) ||
        userData.phone.toLowerCase().includes(searchQuery)
      ) {
        const newrow = $("<tr>");
        newrow.append($("<td>").text(userData.firstname));
        newrow.append($("<td>").text(userData.lastname));
        newrow.append($("<td>").text(userData.email));
        newrow.append($("<td>").text(userData.phone));

        $(".userTableBody").append(newrow);
      }
    });
  });
}
function userclearDataRows() {
  $('.userTableBody').find("tr:gt(0)").remove();
}
});


/*Update Method */
$(document).on("click", ".edit-btn", function() {
  const plateNo = $(this).attr("data-plate-no"); 
  populateUpdateModal(plateNo); 
});

function populateUpdateModal(plateNo) {
  const databaseRef = firebase.database().ref("drivers/");
  const updateDriverForm = $("#update-driver-form");

  databaseRef.child(plateNo).once("value", function(snapshot) {
    const driverData = snapshot.val();

    // Set the values in the update modal fields
    $("#upfullname").val(driverData.fullname);
    $("#upemail").val(driverData.email);
    $("#upconNum").val(driverData.conNum);
    $("#upaddress").val(driverData.address);
    $("#uppword").val(driverData.pword);
    $("#upfn").val(driverData.fn);
    $("#upplateNo").val(driverData.plateNo);
    $("#upocc").val(driverData.occ);
    $("#upmt").val(driverData.mt);

    const upavailableCheckbox = document.getElementById("upavailable");
    upavailableCheckbox.checked = driverData.available;

    // Display the update modal
    $("#UpdateDriverModal").show();

    // Event listener for the update form submission
    updateDriverForm.off("submit").on("submit", function(e) {
      e.preventDefault();
      const updatedFullname = $("#upfullname").val();
      const updatedEmail = $("#upemail").val();
      const updatedConNum = $("#upconNum").val();
      const updatedAddress = $("#upaddress").val();
      const updatedPword = $("#uppword").val();
      const updatedFn = $("#upfn").val();
      const updatedPlateNo = $("#upplateNo").val();
      const updatedocc = $("#upocc").val();
      const updatedMt = $("#upmt").val();
      const updatedAvailable = document.getElementById("upavailable").checked;

      // Update the driver's data in Firebase
      const databaseRef = firebase.database().ref("drivers/" + updatedPlateNo);
      databaseRef.update({
        fullname: updatedFullname,
        email: updatedEmail,
        conNum: updatedConNum,
        address: updatedAddress,
        pword: updatedPword,
        fn: updatedFn,
        occ: updatedocc,
        mt: updatedMt,
        available: updatedAvailable,
      }, function(error) {
        if (error) {
          alert("Failed to update data. Please try again.");
        } else {
          alert("Data has been updated successfully!");

          $("#UpdateDriverModal").hide();
        }
      });

    });
    // Close button in the update modal
    $(".update-modal-close").on("click", function() {
    $("#UpdateDriverModal").hide();
  });
  });
}







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



/*Profile Page Function */
$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const plateNo = urlParams.get("plateno");

  if (plateNo) {
    fetchDriverData(plateNo);
  } else {
    console.error("Plate number parameter missing.");
  }
});

function fetchDriverData(plateNo) {
  const databaseRef = firebase.database().ref("drivers/" + plateNo);
  databaseRef.on("value", function(snapshot) {
    const driverData = snapshot.val();

    if (driverData) {
      $("#profile-image").attr("src", driverData.profilePictureURL);
      $("#plateNo-data").text(driverData.plateNo);
      $("#fullname-data").text(driverData.fullname);
      $("#address-data").text(driverData.address);
      $("#contact-data").text(driverData.conNum);
      $("#email-data").text(driverData.email);
      $("#franNo-data").text(driverData.fn);
      $("#occ-data").text(driverData.occ);
      $("#motor-data").text(driverData.mt);
    } else {
      console.error("Driver not found");
    }
  });
}





/*Search Reports in database */
$(document).ready(function () {
  $("#searchReportInput").on("input", function () {
    const searchQuery = $(this).val().toLowerCase();
    filterAndDisplayReportData(searchQuery);
    console.log("Search Query:", searchQuery); 
  });
  function filterAndDisplayReportData(searchQuery) {
  const databaseRef = firebase.database().ref("active_bookings/");
  const usersRef = firebase.database().ref("users/"); 

  $('.reportTableBody').find("tr:gt(0)").remove();

  databaseRef.orderByChild("booking_time").on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      const reportData = childSnapshot.val();
      console.log("Report Data:", reportData);

      if (
        reportData.driverID.fullname.toLowerCase().includes(searchQuery) ||
        reportData.booking_time.toLowerCase().includes(searchQuery)
      ) {
        const newrow = $("<tr>");

        const userId = reportData.userId;
          usersRef.child(userId).once("value", function(userSnapshot) {
          const userData = userSnapshot.val();
          const fullName = userData.firstname + " " + userData.lastname;
        
        newrow.append($("<td>").text(fullName));
        newrow.append($("<td>").text(reportData.userReport || "N/A"));
        newrow.append($("<td>").text(reportData.driverID.fullname));
        newrow.append($("<td>").text(reportData.userRating || 0));
        newrow.append($("<td>").text(reportData.booking_time));

        $(".reportTableBody").append(newrow);
      });
    }
    });
  });
}
});



/*Reports Read Method */
$(document).ready(function(){
  const activeBookingsRef = firebase.database().ref("active_bookings/");
  const usersRef = firebase.database().ref("users/"); 
  const reportTableBody = $(".reportTableBody"); 

  function reportclearDataRows() {
    reportTableBody.find("tr:gt(0)").remove();
  }

  activeBookingsRef.orderByChild("booking_time").on("value", function(snapshot) {
    reportclearDataRows(); 

    snapshot.forEach(function(childSnapshot) {
      const reportData = childSnapshot.val();
      const newrow = $("<tr>");

      const userId = reportData.userId;
      usersRef.child(userId).once("value", function(userSnapshot) {
        const userData = userSnapshot.val();
        const fullName = userData.firstname + " " + userData.lastname;
        
        newrow.append($("<td>").text(fullName));
        newrow.append($("<td>").text(reportData.userReport || "N/A"));
        newrow.append($("<td>").text(reportData.driverID.fullname));
        newrow.append($("<td>").text(reportData.userRating || 0))
        newrow.append($("<td>").text(reportData.booking_time));

        reportTableBody.append(newrow);
      });
    });
  });
});







