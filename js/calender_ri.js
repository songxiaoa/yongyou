faxianSearchInfo.page_size = 12
    // 活动日数据
active_day = JSON.parse(decodeURI(location.search.split('?flag=')[1]))
    // 获取星期数
function getCurrentDate(active_day) {

    var myDate = NewDate(active_day);

    var year = myDate.getFullYear(); //年

    var month = myDate.getMonth() + 1; //月

    var day = myDate.getDate(); //日

    var days = myDate.getDay();

    switch (days) {
        case 1:
            days = '星期一';
            break;
        case 2:
            days = '星期二';
            break;
        case 3:
            days = '星期三';
            break;
        case 4:
            days = '星期四';
            break;
        case 5:
            days = '星期五';
            break;
        case 6:
            days = '星期六';
            break;
        case 0:
            days = '星期日';
            break;
    }
    // var str = year + "年" + month + "月" + day + "日  " + days;
    var str = days;
    return str;
}
week = getCurrentDate(active_day[0].start_time)

// 初始化日期
function format(date) {
    var now = NewDate(date)
    var ret = '';
    var padding = function(num) {
        if (num <= 9) {
            return '0' + num;
        }
        return num;
    }
    var year = now.getFullYear() + '年';
    var month = padding(now.getMonth() + 1) + '月';
    var day = padding(now.getDate()) + '日';
    return {
        year: year,
        month: month,
        day: day
    };
}

function NewDate(str) {
    var yh = str.split(" ");

    var str0 = yh[0].split('-');
    var str1 = yh[1].split(':');

    var date = new Date();
    date.setFullYear(parseInt(str0[0]));
    date.setMonth(parseInt(str0[1] - 1));
    date.setDate(parseInt(str0[2]));

    date.setHours(parseInt(str1[0]));
    date.setMinutes(parseInt(str1[1]));
    date.setSeconds(parseInt(str1[2]));
    if (str1.length > 3) {
        date.setMilliseconds(parseInt(str1[3]));
    }
    return date;
}

function dataformat(dt) {
    var date = NewDate(dt)
    var year;
    var month;
    var day;
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();

    return {
        year: year,
        month: month,
        day: day
    };
}

var activeMonth = dataformat(active_day[0].start_time)
    // 获取当前月的天数
function mGetDate(year, month) {
    var d = new Date(year, month - 1, 0);
    return d.getDate();
}

var currentdaysum = mGetDate(activeMonth.year, activeMonth.month)
currentdate = format(active_day[0].start_time)

var temp = getFromStartString(gg(currentdate.year), gg(currentdate.month), gg(currentdate.day))
var temp1 = getFromEndString(gg(currentdate.year), gg(currentdate.month), gg(currentdate.day))
var shiaxuanRi = {
    first_start_time_or: temp,
    last_start_time_or: temp1
}
$.cookie('shiaxuanRi', JSON.stringify(shiaxuanRi), { expires: 7 })

function init() {
    var item = '<div class="calender-ri-header">' + currentdate['year'] + '<span class="currentdate-yue">' + currentdate['month'] + '</span>' +
        '<div class="btn-group"><span class="dropdown-toggle" ' + ' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ' + '<a class=" btn-prev"></a></span><ul class="dropdown-menu">'
    for (var i = 1; i < 13; i++) {
        var num = i * 5435345 * 1 + 'hjfhfghf'
        item += '<li id="' + num + '"><a> ' + i + '月</a></li>'
    }
    item += '</ul></div>' + '<span class="currentdate-ri">' + currentdate['day'] + '</span>' +
        '<div class="btn-group"><span class="dropdown-toggle" ' + ' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> ' +
        '<a class=" btn-prev"></a></span><ul class="dropdown-menu">'
    for (var i = 1; i < currentdaysum + 1; i++) {
        var num = i * 123 + 'zxczxczx'
        item += '<li id="' + num + '"><a>' + i + '日</a></li>'
    }
    item += '</ul></div>' + '<div class="nyr">' +
        '<span class="currentttoday">今日</span><span class="nyractive aa">日</span><span>月</span></div></div><div class="calender-ri-main"><div class="calender-ri-month">' + currentdate['year'] + currentdate['month'] +
        '</div><div class="calender-ri-detail"><ul><li><span class="calender-ri-detail-time-icon"></span>' + currentdate['day'] + week + '</li>'
    for (var i = 0; i < active_day.length; i++) {
        var address = active_day[i].address == 'up' ? '线下活动' : '线上活动'
        item += '<li><ul class="calender-ri-detail-item"><li class="calender-ri-detail-name"><span class="calender-ri-detail-name-icon"></span>' + active_day[i].title +
            '</li><li class="calender-ri-detail-time"><span></span>活动时间：' + active_day[i].start_time + '</li><li class="calender-ri-detail-addres"><span></span>活动地点：' + address +
            '</li><button class="calender-ri-detail-click">立即报名</button></ul></li>'
    }
    item += '</ul></div></div>'
    $('.content-calender-ri').append(item)
    for (var i = 1; i < 13; i++) {
        var num = i * 5435345 * 1 + 'hjfhfghf'
        $('#' + num).bind('click', { id: i }, yuechange)
    }
    for (var i = 1; i < currentdaysum + 1; i++) {
        var num = i * 123 + 'zxczxczx'
        $('#' + num).bind('click', { id: i }, richange)
    }
}
init()

