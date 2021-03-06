$("#input-upload").height($("#textarea-index").height());

let upload = true;
$("#h1-text").click(function(){
    if(upload){
        upload = false;
        $(this).css("color", "#000");
        $("#textarea-index").attr("disabled", false);
        $("#textarea-index").css("background-color", "#212529");
        $("#h1-upload").css("color", "#6f7275");
        $("#input-upload").attr("disabled", true);
        $("#input-upload").css("background-color", "#6f7275");
    }
});

$("#h1-upload").click(function(){
    if(!upload){
        upload = true;
        $(this).css("color", "#000");
        $("#input-upload").attr("disabled", false);
        $("#input-upload").css("background-color", "#212529");
        $("#h1-text").css("color", "#6f7275");
        $("#textarea-index").attr("disabled", true);
        $("#textarea-index").css("background-color", "#6f7275");
    }
});

$("#input-upload").change(function() {
    const fileName = $(this).val();
    const extension = fileName.split(".")[fileName.split(".").length-1];
    console.log(extension);
    if (extension === "pdf") {
        $("#button-upload").attr("disabled", false);
    } else {
        alert("Please upload a PDF file exclusively");
        $("#input-index").val(null);
        $("#button-upload").attr("disabled", true);
    }
});

$("#textarea-index").bind("input propertychange", function() {
    if($(this).val().length>0) {
        $("#button-read").attr("disabled", false);
    } else {
        $("#button-read").attr("disabled", true);
    }
});