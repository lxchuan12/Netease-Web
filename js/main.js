(function(){

	//不再提醒
	var cookie = $.getCookie();
	var noRmd=$.getEleById('never_remind');
	var msg=$.getEleById('g-msg');
	function closeRmd(){
		$.setCookie('rmdCookie', 1);
		msg.style.display='none';
		// console.log(cookie.rmdCookie);
	}
	// 有bug,待解决
	$.bindEvent(noRmd,'click',closeRmd);
	
	if(cookie.rmdCookie){
		msg.style.display='none';
	}
	//登录弹窗
	var mask=$.getEleById('mask');
	var focus=$.getEleById('focus');
	var loginWrap=$.getEleById('loginWrap');
	var loginClose=$.getEleById('loginClose');
	var followWrap=$.getEleById('followWrap');
	var unfollow=$.getEleById('unfollow');
	// 登录验证
	var login_form = document.forms.login_form;
	var submit = $.getEleById('submit');
	// 登录动作

	//定义显示登录弹窗函数
	function showLogin(){
		mask.style.display='block';
		loginWrap.style.display='block';
	}
	function closeLogin(){
		loginWrap.style.display='none';
		mask.style.display='none';
	}

	function doFollow(){
		$.ajax('http://study.163.com/webDev/attention.htm',{}, function(data){
			if(Number(data) === 1){
				$.setCookie('followSuc', 1);
				focus.style.display = 'none';
				followWrap.style.display = 'inline-block';
				fansNum.innerHTML = Number(fansNum.innerHTML) + 1;
				// $.textContent(fansNum) = Number($.textContent(fansNum)) + 1; 
			}else{
				alert('关注失败');
			}
		});
	};
	function unFollow(){
		$.setCookie('followSuc', 0);
		focus.style.display = 'inline-block';
		followWrap.style.display = 'none';
		fansNum.innerHTML =  Number(fansNum.innerHTML) - 1 + '';
		// $.textContent(fansNum) =  Number($.textContent(fansNum)) - 1 + '';
	};
	function doFocus(){
		if(cookie.loginSuc === '1'){
			doFollow();
			// console.log('1');
		}else{
			showLogin();
			// console.log('2');
		}
	};
	
	
	function doLogin(){
		var userName = login_form['userName'].value;
		var password = login_form['password'].value;
		userName = $.trim(userName);
		password = $.trim(password);
		var requestData = null;
		if(userName === '' || password === '') return false;
		requestData = {
			userName : md5(userName),
			password : md5(password)
		};
		$.ajax('http://study.163.com/webDev/login.htm', requestData,function(data){
			if(Number(data) === 1){
				$.setCookie('loginSuc', 1);
				doFollow();
				closeLogin();
			}else{
				alert('用户名或密码错误');
				closeLogin();
			}
		});
	}

	$.bindEvent(focus,'click',doFocus);
	$.bindEvent(submit,'click',doLogin);
	$.bindEvent(unfollow, 'click', unFollow);
	//隐藏登录弹窗
	$.bindEvent(loginClose,'click',closeLogin);
	// 遮罩点击隐藏
	$.bindEvent(mask,'click',closeLogin);



	//视频弹窗
	var videoImg=$.getEleById('videoImg');
	var videoWin=$.getEleById('videoWin');
	var videoWinClose=$.getEleById('videoWinClose');
	function showVedioWin(){
		mask.style.display='block';
		videoWin.style.display='block';
	}
	function closeVedioWin(){
		if(video.pause){
			video.pause();
		};
		videoWin.style.display='none';
		mask.style.display='none';
	}
	//显示视频弹窗
	$.bindEvent(videoImg,'click',showVedioWin);
	//隐藏视频弹窗，视频暂停
	$.bindEvent(videoWinClose,'click',closeVedioWin);
	// 遮罩点击隐藏，视频暂停
	$.bindEvent(mask,'click',closeVedioWin);


	// 轮播图(不是无缝滚动，是淡入淡出)(类似选项卡)

	var bannerUl=$.getEleById('bannerUl');
	var bannerLi=bannerUl.getElementsByTagName('li');
	var pointer = $.getEleById('pointer');
	var pointer_i = pointer.getElementsByTagName('i');
	
	for( var i=0; i<pointer_i.length; i++ ){
		
		pointer_i[i].index = i;
		
		$.bindEvent(pointer_i[i],'click',function (){
			for(var i=0;i<pointer_i.length;i++){
				pointer_i[i].className='';
				bannerLi[i].style.display="none";
				bannerLi[i].className='';
				
			}
			// $.animateMove(bannerLi[i],{opacity:1},function(){
			// 			console.log('1');
			// 			// bannerLi[i].style.display='none';
			// 		})
			var that=this.index;
			if(that>2){
				that=0;
			}
			this.className = "z-crt";
			bannerLi[that].className='z-crt';
			// bannerLi[that].style.display='block';
			// bannerLi[that].style.opacity=0.3;

			$.animateMove(bannerLi[that],{opacity:0.3},function(){
						
					bannerLi[that].style.display='block';

			})
		});
	}
	
	

	// 最热排行
	var hotRank = $.getEleById('hotRank');
	var hotRankUl = $.getEleById('hotRankUl');
	var hotRankUlList = hotRankUl.getElementsByTagName('li');
	// var hotRankUl2 = $.getEleById('hotRankUl2');
	var hotRankLi = null;
	var hotRankUlMove = function(data){
		hotRankLi = JSON.parse(data);
		var html = '';
		var html2 = '';
		//最热排行向上滚动动画
		function listMove(){
			// var from_1 ,from_2, to_1, to_2;
			// from_1= parseInt(hotRankUl.style.top);
			// if(from_1 <= -701) from_1 = 701;
			// to_1 = from_1 - 70;
			// from_2 = parseInt(hotRankUl2.style.top);
			// if(from_2 <= -701) from_2 = 701;
			// to_2 = from_2 - 70;
			// $.animateMove(hotRankUl, {top:30});
			// // $.animateMove(hotRankUl2, 'top', from_2, to_2, 300);

		var oneSize=hotRankUlList[0].offsetHeight+20;

		var iNum=20;
		var bBtn=true;
		function getHeight(){
			hotRankUl.style.Height=(hotRankUlList.length-1)*oneSize+'px';
		};
		getHeight();
		function moveList(){
			if(bBtn){
				bBtn=false;
				for (var i = 0; i < iNum; i++) {
					var oLi=hotRankUlList[i].cloneNode(true);
					hotRankUl.appendChild(oLi);
					getHeight();
				};
				$.animateMove(hotRankUl,{top:-iNum*oneSize},function(){
					
					for (var i = 0; i < iNum; i++) {
						hotRankUl.removeChild(hotRankUlList[0]);
						hotRankUl.style.top=0;
					};
					bBtn=true;
				});

			}
		}
		moveList();
		};
		//生成html
		for(var i = 0; i < 20; i++){
			var item = hotRankLi[i];
			var str = '<li class="hotRankLi clearfix">'
					+'			<img src="'+item.smallPhotoUrl+'" alt="背景">'
					+'			<div class="hotRankInfo"><a href="#">'+item.name+'</a>'
					+'			<p class="person"><span></span>'+item.learnerCount+'</p></div>'
					+'</li>';
			// if(i < 10){
			// 	html += str;
			// }else{
			// 	html2 += str;
			// }
			html+=str;
		}
		
		hotRankUl.innerHTML = html;
		// hotRankUl2.innerHTML = html2;
		var listTimer = setInterval(listMove,50);
		$.bindEvent(hotRank, 'mouseover', function(e){
			clearInterval(listTimer);
		});
		$.bindEvent(hotRank, 'mouseout', function(e){
			listTimer = setInterval(listMove,50);
		});
	};
	$.ajax('http://study.163.com/webDev/hotcouresByCategory.htm',{}, hotRankUlMove);









})();