function renderRidata(list) {
    $('.calender-ri-detail ul').html('')
    var item = '<li><span class="calender-ri-detail-time-icon"></span>' + currentdate['day'] + week + '</li>';
    if (list.length < 1) {
        item += '<li> 暂无活动</li>'
        $('.calender-ri-detail').append(item)
    } else {
        for (var i = 0; i < list.length; i++) {
            var address = list[i].address == 'up' ? '线下活动' : '线上活动'
            item += '<li><ul class="calender-ri-detail-item"><li class="calender-ri-detail-name"><span class="calender-ri-detail-name-icon"></span>' + list[i].title +
                '</li><li class="calender-ri-detail-time"><span></span>活动时间：' + list[i].start_time + '</li><li class="calender-ri-detail-addres"><span></span>活动地点：' + address +
                '</li><button class="calender-ri-detail-click">立即报名</button></ul></li>'
        }
        $('.calender-ri-detail ul').append(item)
    }
    var temp = getFromStartString(gg(currentdate.year), gg(currentdate.month), gg(currentdate.day))
    if (currentTime_tow(temp) == currentTime_tow(new Date())) {
        $('.nyr span:first-child').addClass('nyractive')
    }
}

function padding(num) {
    if (num <= 9) {
        return '0' + num;
    }
    return num;
}

// 获取本日开始时间
function getFromStartString(year, yue, day) {
    var dayStartDate = new Date(year, yue * 1 - 1, day, '00', '00', '00');
    dayStartDate.setHours(dayStartDate.getHours() + 8)
    return dayStartDate
}

// 获取本日结束时间
function getFromEndString(year, yue, day) {
    var dayEndDate = new Date(year, yue * 1 - 1, day, '23', '59', '59');
    dayEndDate.setHours(dayEndDate.getHours() + 8)
    return dayEndDate
}

// 提取字符传中的数字
function gg(s) {
    return s.replace(/[^0-9]/ig, "")
}

function currentTime_tow(data) {
    var day = new Date(data);
    var ret = '';
    var padding = function(num) {
        if (num <= 9) {
            return '0' + num;
        }
        return num;
    }
    ret += day.getFullYear() + '-';
    ret += padding(day.getMonth() + 1) + '-';
    ret += padding(day.getDate());
    return ret
}
// 点击今日 请求今日数据渲染页面
$('.currentttoday').on('click', function() {
    var _tstart = new Date(dataParse(new Date(), 1) + ' 00:00:00');
    var _tend = new Date(dataParse(new Date(), 1) + ' 23:59:59');
    _tstart.setHours(_tstart.getHours() + 8);
    _tend.setHours(_tend.getHours() + 8);
    faxianSearchInfo.addition_search.first_start_time_or = _tstart;
    faxianSearchInfo.addition_search.last_start_time_or = _tend;
    getActiveInfo()
    $('.currentdate-ri').html(dataParse(new Date(), 1).slice(8, 10) + '日');
    $('.currentdate-yue').html(dataParse(new Date(), 1).slice(5, 7) + '月');
    $('.nyr span:first-child').addClass('nyractive')
})

function richange(e) {
    currentdate.day = padding(e.data.id) + '日'
    $('.currentdate-ri').html(currentdate.day);
    var temp = getFromStartString(gg(currentdate.year), gg(currentdate.month), gg(currentdate.day))
    var temp1 = getFromEndString(gg(currentdate.year), gg(currentdate.month), gg(currentdate.day))
    faxianSearchInfo.addition_search.first_start_time_or = temp;
    faxianSearchInfo.addition_search.last_start_time_or = temp1;
    shiaxuanRi = {
        first_start_time_or: temp,
        last_start_time_or: temp1
    }
    $.cookie('shiaxuanRi', JSON.stringify(shiaxuanRi), { expires: 7 })
    getActiveInfo()
    if (currentTime_tow(temp) == currentTime_tow(new Date())) {
        $('.nyr span:first-child').addClass('nyractive')
    } else {
        $('.nyr span:first-child').removeClass('nyractive')
    }
    // render()
}

function yuechange(e) {
    currentdate.month = padding(e.data.id) + '月'
    var temp = getFromStartString(gg(currentdate.year), gg(currentdate.month), gg(currentdate.day))
    var temp1 = getFromEndString(gg(currentdate.year), gg(currentdate.month), gg(currentdate.day))
    faxianSearchInfo.addition_search.first_start_time_or = temp;
    faxianSearchInfo.addition_search.last_start_time_or = temp1;
    shiaxuanRi = {
        first_start_time_or: temp,
        last_start_time_or: temp1
    }
    $.cookie('shiaxuanRi', JSON.stringify(shiaxuanRi), { expires: 7 })
    if (currentTime_tow(temp) == currentTime_tow(new Date())) {
        $('.nyr span:first-child').addClass('nyractive')
    } else {
        $('.nyr span:first-child').removeClass('nyractive')
    }
    $('.currentdate-yue').html(currentdate.month)
    getActiveInfo()
}

function getActiveInfo() {
    jQuery.support.cors = true;
    $.ajax({
        url: activityList,
        type: 'POST',
        datatype: 'json',
        async: false, // 设置同步
        contentType: 'application/json',
        data: JSON.stringify(
            faxianSearchInfo
        ),
        success: function(res) {
            active_day = []
            for (var i = 0; i < res.data.content.length; i++) {
                active_day.push({
                    id: res.data.content[i].id,
                    title: res.data.content[i].activity_title,
                    start_time: createTime(res.data.content[i].activity_start_date),
                    addres: res.data.content[i].activity_show_way
                })
            }
            week = getCurrentDate(active_day[0].start_time)
            renderRidata(active_day)
        }
    })
}