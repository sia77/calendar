//var t = new Date();
//API call for timestamp

//Class definition...
function jsCalendar(){

	const MAX_CELL_NUM = 42;

	// Make this a property of the class calendar
	months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

	/* Format and convert timeStamp to human readible date */

	this.formatTimeStamp = function(dateObj, format){
		// var dateObj = new Date(timeStamp);
		// Month-DD-YYYY
		var formattedDate = '';
		switch(format){
			case 'dmy':
				 return (months[dateObj.getMonth()] + '-' + dateObj.getDate() + '-' +dateObj.getFullYear());
			case 'MY':
				return (months[dateObj.getMonth()] + '-' +dateObj.getFullYear());
		}
	}

	this.todaySDate = function(d_obj){
		document.getElementById('today-date').innerHTML = this.formatTimeStamp(d_obj, 'dmy');
	}

	this.userPickedDate = function(d_obj){
		document.getElementById('user-picked-date').innerHTML = this.formatTimeStamp(d_obj, 'MY'); 
	}


	this.generateFirstRow = function(){

		var weekDays
		var weekDaysName = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
		var weekDaysname_row = document.getElementById('weekdayname-row');

		weekDaysName.forEach(function(item, index){
			 weekDaysname_row.innerHTML += '<div class="col weekday-name" ><div class="item">'+ item + '</div></div>';
		});
	}

	this.addDatesToCalendar = function(d_obj){
		// console.log("obj: ", d_obj);
		var year = d_obj.getFullYear(), 
			month = d_obj.getMonth(),
			today = d_obj.getDate(),
			startDay = this.getFirstDayOfMonth(year, month);

		var lastDayOfMonth = this.numberOfDaysInMonth(year, month);
		var lastDayOfLastMonth = this.numberOfDaysInMonth(year, month-1);
		
		this.clearDateCells();

		var weekday_row = document.getElementById('weekday-row');
		var generatedString='';
		
		//Last months days
		var j=0, i=0, l=0;

		for(j=lastDayOfLastMonth-startDay+1; j<=lastDayOfLastMonth; j++){
			document.getElementById('cell_'+l).innerHTML = j;
			document.getElementById('cell_'+l).classList.add('otherMonths');
			if(l<startDay){
				l++;
			}			
		}

		// Current Month's day
		for(i=startDay; i<lastDayOfMonth+startDay; i++){
			document.getElementById('cell_'+i).innerHTML = i-startDay+1;
			if( (i-startDay+1) == today){
				document.getElementById('cell_'+i).classList.add("today");
			}		
		}

		//Fill the remaining days with next month...	
		for(k=i, l=1; k<MAX_CELL_NUM; k++,l++){
			document.getElementById('cell_'+k).innerHTML = l;
			document.getElementById('cell_'+k).classList.add('otherMonths');
		}

	}

	this.numberOfDaysInMonth = function(year, month){
		return new Date(year, month+1, 0).getDate();
	}

	this.generateAllDayCells = function (){
		//var lastDayOfMonth = numberOfDaysInMonth(year, month);

		var weekday_row = document.getElementById('weekday-row');
		var generatedString='<div>';

		for(i=1; i<MAX_CELL_NUM+1; i++){
			generatedString +='<div class="col this-month" ><div class="item cell" id="cell_'+(i-1)+'"></div></div>';
		
			if(i%7 == 0){
				generatedString += '</div><div>';
			}
		}
		weekday_row.innerHTML =  generatedString + '</div>';	
	}

	//
	var that = this;
	this.move_forward = function(d_obj){
		var next = document.getElementById('next');
		next.addEventListener('click', function(){
			var m = d_obj.getMonth()
			d_obj.setMonth(m+1);
			that.addDatesToCalendar(d_obj);
			that.userPickedDate(d_obj);
		});
	}

	this.move_backward = function(d_obj){
		var prev = document.getElementById('prev');
		prev.addEventListener('click', function(){
			var m = d_obj.getMonth();
			d_obj.setMonth(m-1);
			that.addDatesToCalendar(d_obj);
			that.userPickedDate(d_obj);
		});
	}

	this.clearDateCells = function(){
		var cells = document.querySelectorAll(".cell");
		cells.forEach(function(item){
			item.innerHTML = '';
			item.classList.remove("otherMonths", "today");
		});
	}

	this.getFirstDayOfMonth = function(year, month){
		// Please note: month in Javascript 0-11; 0:Jan, and 11:Dec.

		var day = new Date(year,  month, 1).getDay();
		return day;
	}

	this.getTimeStamp = function(){
		var xmlhttp = new XMLHttpRequest();
		var timeStamp = 0;

		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
		    	var myObj = JSON.parse(this.response);
		        timeStamp = myObj.time;
		        console.log("timeStamp: ", timeStamp); 
		        // document.getElementById("demo").innerHTML = timeStamp;
		    }
		};

		xmlhttp.open("GET", "http://localhost:8080/", false); 	//The get request is synchronous, so timeStamp can be returned.

		try {
	    	xmlhttp.send();
		}
		catch(err) {
			console.log("Err2: ", err.code);
			if(err.code == 19){
				//If client time is being used, then maybe time zone also needs to be included to make sure necessary adjustment can be made, when client and server synch
				return Date.now();

			}
			//console.dir( err);
		    //document.getElementById("demo").innerHTML = err.message;
		}		

		return timeStamp;
	}
}


;
(function(){
	var calendar_obj = new jsCalendar();

	//Creating a new Date object using a timestamp
	var d_obj = new Date(calendar_obj.getTimeStamp());
	
	calendar_obj.todaySDate(d_obj);
	calendar_obj.userPickedDate(d_obj);
	calendar_obj.generateFirstRow();
	calendar_obj.generateAllDayCells();
	calendar_obj.addDatesToCalendar( d_obj );
	calendar_obj.move_forward(d_obj);
	calendar_obj.move_backward(d_obj);	

})();
