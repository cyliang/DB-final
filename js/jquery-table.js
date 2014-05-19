$.widget("custom.table", {
	options: {
		column: null,
		source: null,
		editable: false,

		border: false
	},
	_create: function() {
		this.table = $("<table>")
				.appendTo(this.element)
				.addClass("table table-striped table-hover");
	}
});
