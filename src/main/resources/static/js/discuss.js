function like(btn, entityType, entityId) {
    $.post(
        CONTEXT_PATH + "/like",
        {"entityType":entityType,"entityId":entityId},
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