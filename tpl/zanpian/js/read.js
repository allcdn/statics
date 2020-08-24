var hv = $(".info dl:eq(7)");
if (hv.find('span').html() == '1900') {
	hv.find('span').html('2000年前');
};
var hadpingfen = 0;
function stars(r) {
	var curstars = parseInt(r.mystars);
	$("#pa").html(r['curpingfen'].a + "人");
	$("#pb").html(r['curpingfen'].b + "人");
	$("#pc").html(r['curpingfen'].c + "人");
	$("#pd").html(r['curpingfen'].d + "人");
	$("#pe").html(r['curpingfen'].e + "人");
	var totalnum = parseInt(r['curpingfen'].a) + parseInt(r['curpingfen'].b)
			+ parseInt(r['curpingfen'].c) + parseInt(r['curpingfen'].d)
			+ parseInt(r['curpingfen'].e);
	if (totalnum > 0) {
		$("#pam").css("width",((parseInt(r['curpingfen'].a) / totalnum) * 100) + "%");
		$("#pbm").css("width",((parseInt(r['curpingfen'].b) / totalnum) * 100) + "%");
		$("#pcm").css("width",((parseInt(r['curpingfen'].c) / totalnum) * 100) + "%");
		$("#pdm").css("width",((parseInt(r['curpingfen'].d) / totalnum) * 100) + "%");
		$("#pem").css("width",((parseInt(r['curpingfen'].e) / totalnum) * 100) + "%")
	};
	
	
	if (r['hadpingfen'] != undefined && r['hadpingfen'] != null) {hadpingfen = 1;}
	var PFbai = r['curpingfen'].pinfen*10;
	if (PFbai > 0) {
		$("#rating-main").show();
		$("#rating-kong").hide();
		//		$("#fenshu").css('width', parseInt(PFbai) + "%");
		//		$("#total").css('width', parseInt(PFbai) + "%");
		$("#fenshu").animate({'width': parseInt(PFbai) + "%"});
		$("#total").animate({'width': parseInt(PFbai) + "%"});
		$("#pingfen").html(r['curpingfen'].pinfen);
		$("#pingfen2").html(r['curpingfen'].pinfen);
		
	} else {
		$("#rating-main").hide();
		$("#rating-kong").show();
		$(".loadingg").addClass('nopingfen').html('暂时没有人评分，赶快从右边打分吧！');
	};
	if (r['loveid'] != null) {
		$(".interest-sect .sect-btn").hide();
		$(".interest-sect .sect-show").show();
		$(".loveidbox .sect-btn").hide();
		$(".loveidbox .sect-show").show();
	} else {
		$(".interest-sect .sect-btn").show();
		$(".interest-sect .cancel").hide();
		$(".loveidbox .sect-btn").show();
		$(".loveidbox .cancel").hide();
	}
	if (r['remindid'] != null) {
		$(".interest-rss .rss-btn").hide();
		$(".interest-rss .rss-show").show();
		$(".remind .rss-btn").hide();
		$(".remind .rss-show").show();
	} else {
		$(".interest-rss .rss-btn").show();
		$(".interest-rss .del").hide();
		$(".remind .rss-btn").show();
		$(".remind .del").hide();
	}
	if (curstars > 0) {
		var curnum = curstars - 1;
		$("ul.rating li:lt(" + curnum + ")").addClass("current");
		$("ul.rating li:eq(" + curnum + ")").addClass("current");
		$("ul.rating li:gt(" + curnum + ")").removeClass("current");
		var arr = new Array('很差', '较差', '还行', '推荐', '力荐');
		$("#ratewords").html(arr[curnum]);
	}
};
function login_form() {
    $.colorbox({
        inline: true,
        href: "#login-dialog",
        width: '570px'

    });

};	   
$("#qqlogin,#weibologin").click(function(e) {
	var url = $(this).attr("url");
	var t = $(this).attr("t");
	if(t==1){
	 window.open(url,"_blank","width=750, height=425");
	}
	 setTimeout(function(){
		qr.gu({ubox: "unm",rbox: "innermsg",h3: "h3",logo: "userlogo"});
		try {
		PlayHistoryObj.viewPlayHistory("playhistory")
		} catch (b) {}
		$("#cboxClose").trigger("click")
     },5000)		
});	
$("#up,#down").click(function(e) {
	opp($(this).attr('data'), $(this));
	return false ;
});		   
$("#comm_txt,.tanmu_l #comm_txt").focus(function(e) {	
	if (!checkcookie()) {
		login_form();
		return false;
	}
});
$("#loginbt").click(function(e) {
	userlogin();
});
$("#subcomm").click(function(e) {
	var id=$("#comment").data('id');
	var sid=$("#comment").data('sid');						 
	$("#commform").qiresub({
		curobj : $("#subcomm"),
		txt : '数据提交中,请稍后...',
		onsucc : function(result) {
			$.hidediv(result);
			if (parseInt(result['code']) > 0) {
				pagegoo(Root + "index.php?s=home/ajax/cm/id/" + id + "/sid/" + sid) ;
			}else{
				$("#validatecm .validate").trigger("click")
			}
		}
	}).post({
		url : Root + 'index.php?s=home/ajax/addcm/sid/'+sid+'/id/'+id
	});
	return false;
});		
$('#login_validate,#reg_validate,#gb_validate').focus(function(){ 	
  $('#'+$(this).attr("id")+"_img").trigger('click');
}); 
$(document).on("click", "#login_validate_img,#reg_validate_img,#gb_validate_img", function(e) {
	$('#'+$(this).attr("id")).html('<img src="'+Root +'index.php?s=user-login-verify-' + Math.random()+'" />'); 									
});
$("#register").click(function(e) {
	userreg();
});
$(document).ready(function(){
var id=$("#comment").data('id');
var sid=$("#comment").data('sid');	
if (id != undefined && id != null && id != '' && sid != undefined && sid != null && sid != '' && Cm != undefined && Cm != null && Cm != '') {
//如果同时需要评分并加载
if($('#zanpian-score').length > 0){
	
	 pagegoo(Root + "index.php?s=/home/ajax/get/id/" + id + "/sid/" + sid);
}else{
	 pagegoo(Root + "index.php?s=/home/ajax/cm/id/" + id + "/sid/" + sid);	
}
}

})
function pagegoo(url) {
	$.ajax({
		url : url,
		success : function(data) {
			if(data.ajaxtxt != '') {
				if ($('#commbox li').length > 3)
					$("html,body").animate({
						scrollTop : $("#commbox").offset().top - 130
					}, 1000);
				
					$("#commbox").empty().html(data.comment);
					$("#data").empty().html(data);
					$("#commnum,#commnums").html(jQuery('#comment-count',data.comment).html());
					$(".digg a").click(function(e) {
						opp($(this).data('url'),$(this));
						return false ;
					});				
					$(".reply").click(function(e) {				   
						var curid = $(this).attr('data-id');
						var curpid = $(this).attr('data-pid');
						var curtid = $(this).attr('data-tid');
						var curtuid = $(this).attr('data-tuid');
						var curvid = $(this).attr('data-vid');
						var cursid = $(this).attr('data-sid');
						if (!checkcookie()) {
							login_form();
							return false;
						}else{
							if ($("#rep" + curid).html() != '') {
								$("#rep" + curid).html('');
							} else {
								$(".comms").html('');
								$("#rep" + curid).html($("#hidcommform").html());
                                $(".emotion").on('click', function(){							   
                                 var left = $(this).offset().left;
                                 var top = $(this).offset().top;
                                 var id = $(this).attr("data-id");
                                 $("#smileBoxOuter").css({
                                  "left": left,
                                  "top": top + 20
                                  }).show().attr("data-id", id)
                                });
								$("#rep" + curid + " #comm_pid").val(curpid); //顶级ID
								$("#rep" + curid + " #comm_id").val(curid); //回贴ID
								$("#rep" + curid + " #comm_tid").val(curtid); //回贴ID
								$("#rep" + curid + " #comm_tuid").val(curtuid); //回贴用户ID
								$("#rep"+ curid+ " #comm_sid").val(cursid);
								$("#rep"+ curid+ " #comm_vid").val(curvid);
								$("#rep" + curid + " #row_id").attr("data-id", curid)
								$("#rep" + curid + " .recm_id").attr("id", 'reply_' + curid)
								$("#rep" + curid + " .sub").unbind();
								$("#rep" + curid + " .sub").click(function(e) {
									$("#rep"+ curid+ " #mcommform").qiresub({
										curobj : $("#rep"+ curid+ " .sub"),
										txt : '数据提交中,请稍后...',
										onsucc : function(result) {
											$.hidediv(result);
											if (parseInt(result['code']) > 0) {
												pagegoo(url) ;
											}else{
												$("#validaterecm .validate").trigger("click")
											}
										}
									}).post({
										url : Root + 'index.php?s=/home/ajax/addrecm'
									});
								});
							}
						}
					});
			} else {
				$("#datalist").html('<li class="kong">当前没有评论，赶紧抢个沙发！</li>');
			};
			$("#pages").html(data.pages);
			$("#pagetop").html(data.pagetop);
	
			if (data.gold != undefined && data.gold != null) {
				stars(data.gold);
			};	
			$(".commpage a,.ajax-page ul a").click(function(e) {
				var pagegourl = $(this).attr('href');
				pagegoo(pagegourl);
				return false;
			});
			
		},dataType : 'json'
	});
	return false;
};
function opp(url,thisobj) {
	$.showfloatdiv({
		txt : '数据提交中...',
		cssname : 'loading'
	});
	$.get(url, function(r) {
		$.hidediv(r);
		if (parseInt(r.code) > 0) {
			thisobj.children('strong').html(parseInt(thisobj.children('strong').html()) + 1)
		}
	}, 'json');
};

