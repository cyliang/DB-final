$.widget("custom.ticket", {
	options: {
		track: false,
	},
	_create: function() {
		var _this = this;
		this.selectHTML = {
		};
		this.searchForm = $('<form class="form-horizontal">')
		.append(
			$('<div class="form-group">').append(
				'<div class="col-md-3 control-label">From:</div>'
			).append(
				$('<div class="col-md-3">').append(
					$('<select class="form-control" required>' + 
						'<option value=""></option>' +
						'<option value="country">Country</option>' +
						'<option value="city">City</option>' + 
						'<option value="airport">Airport</option>' +
					'</select>').change(function() {
						$(this).parent().next().find("select").html(_this.selectHTML[$(this).val()]);
					})
				)
			).append(
				'<div class="col-md-6">' +
					'<select class="form-control">' +
					'</select>' +
				'</div>'
			);
		)
	}
});
