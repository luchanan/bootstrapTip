;(function($){
	//默认参数
	var defaults ={
		title:"温馨提示",
		showClose:true,
		showConfirm:true,
		showFooter:true,
		showHeader:true,
		content:"",
		confirm:null,
		cancle:null,
		beforeClosed:null,
		afterClosed:null,
		backdrop:true,
		confirm_text:'确定',
		close_text:'取消'
	};
	var ShowModal=function(options){
		this.settings=options;
		this.init();
	}
	ShowModal.prototype={
		init:function(){
			if($("#showModel").length>0){
				$("#showModel").remove();
			}
			this.modal_warp=$('<div class="modal fade" id="showModel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>');
			this.modal_warp.append(this._html()).appendTo("body");
			$(this.modal_warp).modal({
		    	backdrop:this.settings.backdrop,
		    	keyboard:this.settings.backdrop==true?true:false,
		    });
		    this.confirm();
		    this.cancle();
		},
		_html:function(){
			var wrap=$('<div class="modal-dialog" role="document"></div>');
			var content=$('<div class="modal-content"></div>').appendTo(wrap);
			var header;
			if(this.settings.showHeader){
				header='<div class="modal-header">\
					        <button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
					        <h4 class="modal-title" id="myModalLabel">'+this.settings.title+'</h4>\
				        </div>'
			}
			$(content).append(header);
			var body='<div class="modal-body">'+
				      	this.settings.content
				      +'</div>';
			$(content).append(body);
			if(!this.settings.showFooter){
				return wrap;
			}
			var footer=$('<div class="modal-footer"></div>');
			if(this.settings.showClose){
				var close='<button type="button" class="btn btn-default btnclose">'+this.settings.close_text+'</button>';
				$(footer).append(close);
			}
			if(this.settings.showConfirm){
				var confirm='<button type="button" class="btn blue btnconfirm">'+this.settings.confirm_text+'</button>';
				$(footer).append(confirm);
			}
			$(content).append(footer).appendTo(wrap);
			return wrap;
		},
		confirm:function(){
			if($.isFunction(this.settings.confirm)){
				$(this.modal_warp).on("click",".btnconfirm",$.proxy(function(){
					this.settings.confirm();
				},this));
			}
			else{
				$(this.modal_warp).on("click",".btnconfirm",function(){
					window.location.reload();
				})
			}
		},
		cancle:function(){
			var _this=this;
			//自定义事件
			$(this.modal_warp).find(".btnclose,.close span").on("cancel",function(){
				_this.settings.cancle();
				$(_this.modal_warp).modal('toggle');
			});
			if($.isFunction(this.settings.cancle)){
				$(this.modal_warp).on("click",".btnclose,.close span",$.proxy(function(){
					$(_this.modal_warp).find(".btnclose").trigger("cancel");
				},this));
			}
			else{
				$(this.modal_warp).on("click",".btnclose,.close",$.proxy(function(){
					$(_this.modal_warp).modal('toggle');
				},this));
			}
			if($.isFunction(this.settings.afterClosed)){
				$(_this.modal_warp).on('hidden', function () {
					_this.settings.afterClosed();
				});
			}
			if($.isFunction(this.settings.beforeClosed)){
				$(_this.modal_warp).on('hide', function (){
					_this.settings.beforeClosed();
				});
			}
		}
	}
	$.fn.showModal=function(options){
		var settings=$.extend({},defaults,options||{});
		var modal=new ShowModal(settings);
	}
})(jQuery);