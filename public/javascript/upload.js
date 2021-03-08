$("#input-upload").height($("#textarea-upload").height());

let upload = true;
$("#h1-text").click(function(){
    if(upload){
        upload = false;
        $(this).css("color", "#000");
        $("#textarea-upload").attr("disabled", false);
        checkTextArea();
        $("#textarea-upload").css("background-color", "#212529");
        $("#h1-upload").css("color", "#6f7275");
        $("#input-upload").attr("disabled", true);
        $("#input-upload").css("background-color", "#6f7275");
        $("#button-upload").attr("disabled", true);
    }
});

$("#h1-upload").click(function(){
    if(!upload){
        upload = true;
        $(this).css("color", "#000");
        $("#input-upload").attr("disabled", false);
        checkSelectedFile();
        $("#input-upload").css("background-color", "#212529");
        $("#h1-text").css("color", "#6f7275");
        $("#textarea-upload").attr("disabled", true);
        $("#textarea-upload").css("background-color", "#6f7275");
        $("#button-text").attr("disabled", true);
    }
});

$("#input-upload").change(checkSelectedFile);
function checkSelectedFile() {
    if(!$("#input-upload").val()) {
        alert("Please select a PDF file");
        $("#button-upload").attr("disabled", true);
        return;
    }
    const fileName = $(this).val();
    const extension = fileName.split(".")[fileName.split(".").length-1];
    console.log(extension);
    if (extension === "pdf") {
        const fileSize = this.files[0].size/1024/1024;
        if(fileSize < 30) {
            $("#button-upload").attr("disabled", false);
        } else {
            alert("Size should not exceed 30 MiB");
            $("#input-upload").val("");
            $("#button-upload").attr("disabled", true);
        }
    } else {
        alert("Please upload a PDF file exclusively");
        $("#input-upload").val("");
        $("#button-upload").attr("disabled", true);
    }

}

$("#textarea-upload").bind("input propertychange", checkTextArea);
function checkTextArea() {
    if($("#textarea-upload").val()) {
        $("#button-read").attr("disabled", false);
    } else {
        $("#button-read").attr("disabled", true);
    }
}