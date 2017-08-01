Date.prototype.monthDays= function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
}

var t = new Date();
//API call for timestamp

// var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/* Format and convert timeStamp to human readible date */

var formatTimeStamp = function(timeStamp){
	var dateObj = new Date(timeStamp);
	// DD/MM/YYYY
	return dateObj.getDate() + '/'+ (dateObj.getMonth()+1) + '/' +dateObj.getFullYear();;
}

var today_date = document.getElementById('today-date').innerHTML = formatTimeStamp(t);


var generateFirstRow = function(){

	var weekDays
	var weekDaysName = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	var weekDaysname_row = document.getElementById('weekdayname-row');

	weekDaysName.forEach(function(item, index){
		 weekDaysname_row.innerHTML += '<div class="col" ><div class="item">'+ item + '</div></div>';
	});
}



var generateCalendar = function(year, month, startDay){
	var lastDayOfMonth = numberOfDaysInMonth(year, month);

	var weekday_row = document.getElementById('weekday-row');
	var generatedString='';
	var startDayTemp = startDay;
	console.log('lastDayOfMonth: ', lastDayOfMonth);
	//weekday_row.innerHTML += '3';


	for(i=1; i<lastDayOfMonth+1+startDay; i++){

		if(startDayTemp>0){
			generatedString +='<div class="col" ><div class="item">*</div></div>';
			startDayTemp--;
		}else{
			generatedString +='<div class="col" ><div class="item">'+ (i-startDay) + '</div></div>';
		}
		
		if(i%7 == 0){
			generatedString += '</div><div>';
		}
	}
	weekday_row.innerHTML = '<div>'+ generatedString +'</div>';
}

var numberOfDaysInMonth = function(year, month){
	return new Date(year, month, 0).getDate();
}



;
(function(){
	 generateFirstRow();
	 generateCalendar(t.getFullYear(), t.getMonth(), 2);

})();

