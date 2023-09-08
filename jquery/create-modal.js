$(document).ready(function() {
    // Get the modal and the buttons

    var modal = $("#AddDriverModal");
    var qrmodal = $("#qrModalView");
    var getDataModal = $("#qrModalView").data('info');


    var openModalBtn = $("#addDriverBtn");

    var closeModalBtn = $("#closeModalBtn");
    var cancelBtn = $("#cancel-btn");
  
    // Open the modal
    openModalBtn.click(function() {
      modal.show();
    });

    $(document).on('click', '.viewQR', function() { qrmodal.show(); qrmodal.data( "info", 'Test');});
    $(document).on('click', '#viewQRClose', function() { qrmodal.hide(); });
  
    // Close the modal
    closeModalBtn.click(function() {
      modal.hide();
      qrmodal.hide();
    });

    cancelBtn.click(function(){
      modal.hide();
      qrmodal.hide();
    });
  
    // Close the modal if the user clicks outside of it
    $(window).click(function(event) {
      if (event.target === qrmodal[0]) {
        qrmodal.hide();
      }
      if (event.target === qrmodal[0]) {
        qrmodal.hide();
      }
    });
  });

  

  /*Firebase Function */


  