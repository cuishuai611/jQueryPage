/**
 * jQuery.page 1.0
 *
 * ��ˢ�·�ҳjQuery��չ
 *  
 * author : Mr Cui
 *
 * ��λͬ������,��ӭָ������,��ϵQQ��764028466
 *
 */
;(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				args.backFn(args.current);
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//���html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				//��һҳ
				if(args.current > 1){
					obj.append('<a href="javascript:void(0);" class="prevPage">��һҳ</a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled">��һҳ</span>');
				}
				//�м�ҳ��
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<a href="javascript:void(0);" class="tcdNumber">'+1+'</a>');
				}
				if(args.current > 4 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:void(0);" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 1 < args.pageCount && args.current >= 1 && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<a href="javascript:void(0);" class="tcdNumber">'+args.pageCount+'</a>');
				}
				//��һҳ
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:void(0);" class="nextPage">��һҳ</a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled">��һҳ</span>');
				}
			})();
		},
		//���¼�
		bindEvent:function(obj,args){
			return (function(){
				obj.off("click");
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).text());
					ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
				});
				//��һҳ
				obj.on("click","a.prevPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1);
					}
				});
				//��һҳ
				obj.on("click","a.nextPage",function(){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
				});
			})();
		}
	};
	$.fn.createPage = function(options){
		options.pageCount = Math.ceil(options.total/options.limit);
		var args = $.extend({
			current : 1,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);