$(".view-filter a").click(function(e) {
	$(this).prevAll().removeClass('current');
	$(this).nextAll().removeClass('current');
	$(this).addClass('current');
	pagegoo($(this).attr('data') + "-id-" + Id);
	return false;
});
function delcomm(url) {
	$.showfloatdiv({
		txt : '数据提交中...',
		cssname : 'loading'
	});
	$.get(url, function(r) {
		$.hidediv(r);
		if (parseInt(r.code) > 0) {
			$("#li" + r.id).remove()
		}
	}, 'json')
}
function vip_callback($vod_id, $vod_sid, $vod_pid, $status, $trysee, $tips){
		if($status != 200){
			if($trysee > 0){
				window.setTimeout(function(){
					$.get(Root+'index.php?s=/home/vod/vip/type/trysee/id/'+$vod_id+'/sid/'+$vod_sid+'/pid/'+$vod_pid, function(html){
						$("#zanpiancms-player-vip").html(html);
					},'html');
				},1000*60*$trysee);
			}else{
				$('#zanpiancms-player-vip .zanpiancms-player-box').html($tips);
				$('#zanpiancms-player-vip .zanpiancms-player-iframe').hide();
			}
			//播放你密码
			$('body').on("click","#player-pwd",function(){
				$(this).html('Loading...');
				$pwd=$(".password").val();
				$.get(Root+'index.php?s=/home/vod/vip/type/pwd/id/'+$vod_id+'/sid/'+$vod_sid+'/pid/'+$vod_pid+'/pwd/'+$pwd, function(json){
					if(json.status == 200){
						location.reload();
					}else{
						$(this).html('播放');
						alert('密码错误或失效,请重新回复');
					}
				},'json');
			});	
			//支付影币按钮
			$('body').on("click","#player-price",function(){
				$(this).html('Loading...');
				$.get(Root+'index.php?s=/home/vod/vip/type/ispay/id/'+$vod_id+'/sid/'+$vod_sid+'/pid/'+$vod_pid, function(json){
					if(json.status == 200){
						location.reload();
					}else if(json.status == 500 || json.status == 501){
						login_form();
					}else{
						$('#zanpiancms-player-vip').html(json.info);
					}
				},'json');
			});				
		}else{
			//拥有VIP观看权限
		}
}
$(document).ready(function(){
$('body').on("click","#loginbarx,#user-login,#player-login",function(){												 
	if (!checkcookie()) {
		login_form();
		return false;
	}
});	
		//重新发送邮件
		$('body').on("click", "#send", function() {	
			var ac = $('input[name="ac"]').val();	
			var to = $('input[name="to"]').val();
			if(ac=='mobile'){
			    if ("" == to){$.showfloatdiv({
				     txt: "请输入手机号码"
			    }), $("#to").focus(), $.hidediv({});
			         return false;
			    }
                var pattern=/^[1][0-9]{10}$/;
                var ex = pattern.test(to);			
			    if (!ex) {$.showfloatdiv({
				    txt: "手机号格式不正确"
			    }), $("#to").focus(), $.hidediv({});
			        return false;
			    }
			}else if(ac=='email'){
			    if ("" == to){$.showfloatdiv({
				     txt: "请输入邮箱"
			    }), $("#to").focus(), $.hidediv({});
			         return false;
			    }
                var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                var exs = pattern.test(to);			
			    if (!exs) {$.showfloatdiv({
				    txt: "邮箱格式不正确"
			    }), $("#to").focus(), $.hidediv({});
			        return false;
			    }				
			}
			var obj = $(this);
			$(this).closest('form').qiresub({
				curobj: $(this),
				txt: "数据提交中,请稍后...",
				onsucc: function(a) {
					if ($.hidediv(a), parseInt(a["code"]) > 0) {
						settime(obj)
					}else{

					}
				}
			}).post({
				url: Root + "index.php?s=/user/reg/send/"
			}), !1;
		});	
//订单付款界面						   
$('body').on("click","#user-score-payment",function(){	
	 payment();
});
//购买VIP界面
$('body').on("click","#ispay-vip",function(){
    $.colorbox({
        href: Root+'index.php?s=/user/center/buy',
    });
});
//支付VIP影币
$('body').on("click","#pay_vip",function(){								 
   $(".form-horizontal").qiresub({
			curobj: $("#pay_vip"),
			txt: "数据提交中,请稍后...",
			onsucc: function(a) {
				if($.hidediv(a),parseInt(a["code"])  > 0) {
					qr.gu({
						ubox: "unm",
						rbox: "innermsg",
						h3: "h3",
						logo: "userlogo"
					});
				$("#cboxClose").trigger("click")
				 location.reload();
				}
				if($.hidediv(a),parseInt(a["code"]) == -2){
				 payment();
				}
				else - 3 == parseInt(a["code"])
			}
		}).post({
			url: Root + "index.php?s=/user/center/buy"
		}), !1;
	
});
//购买VIP界面
$('body').on("click","#pay_card",function(){
     payment_card();
});
$('body').on("click","#payment_card",function(){								 
   $(".form-horizontal").qiresub({
			curobj: $("#payment_card"),
			txt: "数据提交中,请稍后...",
			onsucc: function(a) {
				if($.hidediv(a),parseInt(a["code"])  > 0) {
					qr.gu({
						ubox: "unm",
						rbox: "innermsg",
						h3: "h3",
						logo: "userlogo"
					});
				$("#cboxClose").trigger("click")
				 location.reload();
				}
				if($.hidediv(a),parseInt(a["code"]) == -2){
				 payment();
				}
				else - 3 == parseInt(a["code"])
			}
		}).post({
			url: Root + "index.php?s=/user/payment/card"
		}), !1;
	
});


})
function payment(){
	 $.colorbox({
        href: Root+'index.php?s=/user/payment/index/',
    });
}
function payment_card(){
	 $.colorbox({
        href: Root+'index.php?s=/user/payment/card',
    });
}
function player_iframe(){
		if($("#zanpiancms-player-vip").length>0){
			self.location.reload();
		}
}
    var countdown=60;
    function settime(val) {
        if (countdown == 0) {
			val.addClass('send-success').prop('disabled', false);
            val.val("获取验证码");
            countdown = 60;
            return true;
        } else {
			val.removeClass('send-success').prop('disabled', true);
			val.val("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function() {settime(val) },1000)
    }
$('body').on('click', 'img.validate', function(){
			$(this).attr("src",verify());
		});	
function verify(){
		return Root +'index.php?s=/home/verify/index/' + Math.random();
}