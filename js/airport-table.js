$.widget("custom.table_airport", $.custom.table, {
	_create: function() {
		var _this = this;

		this._super();
		$(document).ajaxSuccess(function() {
			_this.table.find("thead tr").append("<th>Map</th>");
		});
	},
	_refresh: function() {
		this._super();

		var _this = this;
		this.table.find("tbody tr").each(function() {
			var pos = $(this).find("td").eq(3).text() + ',' + $(this).find("td").eq(2).text();

			$('<a href="#">View</a>').appendTo(
				$("<td>").appendTo($(this))
			).click(function() {
				var mapModal = $('<div>').appendTo(_this.element).html('<img src="' + 
					"http://maps.googleapis.com/maps/api/staticmap?center=" + pos +
					"&zoom=12&size=300x300&sensor=false&markers=%7C" + pos +
				'">');
				
				mapModal.remodal().open();
				mapModal.on('closed', function() {
					$(this).remove();
					$(".remodal-overlay").remove();
				});
			});
		});
	}
});
