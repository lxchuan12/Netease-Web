var $ = (function(){
	/**
	 * [getEleById 通过id获取元素]
	 * @param  {[type]} id [id]
	 */
	function getEleById(id){
		return document.getElementById(id);
	}
	
	/**
	 * [bindEvent 事件绑定]
	 * @param  {[type]}   obj    [元素节点]
	 * @param  {[type]}   evname [事件名称]
	 * @param  {Function} fn     [回调函数]
	 */
	function bindEvent(obj, evname, fn) {
		if (obj.addEventListener) {
		  obj.addEventListener(evname, fn, false);
		} else{
		  obj.attachEvent('on' + evname, function() {
		    fn.call(obj);
		  });
		}
	}
	/**
	 * 获取样式
	 * @param  {[type]} obj  [元素节点]
	 * @param  {[type]} name [样式]
	 * @return {[type]}      [description]
	 */
	function getStyle(obj, name) {
	    if (obj.currentStyle) {
	        return obj.currentStyle[name];
	    } else {
	        return getComputedStyle(obj, false)[name];
	    }
	}
	/**
	 * 运动
	 * @param  {[type]} obj   [元素]
	 * @param  {[type]} json  [样式json]
	 * @param  {[type]} fnEnd [回调函数]
	 */
	function animateMove(obj, json, fnEnd) {
	    function move() {
	        var bStop = true; //假设：所有值都已经到了
	        for (var attr in json) {
	            var cur = 0;
					if (attr == 'opacity') {
						cur = Math.round(parseFloat(getStyle(obj, attr)) * 100); //四舍五入
					} else {
						cur = parseInt(getStyle(obj, attr));
					};
					var speed = (json[attr] - cur) / 10;
					//记得取整
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);	
					if (cur != json[attr]) {	
						bStop = false;
					};	
					if (attr == 'opacity') {
						obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
						obj.style.opacity = (cur + speed) / 100;					
					} else {	
						obj.style[attr] = cur + speed + 'px';	
					};
	        };
				if (bStop == true) {
					clearInterval(obj.timer);			
					if (fnEnd) fnEnd();				
				};
	    };
	    clearInterval(obj.timer);
	    obj.timer = setInterval(move, 50);
	}


	/**
	 * 获取cookie
	 * @return {[object]} [cookie]
	 */
	function getCookie() {
	    var cookie = {};
	    var all = document.cookie;
	    if (all === '') return cookie;
	    var list = all.split('; ');
	    for (var i = 0, len = list.length; i < len; i++) {
	        var item = list[i];
	        var p = item.indexOf('=');
	        var name = item.substring(0, p);
	        name = decodeURIComponent(name);
	        var value = item.substring(p + 1);
	        value = decodeURIComponent(value);
	        cookie[name] = value;
	    }
	    return cookie;
	};
	/**
	 * [setCookie 设置cookie]
	 * @param {[type]} name    [cookie名]
	 * @param {[type]} value   [cookie值]
	 * @param {[type]} expires [失效时间]
	 * @param {[type]} path    [作用路径]
	 * @param {[type]} domain  [作用域]
	 * @param {[type]} secure  [https协议时生效]
	 */
	function setCookie(name, value, expires, path, domain, secure) {
    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires)
        cookie += '; expires=' + expires.toGMTString();
    if (path)
        cookie += '; path=' + path;
    if (domain)
        cookie += '; domain=' + domain;
    if (secure)
        cookie += '; secure=' + secure;
    document.cookie = cookie;
	};
	/**
	 * [trim 去除空格]
	 * @param  {[type]} str [字符串]
	 * @return {[type]}     [description]
	 */
	function trim(str){
		return str.replace(/^\s+|\s+$/g,'');
	}
	/**
	 * [preventDefault 阻止默认事件]
	 * @param  {[type]} event [事件对象]
	 * @return {[type]}       [description]
	 */
	function preventDefault(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}
	/**
	 * [ajax 异步加载]
	 * @param  {[type]}   url      [请求地址]
	 * @param  {[type]}   options  [请求的参数]
	 * @param  {Function} callback [回调函数]
	 */
	function ajax(url,options,callback){
	    function createXHR(url){
	        var xhr = new XMLHttpRequest();
	        if('withCredentials' in xhr){
	        	xhr.open('GET', url, true);
	        }else if(typeof XDomainRequest != 'undefined'){
	        	var xhr = new XDomainRequest();
	        	xhr.open('GET', url);
	        }else{
	        	xhr = null;
	        }
	        return xhr;
	    };

	    function serialize(data){
	        if(!data) return '';
	        var pairs = [];
	        for(var name in data){
	            if(!data.hasOwnProperty(name)) continue;
	            if(typeof data[name] === 'function') continue;
	            var value=data[name].toString();
	            name = encodeURIComponent(name);
	            value = encodeURIComponent(value);
	            pairs.push(name +'='+ value);
	        }
	        return pairs.join('&');
	    };
	    var requestURL = url + '?' +serialize(options);
	    var xhr=createXHR(requestURL);
	   	if(xhr){
	   		xhr.onload=function(){
	             if(callback){
	             	callback(xhr.responseText);
	             };
			};
	     xhr.send(null);
	   	}

	   
    }

    function getPage(totalPage, size, pageNow){
	    var prevIndex,  startIndex, lastIndex, nextIndex;
		var pageGroup = Math.ceil(totalPage/size);
		for(var i = 1; i < pageGroup; i++){
			if(pageNow <= i*size){
				startIndex = (i - 1)*size + 1;
				break;
			}
		}
	    lastIndex = startIndex + size - 1;
	    lastIndex = (lastIndex > totalPage) ? totalPage : lastIndex;

	    if(startIndex === 1){
	    	prevIndex = 0;
	    }else{
			prevIndex = startIndex - 1;
	    }

	    if(lastIndex === totalPage){
	    	nextIndex = 0;
	    }else{
			nextIndex = lastIndex + 1;
	    }
	     
	   
	   	return {
	   		prevIndex : prevIndex,
	   		nextIndex : nextIndex,
    		startIndex : startIndex,
       		lastIndex : lastIndex
	    };
    };










	return {
		getEleById 			: getEleById,
		bindEvent			: bindEvent,
		animateMove			: animateMove,
		getCookie			: getCookie,
		setCookie			: setCookie,
		trim				: trim,
		preventDefault		: preventDefault,
		ajax				: ajax,
		getPage				: getPage

	};


})();