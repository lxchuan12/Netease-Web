(function(){

	//不再提醒
	var noRmd=$.getEleById('never_remind');
	var msg=$.getEleById('g-msg');
	$.bindEvent(
		noRmd,'click',function(){

			msg.style.display='none';

		}
	);
	var mask=$.getEleById('g-msg');
	var loginWrap=$.getEleById('loginWrap');
	var focus=$.getEleById('focus');
	
	$.bindEvent(
		focus,'click',function(){
			mask.style.display='display';
			loginWrap.style.display='display';

		}
	);




})();