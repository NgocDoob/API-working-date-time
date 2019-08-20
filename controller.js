angular.module('ExApp', []).controller('CheckDateController', ["$scope", function($scope) {
	var err = 'invalid';
	$scope.vm = {};
	$scope.vm.options = [{id: 1, title: 'Ex2-1.1'}, {id: 2, title: 'Ex2-1.2'}, {id: 3, title: 'Ex2-1.3'}];
	
	//#region data test
	//data test for Ex2-1.1 format {date: date value, expect: expect value}
	$scope.vm.dates = [{command: 20191309, expect: 'invalid'}, {command: 20191209, expect: false}, {command: 20190818, expect: true}, {command: 20190818, expect: false}, {command: new Date('2019-08-18'), expect: 'invalid'}];
	//data test for Ex2-1.2 format {startDate: date value, endDate: date value, expect: expect value}
	$scope.vm.items = [{startDate: 20190918, endDate: 20190918, expect: 2},{startDate: 20190918, endDate: 20190825, expect: 6},{startDate: 20190818, endDate: 20190825, expect: 6}, {startDate: 20190818, endDate: 20190820, expect: 2}, {startDate: 20191518, endDate: 20190820, expect: 'invalid'}, {startDate: 20190118, endDate: 20190820, expect: 2}];
	//data test for Ex2-1.3 format {startDate: date value, numOfWDays: number Of Working Days, expect: expect value}
	$scope.vm.closeDates = [{startDate: 20190818, numOfWDays: 3, expect: 20190821},{startDate: 20190818, numOfWDays: 3, expect: 20190821}, {startDate: 20190818, numOfWDays: 2, expect: 20190821},  {startDate: 20198018, numOfWDays: 2, expect: 20190821}];
	//#endregion data test
	
	//#region function executing test case
	$scope.vm.actual = function(command, type) {
		if(type == 1) {
			return typeof(isWeekend(command)) == "string" ? isWeekend(command) : isWeekend(command) ? "Weekend" :  "Working day" ;
		}else if(type == 2) {
			return typeof(numOfWorkingDays(command.startDate, command.endDate)) == "string" ? 'invalid' : numOfWorkingDays(command.startDate, command.endDate);
		}else if(type == 3) {
			return typeof(displayCloseDate(command.startDate, command.numOfWDays)) == "string" ? 'invalid' : displayCloseDate(command.startDate, command.numOfWDays);
		}		
	}
	
	$scope.vm.result = function(command, expectResult, type) {
		if(type == 1) {
			return expectResult == isWeekend(command) ? "Pass" : "False";
		}else if(type == 2) {
			return expectResult == numOfWorkingDays(command.startDate, command.endDate) ? "Pass" : "False";
		}else if(type == 3) {
			return expectResult == displayCloseDate(command.startDate, command.numOfWDays) ? "Pass" : "False";
		}
	}
	//#endregion function executing test case
	
/*Ex2 validate input*/
	function validateInput(dateFmString) {
		if(Number(dateFmString)) {
			var length = dateFmString.length;
			var year = dateFmString.substring(0, length-4);
			var month = dateFmString.substring(length-4, length-2);
			var day = dateFmString.substring(length-2, length);
			if((((parseInt(month) == 1) || (parseInt(month) == 3) || (parseInt(month) == 5) || (parseInt(month) == 7) || (parseInt(month) == 8) || (parseInt(month) == 10) || (parseInt(month) == 12)) && (parseInt(day) <= 31)) || ((((parseInt(month) == 4) || (parseInt(month) == 6) || (parseInt(month) == 9) || (parseInt(month) == 11))) && (parseInt(day) <= 30))
				|| (parseInt(year) % 4 == 0 && parseInt(month) == 2 && parseInt(day) <= 29) || (parseInt(year) % 4 != 0 && parseInt(month) == 2 && parseInt(day) <= 28)) {
					return true;
				}
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
	
}]);










