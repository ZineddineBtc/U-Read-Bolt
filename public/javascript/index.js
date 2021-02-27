$("#input-index").change(function() {
    if ($(this).val()) {
        $("#button-upload").attr("disabled", false);
        // or: $('input:submit').removeAttr('disabled'); 
    } 
});