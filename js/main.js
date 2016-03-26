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
	console.log(cookie.rmdCookie);
	if(cookie.rmdCookie){
		msg.style.display='none';
	}

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
	// 遮罩点击隐藏
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