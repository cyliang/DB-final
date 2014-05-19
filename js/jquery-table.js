$.widget("custom.table", {
	options: {
		source: "",
		editable: false,

		border: false
	},
	_create: function() {
		this.table = $("<table>")
				.appendTo(this.element)
				.addClass("table table-striped table-hover")
				.append("<thead><tr>")
				.append("<tbody>");

		if(this.options.border) {
			this.table.addClass("table-bordered");
		}

		var _this = this;
		abPost(this.options.source, {}, function(data) {
			_this.data = data;

			var theadRow = _this.table.find("thead tr")
			for(var col in data.data[0]) {
				$("<th>").appendTo(theadRow)
		       			.text(col);
			}

			_this._refresh();
		});

		this.ctrl = new Object();
		this.ctrl.nowPage = 1;

		this.ctrl.row = $('<div class="row">').insertAfter(this.table);
		this.ctrl.firstBtn = $("<button>First page</button>")
					.appendTo(
						$('<div class="col-md-2">').appendTo(this.ctrl.row)
					).addClass("btn btn-primary btn-block");
		this.ctrl.prevBtn = $("<button>Previous page</button>")
					.appendTo(
						$('<div class="col-md-2">').appendTo(this.ctrl.row)
					).addClass("btn btn-default btn-block");
		this.ctrl.pageInput = $('<input type="text">')
					.appendTo(
						$('<div class="col-md-4">').appendTo(this.ctrl.row)
					).addClass("form-control")
					.attr("placeholder", "Input page no. to jump. (1/4)");
		this.ctrl.nextBtn = $("<button>Next page</button>")
					.appendTo(
						$('<div class="col-md-2">').appendTo(this.ctrl.row)
					).addClass("btn btn-default btn-block");
		this.ctrl.lastBtn = $("<button>Last page</button>")
					.appendTo(
						$('<div class="col-md-2">').appendTo(this.ctrl.row)
					).addClass("btn btn-primary btn-block");
	},
	_refresh: function() {
		var tbody = this.table.find("tbody").empty();

		for(var row in this.data.data) {
			var tr = $("<tr>").appendTo(tbody);
			for(var col in this.data.data[row]) {
				$("<td>").appendTo(tr)
					.text(this.data.data[row][col]);
			}
		}

		this.ctrl.pageInput.attr("placeholder", 
			"Input page no. to jump.   (" + 
			this.ctrl.nowPage + "/" + 
			this.data.totalPage + ")"
		);
		if(this.ctrl.nowPage > 1) {
			this.ctrl.firstBtn.add(this.ctrl.prevBtn).removeAttr("disabled");
		} else {
			this.ctrl.firstBtn.add(this.ctrl.prevBtn).attr("disabled", "disabled");
		}
		if(this.ctrl.nowPage < this.data.totalPage) {
			this.ctrl.lastBtn.add(this.ctrl.nextBtn).removeAttr("disabled");
		} else {
			this.ctrl.lastBtn.add(this.ctrl.nextBtn).attr("disabled", "disabled");
		}
	}
});
