(function(){

	//不再提醒
	var noRmd=$.getEleById('never_remind');
	var msg=$.getEleById('g-msg');
	$.bindEvent(
		noRmd,'click',function(){
			$.setCookie('rmdCookie', 1);
			msg.style.display='none';
		}
	);
	//有bug,待解决
	// console.log(cookie.rmdCookie);
	// if(cookie.rmdCookie){
	// 	msg.style.display='none';
	// }

	//登录弹窗
	var mask=$.getEleById('mask');
	var loginWrap=$.getEleById('loginWrap');
	var focus=$.getEleById('focus');
	var loginClose=$.getEleById('loginClose');
	//显示登录弹窗
	$.bindEvent(
		focus,'click',function(){
			mask.style.display='block';
			loginWrap.style.display='block';
		}
	);
	// 登录验证
	var login_form = document.forms.login_form;
	var submit = $.getEleById('submit');
	// 登录动作
	function do_login(){
		var userName = loginForm['userName'].value;
		var password = loginForm['password'].value;
		userName = $.trim(userName);
		password = $.trim(password);
		var reqData = null;
		if(userName === '' || password === '') return false;
		requestData = {
			userName : md5(userName),
			password : md5(password)
		};
		console.log(requestData);
		$.ajax('http://study.163.com/webDev/login.htm', requestData,function(data){
			if(Number(data) === 1){
				$.setCookie('loginSuc', 1);
				console.log('11');
				// follow();
				// closeLogin();
			}else{
				alert('用户名或密码有误');
				// closeLogin();
			}
		});
	}
	$.bindEvent(submit,'click',do_login);

	//隐藏登录弹窗
	$.bindEvent(
		loginClose,'click',function(){
			loginWrap.style.display='none';
			mask.style.display='none';

		}
	);
	// 遮罩点击隐藏
	$.bindEvent(
		mask,'click',function(){
			loginWrap.style.display='none';
			mask.style.display='none';
		}
	);
	//视频弹窗
	var videoImg=$.getEleById('videoImg');
	var videoWin=$.getEleById('videoWin');
	var videoWinClose=$.getEleById('videoWinClose');
	//显示视频弹窗
	$.bindEvent(
		videoImg,'click',function(){
			mask.style.display='block';
			videoWin.style.display='block';
		}
	);
	//隐藏视频弹窗
	$.bindEvent(
		videoWinClose,'click',function(){
			videoWin.style.display='none';
			mask.style.display='none';
		}
	);
	// 遮罩点击隐藏，视频暂停
	$.bindEvent(
		mask,'click',function(){
			if(video.pause){
				video.pause();
			};
			videoWin.style.display='none';
			mask.style.display='none';
		}
	);









})();