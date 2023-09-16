/*const firebaseConfig = {
    apiKey: "AIzaSyC-JvB2RXrsup4P9oH8IgCwUm1W5Ce08dQ",
    authDomain: "tricyclebooking-ebe95.firebaseapp.com",
    databaseURL: "https://tricyclebooking-ebe95-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tricyclebooking-ebe95",
    storageBucket: "tricyclebooking-ebe95.appspot.com",
    messagingSenderId: "211757260511",
    appId: "1:211757260511:web:08ab4ab453e1eb6c81d36a"
  };  
  
    firebase.initializeApp(firebaseConfig);

// Add this code after initializing Firebase
$(document).ready(function() {
    const databaseRef = firebase.database().ref("drivers/");
  
    // Function to display data based on plateNo
    function displayData(plateNo) {
      const driverRef = databaseRef.child(plateNo);
      driverRef.on("value", function(snapshot) {
        const driverData = snapshot.val();
        if (driverData) {
          // Update HTML elements with the driverData
          $(".profile-picture img").attr("src", driverData.profilePictureURL);
          $(".plateNo").text(driverData.plateNo);
          $(".fullname").text(driverData.fullname);
          $(".address").text(driverData.address);
          $(".contact").text(driverData.conNum);
          $(".email").text(driverData.email);
          $(".franchiseNo").text(driverData.fn);
          $(".motorType").text(driverData.mt);
        } else {
          // Handle case where no data is found for the given plateNo
          console.log("Driver not found");
        }
      });
    }
  
    // You can call this function with a specific plateNo to display data
    const plateNoToDisplay = "YOUR_PLATE_NO_HERE";
    displayData(plateNoToDisplay);
  });

  */
  