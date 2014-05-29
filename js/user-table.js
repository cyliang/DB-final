$.widget("custom.table_user", $.custom.table, {
	_refresh: function() {
		this._super();
		var _this = this;

		this.table.find("tbody tr").each(function() {
			var rowData = _this.data.data[$(this).find("td a").first().attr("data-target")];
			$(this).find("td a").first().remove();

			var idenCol = $(this).find("td").last();
			if(idenCol.text() == "User") {
				$('<button type="button" class="btn btn-warning btn-xs">Upgrade</button>').appendTo(idenCol.append("&nbsp;")).click(function() {
					var upgradeModal = $('<div>').appendTo(_this.element).html(
						'<h1 class="text-warning">User Upgrading</h1>' +
						'<p>The following user would become an <strong>administrator</strong>,<br>' +
						'and will have the power to do everything!</p>' +
						'<blockquote class="text-left"><dl class="dl-horizontal"></dl></blockquote>' +
						'<br>' +
						'<a href="#" class="remodal-cancel">No</a>' +
						'<a href="#" class="remodal-confirm">Yes</a>'
					);

					var desr = upgradeModal.find("dl");
					for(var col in rowData) {
						$("<dt>").appendTo(desr).text(col);
						$("<dd>").appendTo(desr).text(rowData[col]);
					}

					upgradeModal.remodal().open();
					upgradeModal.on('confirm', function() {
						abPost(_this.options.editTarget, {
							key: rowData[_this.data.primary],
							power: 1
						}, function(data) {
							_this._refetch("now");
						});
					});
					upgradeModal.on('closed', function() {
						$(this).remove();
						$(".remodal-overlay").remove();
					});
				});
			}
		});
	}
});
