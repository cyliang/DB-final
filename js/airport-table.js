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
		this.table.find("tbody tr").each(function() {
			var pos = $(this).find("td").eq(3).text() + ',' + $(this).find("td").eq(2).text();

			$("<a>View</a>").appendTo(
				$("<td>").appendTo($(this))
			).attr("href", 
				"http://maps.googleapis.com/maps/api/staticmap?center=" + pos +
				"&zoom=12&size=300x300&sensor=false&markers=%7C" + pos
			);
		});
	}
});
