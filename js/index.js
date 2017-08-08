Date.prototype.monthDays= function(){
    var d= new Date(this.getFullYear(), this.getMonth()+1, 0);
    return d.getDate();
}
var t = new Date();

//API call for timestamp

// Make this a property of the class calendar
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/* Format and convert timeStamp to human readible date */

var formatTimeStamp = function(dateObj, format){
	// var dateObj = new Date(timeStamp);
	// Month-DD-YYYY
	var formattedDate = '';
	switch(format){
		case 'dmy':
			 return (months[dateObj.getMonth()] + '-' + dateObj.getDate() + '-' +dateObj.getFullYear());
			//break;
		case 'MY':
			return (months[dateObj.getMonth()] + '-' +dateObj.getFullYear());
			//break;
	}
	//return (formattedDate);
}

var todaySDate = function(d_obj){
	document.getElementById('today-date').innerHTML = formatTimeStamp(d_obj, 'dmy');
}

var userPickedDate = function(d_obj){

	document.getElementById('user-picked-date').innerHTML = formatTimeStamp(d_obj, 'MY'); 
}




var generateFirstRow = function(){

	var weekDays
	var weekDaysName = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	var weekDaysname_row = document.getElementById('weekdayname-row');

	weekDaysName.forEach(function(item, index){
		 weekDaysname_row.innerHTML += '<div class="col weekday-name" ><div class="item">'+ item + '</div></div>';
	});
}



var addDatesToCalendar = function(d_obj){

	var year = d_obj.getFullYear(), 
		month = d_obj.getMonth(),
		startDay = getFirstDayOfMonth(year, month);

	var lastDayOfMonth = numberOfDaysInMonth(year, month);
	var lastDayOfLastMonth = numberOfDaysInMonth(year, month-1);
	
	clearDateCells();

	console.log('startDay: ', startDay );
	var weekday_row = document.getElementById('weekday-row');
	var generatedString='';
	console.log('lastDayOfLastMonth: ', lastDayOfLastMonth);
	// var l=0;
	// for(j=lastDayOfLastMonth-startDay+1; j<=lastDayOfLastMonth; j++){
	// 	document.getElementById('cell_'+l).innerHTML = j;
	// 	if(l<startDay){
	// 		l++;
	// 	}			
	// }

	for(i=startDay; i<lastDayOfMonth+startDay; i++){
		document.getElementById('cell_'+i).innerHTML = i-startDay+1;

		document.getElementById('cell_'+i).classList.add("today");
	}

	// for(k=9; k<; k++){

	// }


}

var litUpToday = function(){

}

var numberOfDaysInMonth = function(year, month){
	return new Date(year, month+1, 0).getDate();
}

function generateAllDayCells(){
	//var lastDayOfMonth = numberOfDaysInMonth(year, month);

	var weekday_row = document.getElementById('weekday-row');
	var generatedString='<div>';

	for(i=1; i<42+1; i++){
		generatedString +='<div class="col" ><div class="item cell" id="cell_'+(i-1)+'"></div></div>';
	
		if(i%7 == 0){
			generatedString += '</div><div>';
		}
	}
	weekday_row.innerHTML =  generatedString + '</div>';	
}

var move_forward = function(d_obj){
	var next = document.getElementById('next');
	next.addEventListener('click', function(){
		var m = d_obj.getMonth()
		d_obj.setMonth(m+1);
		//console.log("n-Date: ", d_obj);
		addDatesToCalendar(d_obj);
		userPickedDate(d_obj);
	});
}

var move_backward = function(d_obj){
	var prev = document.getElementById('prev');
	prev.addEventListener('click', function(){
		var m = d_obj.getMonth();
		d_obj.setMonth(m-1);
		//console.log("p-Date: ", d_obj);
		addDatesToCalendar(d_obj);
		userPickedDate(d_obj);
	});
}

var clearDateCells = function(){
	var cells = document.querySelectorAll(".cell");
	cells.forEach(function(item){
		item.innerHTML = '';
	});
}

var getFirstDayOfMonth = function(year, month){
	//console.log('day: ', year +'-'+ month + '-01');
	// month+1 is needed to make sure it is looking a the current month....
	// But I don't really know why, the off by one occurs....
	// var day = new Date(year +'-'+ (month+1) + '-01').getDay();
	// Please note: month in Javascript 0-11; 0:Jan, and 11:Dec.

	var day = new Date(year,  month, 1).getDay();
	//console.log('day: ', day);
	return day;
}



;
(function(){
	var d_obj = new Date();
	todaySDate(d_obj);
	userPickedDate(d_obj);
	generateFirstRow();
	generateAllDayCells();

	//console.log('d_obj', d_obj );

	addDatesToCalendar( d_obj );
	move_forward(d_obj);
	move_backward(d_obj);

	

})();

