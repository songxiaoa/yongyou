var _now = new Date(); //当前日期 
var _nowDayOfWeek = _now.getDay(); //今天本周的第几天 
var _nowDay = _now.getDate(); //当前日 
var _nowMonth = _now.getMonth(); //当前月 
var _nowYear = _now.getYear(); //当前年 
_nowYear += (_nowYear < 2000) ? 1900 : 0; //

//获得某月的天数 
function getMonthDays(myMonth) {
    var monthStartDate = new Date(_nowYear, myMonth, 1);
    var monthEndDate = new Date(_nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}

//获得本周的开始日期 
function getWeekStartDate() {
    var weekStartDate = new Date(_nowYear, _nowMonth, _nowDay - _nowDayOfWeek, '00', '00', '00');
    weekStartDate.setHours(weekStartDate.getHours() + 8);
    return weekStartDate;
}

//获得本周的结束日期 
function getWeekEndDate() {
    var weekEndDate = new Date(_nowYear, _nowMonth, _nowDay + (6 - _nowDayOfWeek), '23', '59', '59');
    weekEndDate.setHours(weekEndDate.getHours() + 8);
    return weekEndDate;
}

//获得本月的开始日期 
function getMonthStartDate() {
    var monthStartDate = new Date(_nowYear, _nowMonth, 1, '00', '00', '00');
    monthStartDate.setHours(monthStartDate.getHours() + 8);
    return monthStartDate;
}

//获得本月的结束日期 
function getMonthEndDate() {
    var days = getMonthDays(_nowMonth); //获取当月总共有多少天
    var monthEndDate = new Date(_nowYear, _nowMonth, days, '23', '59', '59');
    monthEndDate.setHours(monthEndDate.getHours() + 8);
    return monthEndDate; //返回当月结束时间
}