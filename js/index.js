$(document).ready(function() {
	var regist_form = $("#form-regist");

	regist_form.find("#regist-email").change(function() {
		$(this).popover("destroy")
			.parent().parent().removeClass("has-error");

		/* TODO */
		$(this).popover({
			html: true,
			trigger: "manual",
			content: '<span class="text-danger">The&nbsp;email&nbsp;<em>' + $(this).val() + '</em> is&nbsp;already&nbsp;used!</span>',
			container: "#modal-regist .modal-content"
		}).popover("show")
		.parent().parent().addClass("has-error");
	});

	regist_form.find("#regist-vpwd").popover({
		html: true,
		trigger: "manual",
		content: '<span class="text-danger">The&nbsp;verifying&nbsp;password&nbsp;is different&nbsp;with&nbsp;the&nbsp;password!</span>',
		container: "#modal-regist .modal-content"
	});
	regist_form.find(":password").change(function() {
		var pwd = regist_form.find("#regist-pwd").val();
		var vpwd = regist_form.find("#regist-vpwd").val();

		if(pwd != "" && vpwd != "" && pwd != vpwd) {
			regist_form.find("#regist-vpwd").popover("show");
			regist_form.find(":password").parent().parent().addClass("has-error");
		} else {
			regist_form.find("#regist-vpwd").popover("hide");
			regist_form.find(":password").parent().parent().removeClass("has-error");
		}
	});
});
