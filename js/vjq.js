var $ = (function(){
	// 通过id获取节点
	var getEleById = function(id){
		return document.getElementById(id);
	}
	// 通过className获取节点
    var getElementsByClassName = function(element, names) {
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



})();