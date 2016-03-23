var $ = (function(){
	// 通过id获取节点
	function getEleById(id){
		return document.getElementById(id);
	}
	// 通过className获取节点
    function getEleByClass(element, names) {
	    if (element.getElementsByClassName) { //特性侦测
	      return element.getElementsByClassName(names);
	    } else {
	      var elements = element.getElementsByTagName('*');
	      var result = [];
	      var element,
	          classNameStr,
	          flag;
	      names = names.split(' ');
	      for (var i = 0; element = elements[i]; i++) {
	          classNameStr = ' ' + element.className + ' ';
	          flag = true;
	          for (var j = 0, name; name = names[j]; j++) {
	              if (classNameStr.indexOf(' ' + name + '') == -1){
	                  flag = false;
	                  break;
	              }
	          }
	          if (flag) {
	              result.push(element);
	          }
	      }
	      return result;
	  	}
	}
	// 事件绑定
	function bindEvent(obj, evname, fn) {
		if (obj.addEventListener) {
		  obj.addEventListener(evname, fn, false);
		} else {
		  obj.attachEvent('on' + evname, function() {
		    fn.call(obj);
		  });
		}
	}
	// 获取样式
	function getStyle(obj, name) {
	    if (obj.currentStyle) {
	        return obj.currentStyle[name];
	    } else {
	        return getComputedStyle(obj, false)[name];
	    }
	}
	// 运动相关
	function animateMove(obj, json, fnEnd) {
	    function move() {
	        var bStop = true; //假设：所有值都已经到了
	        for (var attr in json) {
	            var cur = 0;
					if (attr == 'opacity') {
						cur = Math.round(parseFloat(getStyle(obj, [attr])) * 100); //四舍五入
					} else {
						cur = parseInt(getStyle(obj, [attr]));
					};
					var speed = (json[attr] - cur) / 3;
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
				if (bStop == true) { //也可以写成if(bStop)
					clearInterval(obj.timer);				
					if (fnEnd) fnEnd();				
				};
	    };
	    clearInterval(obj.timer);
	    obj.timer = setInterval(move, 30);
	}

	function textContent(obj){
		if(obj.textContent){
			return obj.textContent;
		}else{
			obj.innerText;
		}
	}


	function trim(str){
		return str.replace(/^\s+|\s+$/g,'');
	}













	return {
		getEleById 			: getEleById,
		getEleByClass		: getEleByClass,
		bindEvent			: bindEvent,
		animateMove			: animateMove,
	};


})();