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

    function form() {
      const fullnameV = document.getElementById("name").value;
      const franchiseNumberV = document.getElementById("fn").value;
      const driverRateV = document.getElementById("dr").value;
      const motorTypeV = document.getElementById("mt").value;
      const qrcodeV = document.getElementById("qrc").value;
      console.log(fullnameV, franchiseNumberV, driverRateV, motorTypeV, qrcodeV);
  };
  
  document.getElementById("submit-btn").onclick = function () {
      form();
    
      firebase
        .database()
        .ref("drivers/" + driverUid)
        .set({
          fullname: fullnameV,
          franchiseNumber: franchiseNumberV,
          driverRate: driverRateV,
          motorType: motorTypeV,
          qrcode: qrcodeV
        });
  
      alert("Data Inserted");
      document.getElementById("name").value = "";
      document.getElementById("fn").value = "";
      document.getElementById("dr").value = "";
      document.getElementById("mt").value = "";
      document.getElementById("qrc").value = "";
      
    };
  