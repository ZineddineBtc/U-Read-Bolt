$("#input-password").on("input", function() {
    console.log($(this).val().length);
    if($(this).val().length > 8) {
        $("#btn-register").attr("disabled", false);
    } else {
        $("#btn-register").attr("disabled", true);
    }
}); 