$(document).ready(function() {
	var regist_form = $("#form-regist");
	var regist_email = regist_form.find("#regist-email");
	
	regist_email.change(function() {
		$(this).popover("destroy")
			.parent().parent().removeClass("has-error");

		if($(this).val() != "") {
			$.post('php/user-check_exist.php', {
				email: $(this).val()
			}, function(data, status) {
				if(status == "success" && data.status == "exist") {
					regist_email.popover({
						html: true,
						trigger: "manual",
						content: '<span class="text-danger">The&nbsp;email&nbsp;<em>' + 
								regist_email.val() + 
								'</em> is&nbsp;already&nbsp;used!</span>',
						container: "#modal-regist .modal-content"
					}).popover("show")
					.parent().parent().addClass("has-error");
				}
			}, 'json');
		}
	});

	regist_form.find("#regist-vpwd").popover({
		html: true,
		trigger: "manual",
		content: '<span class="text-danger">The&nbsp;verifying&nbsp;password&nbsp;is ' +
				'different&nbsp;with&nbsp;the&nbsp;password!</span>',
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

	$("#modal-regist").on("hidden.bs.modal", function(e) {
		regist_form.find("input").val("")
					.popover("destroy");
		regist_form.find(".form-group").removeClass("has-error");
	});

	regist_form.submit(function() {
		event.preventDefault();

		if($(this).find("#regist-pwd").val() != $(this).find("#regist-vpwd").val()) {
			$('<div class="alert alert-danger alert-dismissable">').insertBefore($(this))
				.html('<button type="button" class="close" data-dismiss="alert">&times;</button>' +
					"The password and verifying password are different!"
				);
			return;
		}
		$(".alert-danger").alert("close");

		var subBtn = $('#modal-regist button[type="submit"]').button("loading");
		$.post('php/user-regist.php', $(this).serialize(), function(data, status) {
			if(status != "success") {
				alert("Connection error!");
			} else if(data.status == "email_exist") {
				$('<div class="alert alert-danger alert-dismissable">').insertBefore(regist_form)
					.html('<button type="button" class="close" data-dismiss="alert">&times;</button>' +
						"The email <strong>" + regist_form.find("#regist-email").val() + "</strong> is used!"
					);
			} else if(data.status == "success") {
				subBtn.text("Success").prop("disabled", true);
				$('<div class="alert alert-success">').insertAfter(regist_form)
						.text("The account has been created successfully. Logining in after 5 seconds...");
				return;
			}

			subBtn.button("reset");
		}, 'json');
	});


	var login_form = $("#form-login");
	login_form.submit(function() {
		/* TODO */
	});
});
