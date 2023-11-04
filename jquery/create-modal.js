$(document).ready(function() {
    // Get the modal and the buttons

    var modal = $("#AddDriverModal");
    var qrmodal = $("#qrModalView");

    var openModalBtn = $("#addDriverBtn");

    var closeModalBtn = $("#closeModalBtn");
    var cancelBtn = $("#cancel-btn");
    var cancelUpBtn = $("#cancel-update-btn");

    var UpModal = $("#UpdateDriverModal")
    var updateModalClose = $("update-modal-close");
  
    // Open the modal
    openModalBtn.click(function() {
      modal.show();
    });

    $(document).on('click', '#viewQRClose', function() { 
      qrmodal.hide(); 
      $('#qrcode').html("");
    });
  
    // Close the modal
    closeModalBtn.click(function() {
      modal.hide();
      qrmodal.hide();
      $('#qrcode').html("");
    });

    cancelBtn.click(function(){
      modal.hide();
      qrmodal.hide();
      $('#qrcode').html("");
     
    });

    cancelUpBtn.click(function(){
      UpModal.hide()
    })

    updateModalClose.click(function(){
      UpModal.hide();
    })
  
    // Close the modal if the user clicks outside of it
    $(window).click(function(event) {
      if (event.target === qrmodal[0]) {
        qrmodal.hide();
        $('#qrcode').html("");
      }
      if (event.target === qrmodal[0]) {
        qrmodal.hide();
        $('#qrcode').html("");
      }
    });
  });

  

  /*Firebase Function */


  