$(function(){
	$(".follow-btn").click(follow);
});

function follow() {
	var btn = this;
	if($(btn).hasClass("btn-info")) {
		// follow
		$(btn).text("following").removeClass("btn-info").addClass("btn-secondary");
	} else {
		// 取消关注
		$(btn).text("follow").removeClass("btn-secondary").addClass("btn-info");
	}
}