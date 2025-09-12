$(function(){
	$("#publishBtn").click(publish);
});

function publish() {
	$("#publishModal").modal("hide");

	// before sending AJAX, set CSRF token in the header
//	var token = $("meta[name='_csrf']").attr("content");
//	var header = $("meta[name='_csrf_header']").attr("content");
//	$(document).ajaxSend(function(e, xhr, options){
//	    xhr.setRequestHeader(header, token);
//	});

	// get title and content
	var title = $("#recipient-name").val();
	var content = $("#message-text").val();
	// send async post
	$.post(
	    CONTEXT_PATH + "/discuss/add",
	    {"title":title,"content":content},
	    function(data) {
	        data = $.parseJSON(data);
	        // set message in hintBody
	        $("#hintBody").text(data.msg);
	        // show hintBody
	        $("#hintModal").modal("show");
	        // hide hintBody after 2 seconds
            setTimeout(function(){
                $("#hintModal").modal("hide");
                // refresh page if post success
                if(data.code == 0) {
                    window.location.reload();
                }
            }, 2000);
	    }
	);


}