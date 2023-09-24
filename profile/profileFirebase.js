// profileFirebase.js

$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const plateNo = urlParams.get("plateno"); // Get the plateNo parameter from the URL

  if (plateNo) {
    // Fetch the driver's data from Firebase based on the plateNo
    fetchDriverData(plateNo);
  } else {
    // Handle the case where the plateNo parameter is missing
    console.error("Plate number parameter missing.");
  }
});

function fetchDriverData(plateNo) {
  const databaseRef = firebase.database().ref("drivers/" + plateNo);
  databaseRef.on("value", function(snapshot) {
    const driverData = snapshot.val();

    if (driverData) {
      // Populate the HTML elements with the retrieved data
      $("#profile-image").attr("src", driverData.profilePictureURL);
      $("#plateNo-data").text(driverData.plateNo);
      $("#fullname-data").text(driverData.fullname);
      $("#address-data").text(driverData.address);
      $("#contact-data").text(driverData.conNum);
      $("#email-data").text(driverData.email);
      $("#franNo-data").text(driverData.fn);
      $("#motor-data").text(driverData.mt);
    } else {
      console.error("Driver not found");
    }
  });
}
