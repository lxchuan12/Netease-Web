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
	// 谷歌下刷新有bug,cookie失效。待解决
	$.bindEvent(noRmd,'click',closeRmd);
	// console.log(cookie.rmdCookie);
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
		
		// $.animateMove(pointer_i[i],{opacity:0},function(){
		// 				console.log('1');
		// 				// bannerLi[i].style.display='none';
		// 			})
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
			bannerLi[that].style.display='block';
			// bannerLi[that].style.opacity=0.3;

			// $.animateMove(bannerLi[that],{opacity:1},function(){
						
			// 		bannerLi[that].style.display='block';

			// })
		});
	}
	
	


	//课程列表详情
	var courseListUlDetail = $.getEleById('courseListUl');
	var courseListUlDetail2 = $.getEleById('courseListUl2');
	var pagesUl = $.getEleById('pagesUl');
	var design = $.getEleById('design');
	var develop = $.getEleById('develop');
	var courseList = null;
	var reqData = {
		pageNo : 1,
		psize :20,
		type : 10
	};
	function courseFunc(data){
		courseList =  JSON.parse(data);
		var list = courseList.list;
		var html = '';
		for (var i = 0, l = list.length; i < l; i++){
			var item = list[i];
			var price = item.price || '免费';
			if( typeof price !== 'string') {
				price = '&yen;' + price;
			}
			html += '<li class="courseLi">'
					+ '<img src="'+ item.bigPhotoUrl +'" alt="'+ item.name +'">'
					+ '<a href="">'+ item.name +'</a>'
					+ '<p class="org">'+ item.provider +'</p>'
					+ '<p class="peopleNum"><span></span>'+ item.learnerCount +'</p>'
					+ '<span class="price">'+ price +'</span>'
					+ '<div class="courseDetail">'
					+ '		<div class="clearfix">'
					+ '			<div class="pic"><img src="'+ item.bigPhotoUrl +'" alt="'+ item.name +'"></div>'
					+ '			<div class="content">'
					+ '				<h3>'+ item.name +'</h3>'
					+ '				<div class="learnCount"><span>'+ item.learnerCount +'</span>人在学</div>'
					+ '				<div class="provider">发布者 : '+ item.provider +'</div>'
					+ '				<div>分类 : '+ item.categoryName +'</div>'
					+ '			</div>'
					+ '		</div>'
					+ '		<p>'+ item.description +'</p>'
					+ '	</div>';
		}
		//分页器
		var pages = '';
		var pageObj = $.getPage(courseList.totalPage, 8, courseList.pagination.pageIndex);
		pages += '<li class="pagesLi"><a href="#" class="prev" index="'+ pageObj.prevIndex +'"><</a></li>';

		for(var j = pageObj.startIndex, len = pageObj.lastIndex; j <= len; j++){

			var pagehtml = '<li class="pagesLi"><a href="#" index="'+ j +'">'+ j +'</a></li>';
			if( j === courseList.pagination.pageIndex){
				pagehtml = '<li class="pagesLi"><a href="#" index="'+ j +'" class="z-crt">'+ j +'</a></li>';
			}
			pages += pagehtml;
		}
					
		pages += '<li class="pagesLi"><a href="#" class="next" index="'+ pageObj.nextIndex +'">></a></li>';
		pagesUl.innerHTML = pages;
		courseListUlDetail.innerHTML = html;
		courseListUlDetail2.innerHTML = html;
	};
	$.ajax('http://study.163.com/webDev/couresByCategory.htm',reqData, courseFunc);
	$.bindEvent(develop, 'click',function(){
		design.className = '';
		develop.className = 'z-crt';
		reqData.type = 20;
		$.ajax('http://study.163.com/webDev/couresByCategory.htm',reqData, courseFunc);
	});
	$.bindEvent(design, 'click',function(){
		develop.className = '';
		design.className = 'z-crt';
		reqData.type = 10;
		$.ajax('http://study.163.com/webDev/couresByCategory.htm',reqData, courseFunc);
	});

	// 分页器绑定点击事件
	$.bindEvent(pagesUl, 'click', function(ev){
			var oEvent=ev||event;
			// 事件委托 ie下srcElement
			var target=oEvent.srcElement||oEvent.target;
			$.preventDefault(oEvent);
			var index = parseInt(target.getAttribute('index'));
			if(index){
				reqData.pageNo = index;
				$.ajax('http://study.163.com/webDev/couresByCategory.htm',reqData, courseFunc);
			}
		});
	// // 产品设计-编程语言，选项卡

	// var navUl=$.getEleById('navUl');
	// var navLi=navUl.getElementsByTagName('li');
	// var courseListUlWrap = $.getEleById('courseListUlWrap');
	// var courseListUl = courseListUlWrap.getElementsByTagName('ul');
	
	// for( var i=0; i<navLi.length; i++ ){
		
	// 	navLi[i].index = i;
		
	// 	$.bindEvent(navLi[i],'click',function (){
	// 		for(var i=0;i<navLi.length;i++){
	// 			navLi[i].className='';
	// 			courseListUl[i].style.display="none";
	// 			reqData.type = 20;
	// 			$.ajax('http://study.163.com/webDev/couresByCategory.htm',reqData, courseFunc);
	// 		}
	// 		this.className = "z-crt";
	// 		reqData.type = 10;
	// 		$.ajax('http://study.163.com/webDev/couresByCategory.htm',reqData, courseFunc);
	// 		courseListUl[this.index].style.display="block";
	// 	});
	// }


	// 分页器
	/*var pages = $.getEleById('pages');
	var pagesUl = $.getEleById('pagesUl');
	// 事件委托
	function SwitchPages(ev){
		var oEvent=ev||event;
		var target=oEvent.srcElement||oEvent.target;

		if(target.nodeName.toLowerCase()=='a'){
				target.className='z-crt';
		}
	}
	// function leavePages(ev){
	// 	var oEvent=ev||event;
	// 	var target=oEvent.srcElement||oEvent.target;

	// 	if(target.nodeName.toLowerCase()=='a'){
	// 			target.className='';
	// 	}
	// }
	
	// $.bindEvent(pagesUl,'mouseout',leavePages);
	$.bindEvent(pagesUl,'click',SwitchPages);*/




	// 最热排行
	var hotRankUl = $.getEleById('hotRankUl');
	var hotRankUlList = hotRankUl.getElementsByTagName('li');
	var hotRankLi = null;

	function hotRankUlMove(data){
		hotRankLi = JSON.parse(data);
		var html = '';
		//每次向上移动一个，无缝滚动
		
		//innerHTML
		for(var i = 0; i < 20; i++){
			var item = hotRankLi[i];
			var str = '<li class="hotRankLi clearfix">'
					+'		<img src="'+item.smallPhotoUrl+'" alt="背景">'
					+'		<div class="hotRankInfo"><a href="#">'+item.name+'</a>'
					+'		<p class="person"><span></span>'+item.learnerCount+'</p></div>'
					+'</li>';
			html+=str;
		}
		
		hotRankUl.innerHTML = html;
		
	};
	$.ajax('http://study.163.com/webDev/hotcouresByCategory.htm',{}, hotRankUlMove);
	function listMove(){
		var oneSize=hotRankUlList[0].offsetHeight+20;
		var iNum=1;
		var bBtn=true;
		function getHeight(){
			hotRankUl.style.height=(hotRankUlList.length-1)*oneSize+'px';
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
				$.animateMove(hotRankUl,{top:-oneSize},function(){
					
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
	var listMoveTimer = setInterval(listMove,5000);
	$.bindEvent(hotRankUl, 'mouseover', function(){
		clearInterval(listMoveTimer);
	});
	$.bindEvent(hotRankUl, 'mouseout', function(){
		listMoveTimer = setInterval(listMove,5000);
	});






	//响应式
	
	var g_courseList = $.getEleById('g-courseList');
	var m_courseList = $.getEleById('m-courseList');
	var size_courseListUl = $.getEleById('courseListUl');
	var setmin = false;
	var setmax = false;
	function changeWidth(){
		var w = document.body.clientWidth || document.documentElement.clientWidth;
		if(w < 1205){
			if(!setmin){
				g_courseList.style.width = '962px';
				m_courseList.style.width = '735px';
				size_courseListUl.style.width = '735px';
				reqData.psize = 15;
				$.ajax('http://study.163.com/webDev/couresByCategory.htm',reqData, courseFunc);
				setmin = true;
				setmax = false;
			}
		} else {
			if(!setmax){
				g_courseList.style.width = '1206px';
				m_courseList.style.width = '980px';
				size_courseListUl.style.width = '980px';
				reqData.psize = 20;
				$.ajax('http://study.163.com/webDev/couresByCategory.htm',reqData, courseFunc);
				setmax = true;
				setmin = false;
			}
		}
	};
	$.bindEvent(window, 'resize', changeWidth);





})();