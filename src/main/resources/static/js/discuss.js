$(function(){
    $("#topBtn").click(setTop);
    $("#wonderfulBtn").click(setWonderful);
    $("#deleteBtn").click(setDelete);
});


function like(btn, entityType, entityId, entityUserId, postId) {
    $.post(
        CONTEXT_PATH + "/like",
        {"entityType":entityType,"entityId":entityId,"entityUserId":entityUserId,"postId":postId},
        function(data) {
            // Check if response is HTML, meaning the user has not login
            // and should redirect to login page
            if (typeof data === 'string' && data.trim().startsWith('<!')) {
                location.href = CONTEXT_PATH + "/login";
                return;
            }
            
            data = $.parseJSON(data);
            if (data.code == 0) {
                $(btn).children("i").text(data.likeCount);
                $(btn).children("b").text(data.likeStatus==1?'liked':'like');
            } else {
                alert(data.msg);
            }
        }
    );
}

function setTop() {
    var btn = this;
    var id = $(btn).data('post-id');
    $.post(
        CONTEXT_PATH + "/discuss/top",
        {"id":id},
        function(data) {
            data = $.parseJSON(data);
            if (data.code == 0) {
                $("#topBtn").attr("disabled", "disabled");
            } else {
                alert(data.msg);
            }
        }
    );
}

function setWonderful() {
    var btn = this;
    var id = $(btn).data('post-id');
    $.post(
        CONTEXT_PATH + "/discuss/wonderful",
        {"id":id},
        function(data) {
            data = $.parseJSON(data);
            if (data.code == 0) {
                $("#wonderfulBtn").attr("disabled", "disabled");
            } else {
                alert(data.msg);
            }
        }
    );
}

function setDelete() {
    var btn = this;
    var id = $(btn).data('post-id');
    $.post(
        CONTEXT_PATH + "/discuss/delete",
        {"id":id},
        function(data) {
            data = $.parseJSON(data);
            if (data.code == 0) {
                location.href = CONTEXT_PATH + "/index";
            } else {
                alert(data.msg);
            }
        }
    );
}
