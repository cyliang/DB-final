$.widget("custom.table", {
	options: {
		source: "",
		editable: false,

		border: false
	},
	_create: function() {
		this.ctrlSearch = new Object;
		this.ctrlSearch.row = $('<div class="row">').appendTo(this.element);
		this.ctrlSearch.selectCol = $('<div class="col-md-3 col-md-offset-9">').appendTo(this.ctrlSearch.row);
		this.ctrlSearch.inputCol = $('<div class="col-md-3 col-md-push-6">').appendTo(this.ctrlSearch.row).hide();
		this.ctrlSearch.select = $('<select class="form-control">')
						.appendTo(this.ctrlSearch.selectCol)
						.append('<option value="noselect" disabled selected>Search for</option>');
		this.ctrlSearch.input = $('<input type="text" class="form-control">').appendTo(this.ctrlSearch.inputCol);

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

			if(_this.options.editable) {
				_this.column.modify = $("<th>Modify</th>").appendTo(theadRow);
			}

			for(var col in data.data[0]) {
				_this.column[col] = $("<th>").appendTo(theadRow)
		       					.text(col + " ")
							.attr("data-content", col)
							.click(function() {
								_this._sort($(this).attr("data-content"));
							}).tooltip({
								title: "Click to sort by " + col,
								container: "body"
							});
				_this.ctrlSearch.select.append('<option value="' + col + '">' + col + '</option>');
			}

			_this._refresh();
		});

		this.ctrlPage = new Object();
		this.ctrlPage.nowPage = 1;

		this.ctrlPage.row = $('<div class="row">').insertAfter(this.table);

		var btnGroup1 = $('<div class="btn-group btn-group-justified">').appendTo(
					$('<div class="col-md-4">').appendTo(this.ctrlPage.row)
				);
		this.ctrlPage.firstBtn = $("<button>First page</button>")
					.appendTo(
						$('<div class="btn-group">').appendTo(btnGroup1)
					).addClass("btn btn-primary")
					.click(function() {
						_this._refetch("first");
					});
		this.ctrlPage.prevBtn = $("<button>Previous page</button>")
					.appendTo(
						$('<div class="btn-group">').appendTo(btnGroup1)
					).addClass("btn btn-default")
					.click(function() {
						_this._refetch("prev");
					});

		this.ctrlPage.pageInput = $('<input type="text">')
					.appendTo(
						$('<div class="col-md-4">').appendTo(this.ctrlPage.row)
					).addClass("form-control")
					.on("input", function() {
						_this._refetch($(this).val());
					});

		var btnGroup2 = $('<div class="btn-group btn-group-justified">').appendTo(
					$('<div class="col-md-4">').appendTo(this.ctrlPage.row)
				);
		this.ctrlPage.nextBtn = $("<button>Next page</button>")
					.appendTo(
						$('<div class="btn-group">').appendTo(btnGroup2)
					).addClass("btn btn-default")
					.click(function() {
						_this._refetch("next");
					});
		this.ctrlPage.lastBtn = $("<button>Last page</button>")
					.appendTo(
						$('<div class="btn-group">').appendTo(btnGroup2)
					).addClass("btn btn-primary")
					.click(function() {
						_this._refetch("last");
					});

		this.ctrlOrder = new Object();
		this.ctrlOrder.col = null;
		this.ctrlOrder.ord = "ASC";

		this.ctrlSearch.col = "noselect";
		this.ctrlSearch.val = "";
		this.ctrlSearch.select.change(function() {
			if((_this.ctrlSearch.col = $(this).val()) != "noselect") {
				_this.ctrlSearch.inputCol.show();
				_this.ctrlSearch.selectCol.removeClass("col-md-offset-9")
							.addClass("col-md-push-6");
				_this.ctrlSearch.input.attr("placeholder", 'Search for "' + $(this).val() + '"...');
			} else {
				_this.ctrlSearch.inputCol.hide();
				_this.ctrlSearch.selectCol.addClass("col-md-offset-9")
							.removeClass("col-md-push-6");
			}
		});
		this.ctrlSearch.input.on("input", function() {
			_this.ctrlSearch.val = $(this).val();
			_this._refetch("first");
		});
	},
	_destroy: function() {
		this.element.empty();
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
			page = this.ctrlPage.nowPage + 1;
			break;
		case "prev":
			page = this.ctrlPage.nowPage - 1;
			break;
		case "now":
			page = this.ctrlPage.nowPage;
			break;
		}

		if(page >= 1) {
			this.ctrlPage.nowPage = Number(page);
			var _this = this;

			var postData = new Object;
			postData.page = page;
			if(this.ctrlOrder.col != null) {
				postData.order_col = this.ctrlOrder.col;
				postData.order_ord = this.ctrlOrder.ord;
			}
			if(this.ctrlSearch.col != "noselect" && this.ctrlSearch.val != "") {
				postData.search_col = this.ctrlSearch.col;
				postData.search_val = this.ctrlSearch.val;
			}

			abPost(this.options.source, postData, function(data) {
				_this.data = data;
				_this._refresh();
			});
		}
	},
	_sort: function(col) {
		if(this.ctrlOrder.col != null) {
			this.column[this.ctrlOrder.col].text(col + " ");
		}

		if(col == this.ctrlOrder.col) {
			this.ctrlOrder.ord = this.ctrlOrder.ord == "ASC" ? "DESC" : "ASC";
		} else {
			this.ctrlOrder.col = col;
			this.ctrlOrder.ord = "ASC";
		}

		this._refetch("first");
		$('<span>').appendTo(this.column[col])
			.addClass('glyphicon glyphicon-circle-arrow-' + (this.ctrlOrder.ord == "ASC" ? "up text-danger" : "down text-success"));
	},
	_refresh: function() {
		var tbody = this.table.find("tbody").empty();
		var _this = this;

		for(var row in this.data.data) {
			var tr = $("<tr>").appendTo(tbody);

			if(this.options.editable !== false) {
				$("<td>").appendTo(tr).append(
					$('<a href="#"></a>')
					.append('<span class="glyphicon glyphicon-pencil text-warning"></span>')
					.attr("data-target", row)
					.click(function() {
						var rowData = _this.data.data[$(this).attr("data-target")];

						var editModal = $('<div>').appendTo(_this.element).html(
							'<h1 class="text-warning">Modification</h1>' +
							'<p>Leave blank for not changing</p>'
						);

						var editForm = $('<form class="form-horizontal">').appendTo(editModal);
						for(var col in rowData) {
							var colInput;

							if(col in _this.options.editable) {
								if(_this.options.editable[col] === null) {
									continue;
								}
								colInput = _this.options.editable[col].clone().attr("name", col);
							} else {
								colInput = $('<input disabled>');
							}

							colInput.appendTo(
								$('<div class="col-md-9">').appendTo(
									$('<div class="form-group">').appendTo(editForm).append(
										'<div class="col-md-3 control-label">' + col + '</div>'
									)
								)
							).addClass("form-control")
							.attr("placeholder", rowData[col]);

						}
						$('<input type="hidden" name="key">').appendTo(editForm)
										.val(rowData[_this.data.primary]);

						$('<div class="row">').appendTo(editForm).append(
							$('<div class="col-md-3 col-md-push-3">').append(
								$('<button type="button" class="btn btn-danger btn-block">Cancel</button>').click(function() {
									$.remodal.lookup[editModal.data('remodal')].close()
								})
							)
						).append(
							$('<div class="col-md-3 col-md-push-3"><button type="submit" class="btn btn-success btn-block">OK</button></div>')
						);
						editForm.submit(function() {
							event.preventDefault();

							abPost(_this.options.editTarget, $(this).serialize(), function(data) {
								$.remodal.lookup[editModal.data('remodal')].close();
								_this._refetch("now");
							});
						});

						editModal.remodal().open();
						editModal.on('closed', function() {
							$(this).remove();
							$(".remodal-overlay").remove();
						});
					})
				).append(
					$('<a href="#"></a>')
					.append('<span class="glyphicon glyphicon-trash text-danger"></span>')
					.attr("data-target", row)
					.click(function() {
						var rowData = _this.data.data[$(this).attr("data-target")];

						var deleteModal = $('<div>').appendTo(_this.element).html(
							'<h1 class="text-danger">Warning!</h1>' +
							'<p>Do you really want to delete the following data?</p>' +
							'<blockquote class="text-left"><dl class="dl-horizontal"></dl></blockquote>' +
							'<br>' +
							'<a href="#" class="remodal-cancel">OK</a>' +
							'<a href="#" class="remodal-confirm">Cancel</a>'
						);
						var deleteDscr = deleteModal.find("dl");
						for(var col in rowData) {
							$("<dt>").appendTo(deleteDscr).text(col);
							$("<dd>").appendTo(deleteDscr).text(rowData[col]);
						}

						deleteModal.remodal().open();
						deleteModal.on('cancel', function() {
							abPost('php/country-delete.php', {
								key: rowData[_this.data.primary]
							}, function(data) {
								_this._refetch("now");
							});
						});
						deleteModal.on('closed', function() {
							$(this).remove();
							$(".remodal-overlay").remove();
						});
					})
				)
			}
			for(var col in this.data.data[row]) {
				$("<td>").appendTo(tr)
					.text(this.data.data[row][col]);
			}
		}

		this.ctrlPage.pageInput.attr("placeholder", 
			"Input page no. to jump.   (" + 
			this.ctrlPage.nowPage + "/" + 
			this.data.totalPage + ")"
		).val("");
		if(this.ctrlPage.nowPage > 1) {
			this.ctrlPage.firstBtn.add(this.ctrlPage.prevBtn).removeAttr("disabled");
		} else {
			this.ctrlPage.firstBtn.add(this.ctrlPage.prevBtn).attr("disabled", "disabled");
		}
		if(this.ctrlPage.nowPage < this.data.totalPage) {
			this.ctrlPage.lastBtn.add(this.ctrlPage.nextBtn).removeAttr("disabled");
		} else {
			this.ctrlPage.lastBtn.add(this.ctrlPage.nextBtn).attr("disabled", "disabled");
		}
	}
});
