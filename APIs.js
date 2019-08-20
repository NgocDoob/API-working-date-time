	var err = 'invalid';
	
/*Ex2 validate input*/	
	function validateInput(dateFmString) {
		var length = dateFmString.length;
		var year = dateFmString.substring(0, length-4);
		var month = dateFmString.substring(length-4, length-2);
		var day = dateFmString.substring(length-2, length);
		if((((parseInt(month) == 1) || (parseInt(month) == 3) || (parseInt(month) == 5) || (parseInt(month) == 7) || (parseInt(month) == 8) || (parseInt(month) == 10) || (parseInt(month) == 12)) && (parseInt(day) <= 31)) || ((((parseInt(month) == 4) || (parseInt(month) == 6) || (parseInt(month) == 9) || (parseInt(month) == 11))) && (parseInt(day) <= 30))
			|| (parseInt(year) % 4 == 0 && parseInt(month) == 2 && parseInt(day) <= 29) || (parseInt(year) % 4 != 0 && parseInt(month) == 2 && parseInt(day) <= 28)) {
				return true;
			}else {
				return false;
			}
			return false;
	}
/*Ex2 count number of weekends*/	
	function numOfWeekend(fromDate, toDate) {
		var _fromDate = new Date(fromDate),
			_toDate = new Date(toDate);
			var _result = 0;
		while (_fromDate <= _toDate) {
			var day = _fromDate.getDay();
			if (day == 0) { 
				_result ++; 
			}
			_fromDate.setDate(_fromDate.getDate() + 1);
		}
		return _result;
	}

/* API Ex2-1.1 if weekend return true else return false*/
	function isWeekend(inDate) {
		var isWeekend = false;
		var date = inDate.toString();
		var length = date.length;
		if(validateInput(date)) {
			var dateNewFormat = new Date([date.slice(0,length-4), date.slice(length-4, length-2), date.slice(length-2, length)].join('-'));
			if(dateNewFormat.getDay() == 0) {
				return !isWeekend;
			}else {
				return isWeekend;
			}
		}else {
			return err;
		}
	}
	
/* API Ex2-1.2 return number of working days*/
	function numOfWorkingDays(fromDate, toDate) {
		var _fromDate = fromDate.toString();
		var _toDate = toDate.toString();
		var flength = _fromDate.length;
		var tlength = _toDate.length;
		var fDateNewFormat = new Date([_fromDate.slice(0,flength-4), _fromDate.slice(flength-4, flength-2), _fromDate.slice(flength-2, flength)].join('-'));
		var tDateNewFormat = new Date([_toDate.slice(0,tlength-4), _toDate.slice(tlength-4, tlength-2), _toDate.slice(tlength-2, tlength)].join('-'));
		if(validateInput(_fromDate) && validateInput(_toDate) && fDateNewFormat <= tDateNewFormat) {
			var oneDay = 24*60*60*1000;
			var fDateTime = fDateNewFormat.getTime();
			var tDateTime = tDateNewFormat.getTime();
			var timeDifference = tDateTime - fDateTime;
			return Math.round((timeDifference + oneDay)/oneDay) - numOfWeekend(fDateNewFormat, tDateNewFormat); 
		}else {
			return err;
		}	
	}

/* API Ex2-1.3 return date closed*/
	function displayCloseDate(startDate, nOwDays) {
		var _startDate = startDate.toString();
		var length = _startDate.length;
		var closeDate, _closeDate, _return;
		
		if(nOwDays > 0 && validateInput(_startDate)) {
			var _startDateNewFormat = new Date([_startDate.slice(0,length-4), _startDate.slice(length-4, length-2), _startDate.slice(length-2, length)].join('-'));
			while(nOwDays > 0) {
				var date = _startDateNewFormat.setDate(_startDateNewFormat.getDate() + 1);
				var day = new Date(date).getDay();
				if(day != 0) {
					nOwDays--;
					closeDate = date;
				}else {
					closeDate = new Date(date).setDate(new Date(date).getDate() + 1);
				}
			}
			_closeDate = new Date(closeDate);
			 var year = _closeDate.getFullYear();
			 var month = _closeDate.getMonth() + 1;
			 var date = _closeDate.getDate();
			 _return = '' + year + (month < 10 ? '0' : '') + month + (date < 10 ? '0' : '') + date;
		}else {
			return err;
		}	
		return parseInt(_return);
	}