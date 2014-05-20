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
			_this.column = new Object();
			var theadRow = _this.table.find("thead tr")

			for(var col in data.data[0]) {
				_this.column[col] = $("<th>").appendTo(theadRow)
		       					.text(col)
							.click(function() {
								_this._sort(col);
							});
			}

			_this._refresh();
		});

		this.ctrl = new Object();
		this.ctrl.nowPage = 1;

		this.ctrl.row = $('<div class="row">').insertAfter(this.table);
		this.ctrl.firstBtn = $("<button>First page</button>")
					.appendTo(
						$('<div class="col-md-2">').appendTo(this.ctrl.row)
					).addClass("btn btn-primary btn-block")
					.click(function() {
						_this._refetch("first");
					});
		this.ctrl.prevBtn = $("<button>Previous page</button>")
					.appendTo(
						$('<div class="col-md-2">').appendTo(this.ctrl.row)
					).addClass("btn btn-default btn-block")
					.click(function() {
						_this._refetch("prev");
					});
		this.ctrl.pageInput = $('<input type="text">')
					.appendTo(
						$('<div class="col-md-4">').appendTo(this.ctrl.row)
					).addClass("form-control")
					.on("input", function() {
						_this._refetch($(this).val());
					});
		this.ctrl.nextBtn = $("<button>Next page</button>")
					.appendTo(
						$('<div class="col-md-2">').appendTo(this.ctrl.row)
					).addClass("btn btn-default btn-block")
					.click(function() {
						_this._refetch("next");
					});
		this.ctrl.lastBtn = $("<button>Last page</button>")
					.appendTo(
						$('<div class="col-md-2">').appendTo(this.ctrl.row)
					).addClass("btn btn-primary btn-block")
					.click(function() {
						_this._refetch("last");
					});
	},
	_refetch: function(page) {
		switch(page) {
		case "first":
			page = 1;
			break;
		case "last":
			page = this.data.totalPage;
			break;
		case "next":
			page = this.ctrl.nowPage + 1;
			break;
		case "prev":
			page = this.ctrl.nowPage - 1;
			break;
		}

		if(page >= 1) {
			this.ctrl.nowPage = Number(page);
			var _this = this;

			abPost(this.options.source, {
				page: page
			}, function(data) {
				_this.data = data;
				_this._refresh();
			});
		}
	},
	_sort: function(col) {
		/* TODO */
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
		).val("");
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
