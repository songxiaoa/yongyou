faxianSearchInfo.page_size = 500
var shaixuanYue = null
    // var yuefendate = []

// var gjarr = []

function getdata() {
    faxianSearchInfo.addition_search.first_start_time_or = getMonthStartDate()
    faxianSearchInfo.addition_search.last_start_time_or = getMonthEndDate()
}

function cleardata() {
    faxianSearchInfo.addition_search.first_start_time_or = ''
    faxianSearchInfo.addition_search.last_start_time_or = ''
}

if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;

            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/g),
                        index = classes.indexOf(value);

                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }

            return {
                add: update(function(classes, index, value) {
                    if (!~index) classes.push(value);
                }),

                remove: update(function(classes, index) {
                    if (~index) classes.splice(index, 1);
                }),

                toggle: update(function(classes, index, value) {
                    if (~index)
                        classes.splice(index, 1);
                    else
                        classes.push(value);
                }),

                contains: function(value) {
                    return !!~self.className.split(/\s+/g).indexOf(value);
                },

                item: function(i) {
                    return self.className.split(/\s+/g)[i] || null;
                }
            };
        }
    });
}


(function() {
    var datepicker = {};
    // 获取一个月的每一天数据
    datepicker.getMonthData = function(year, month) {
        var ret = [];
        if (!year || !month) {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }

        // 获取第一天和第一天对应的周几
        var firstDay = new Date(year, month - 1, 1);
        var firstDayWeekDay = firstDay.getDay();
        if (firstDayWeekDay === 0) {
            firstDayWeekDay = 7;
        }
        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        // 获取上个月最后一天的日期
        var lastDayOfLastMonth = new Date(year, month - 1, 0);
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
        // 要显示上一个月的天数
        var preMonthDayCount = firstDayWeekDay - 1;

        // 获取本月最后一天
        var lastDay = new Date(year, month, 0);
        var lastDate = lastDay.getDate();

        // 一个月可能有4-6周，按6周计算
        for (var i = 0; i < 7 * 6; i++) {
            // date记录当月当天的月日期
            var date = i + 1 - preMonthDayCount;
            // 显示
            var showDate = date;
            var thisMonth = month;
            if (date <= 0) {
                // 说明该显示上个月的日期
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if (date > lastDate) {
                // 到了下一个月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }
            if (thisMonth === 0) {
                thisMonth = 12;
            }
            if (thisMonth === 13) {
                thisMonth = 1;
            }

            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            });
        }

        return {
            year: year,
            month: month,
            days: ret
        };
    };

    // 获取当前月的所有活动
    jQuery.support.cors = true;
    getdata()
    shaixuanYue = {
        first_start_time_or: faxianSearchInfo.addition_search.first_start_time_or,
        last_start_time_or: faxianSearchInfo.addition_search.last_start_time_or
    }
    $.cookie('shaixuanYue', JSON.stringify(shaixuanYue), { expires: 7 })
    var hh = getActiveInfo_unlink(faxianSearchInfo)
    yuefendate = hh.content

    function dataformat(dt) {
        var date = new Date(dt)
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

    var monthData;
    var divDom;
    datepicker.buildUi = function(year, month) {
        monthData = datepicker.getMonthData(year, month);
        var html = '<div class="calendar-header">' + monthData.year +
            '年<a  class="btn btn-prev"></a>' +
            '<span>' + monthData.month + '月</span>' +
            '<a class="btn btn-next"></a><div class="nyr"><span class="gump-taday">今日</span><span class="todayh5">日</span><span class="nyractive">月</span></div>' +
            '</div>' +
            '<div class="calendar-body">' +
            '<div class="table">' +
            '<div class="thead">' +
            '<ul class="thead-tr clear-float">' +
            '<li class="thead-th " style="border-radius:10px 0 0 0;"><div style="height:48px">周一</div></li>' +
            '<li class="thead-th"><div style="height:48px">周二</div></li>' +
            '<li class="thead-th"><div style="height:48px">周三</div></li>' +
            '<li class="thead-th"><div style="height:48px">周四</div></li>' +
            '<li class="thead-th"><div style="height:48px">周五</div></li>' +
            '<li class="thead-th"><div style="height:48px">周六</div></li>' +
            '<li class="thead-th" style="border-radius:0 10px 0 0;"><div style="height:48px">周日</div></li>' +
            '</ul>' +
            '</div>' +
            '<div id="calendar-tbody">';
        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i];
            if (i % 7 === 0) {
                html += '<ul class="tbody-ul clear-float">';
            }
            html += '<li id="' + date.date + '" class="rilitd" data-date="' + date.date + '"><span>' + date.showDate + '日</span></li>'
            '<ul class="calender-list"><li></li><li></li></ul><div></div>';
            if (i % 7 === 6) {
                html += '</ul>';
            }
        }
        html += '</div>' +
            '</div>' +
            '</div>';

        return html;
    };

    datepicker.render = function(direction) {
        var year, month;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }
        if (direction === 'prev') month--;
        if (direction === 'next') month++;

        // 创建日历，这里要判断如果日历已经存在的话就不用创建了，不然永远只显示当前年月的日期了
        divDom = document.querySelector('.calendar');
        if (!divDom) {
            divDom = document.createElement('div');
            divDom.className = 'calendar';
            // document.body.appendChild(divDom);
            document.querySelector('.content-calender').appendChild(divDom)
        }
        divDom.innerHTML = datepicker.buildUi(year, month);
    }

    datepicker.init = function(input) {
        datepicker.render();
        // 初始化今天，周末变灰
        datepicker.tdweekbgChange = function() {
            var $tds = document.querySelectorAll('.rilitd')
            for (var i = 0; i < $tds.length; i++) {
                var ff = $tds[i].getAttribute('id')
                var date = new Date(monthData.year, monthData.month - 1, ff);
                if (checkWeekend(date)) {
                    $tds[i].classList.add('calendar-week')
                }
                if (currentTime(date)) {
                    $tds[i].style.position = 'relative';
                    $tds[i].firstChild.innerHTML = getstr(date);
                    var $li = document.createElement('li');
                    $li.classList.add('calendar-today');
                    $li.innerHTML = '<span class="today-item">今日</span>'
                    $tds[i].appendChild($li)
                }
            }
        }
        datepicker.tdweekbgChange()

        // 判断当前时间属于当前月份的某一天


        datepicker.guilei = function() { // 获取月份天数 

            var y, m;
            var hh = {};
            for (var i = 0; i < yuefendate.length; i++) {
                gjarr.push({
                    day: dataformat(yuefendate[i].activity_start_date),
                    content: yuefendate[i]
                })
            }
            hh = datepicker.getMonthData(y, m);
            var kk = [];
            var cc = []
            for (var i = 0; i < hh.days.length; i++) {
                var num = 0;
                var rili_oneday = []
                var html = '<ul class="calender-list">'
                for (var j = 0; j < gjarr.length; j++) {
                    if (hh.days[i].date == gjarr[j].day.day) {
                        num++
                        rili_oneday.push({
                            id: gjarr[j].content.id,
                            title: gjarr[j].content.activity_title,
                            start_time: createTime(gjarr[j].content.activity_start_date),
                            addres: gjarr[j].content.activity_show_way
                        })
                        html += '<li ><span class="dian">•</span>' + gjarr[j].content.activity_title +
                            '</li>'
                    }
                }
                var aa = num > 0 ? 'diaplay' : 'none'
                html += '</ul><div class="allcount" style="display:' + aa + '"><a href="./calender_ri.html?flag=' + encodeURI(JSON.stringify(rili_oneday)) + '">共' + num + '场活动&nbsp;></a></div>';
                $('#calendar-tbody ul .rilitd[data-date=' + hh.days[i].date + ']').append(html)
            }
        }
        datepicker.guilei()

        divDom.classList.add('calendar-show');
        // 给左右按钮绑定单击事件，由于init方法只调用一次，而按钮每次都要重新渲染，所以如果直接绑定在按钮上会无效，因为按钮一直在销毁和重建，这里用事件代理
        divDom.addEventListener('click', function(e) {
            var target = e.target;
            // if (!target.classList.contains('btn') || !target.classList.contains('gump-taday')) {
            //     return;
            // }
            if (target.classList.contains('btn-prev')) {
                datepicker.render('prev');
                var crrenMonthStart = getMonthStartDateMt(monthData.year, monthData.month - 1);
                var crrenMonthEnd = getMonthEndDateMe(monthData.year, monthData.month - 1);
                shaixuanYue = {
                    first_start_time_or: crrenMonthStart,
                    last_start_time_or: crrenMonthEnd
                }
                $.cookie('shaixuanYue', JSON.stringify(shaixuanYue), { expires: 7 })
                faxianSearchInfo.addition_search.first_start_time_or = crrenMonthStart
                faxianSearchInfo.addition_search.last_start_time_or = crrenMonthEnd
                var hh = getActiveInfo_unlink(faxianSearchInfo)
                yuefendate = hh.content
                datepicker.guilei()
                datepicker.tdweekbgChange()
            }
            if (target.classList.contains('btn-next')) {
                datepicker.render('next');
                var crrenMonthStart = getMonthStartDateMt(monthData.year, monthData.month - 1);
                var crrenMonthEnd = getMonthEndDateMe(monthData.year, monthData.month - 1);
                faxianSearchInfo.addition_search.first_start_time_or = crrenMonthStart
                faxianSearchInfo.addition_search.last_start_time_or = crrenMonthEnd
                shaixuanYue = {
                    first_start_time_or: crrenMonthStart,
                    last_start_time_or: crrenMonthEnd
                }
                $.cookie('shaixuanYue', JSON.stringify(shaixuanYue), { expires: 7 })
                var hh = getActiveInfo_unlink(faxianSearchInfo)
                yuefendate = hh.content
                datepicker.guilei()
                datepicker.tdweekbgChange()
            }
            if (target.classList.contains('gump-taday')) {
                var now = new Date(); //当前日期 
                var nowMonth = now.getMonth(); //当前月 
                var nowYear = now.getFullYear(); //当前年 
                monthData.year = nowYear
                monthData.month = nowMonth + 1
                var temp = getMonthStartDate();
                var temp1 = getMonthEndDate();
                faxianSearchInfo.addition_search.first_start_time_or = temp;
                faxianSearchInfo.addition_search.last_start_time_or = temp1;


                var shaixuanYue = {
                    first_start_time_or: temp,
                    last_start_time_or: temp1
                }
                $.cookie('shaixuanYue', JSON.stringify(shaixuanYue), { expires: 7 })
                var res = getActiveInfo_unlink(faxianSearchInfo)
                gjarr = []
                yuefendate = res.content
                datepicker.render('gump-taday');
                datepicker.guilei()
                datepicker.tdweekbgChange()
            }
        }, false);
        // 点击日 跳转到当日活动列表
        $(document).on('click', '.todayh5', function() {
            var date = new Date()
            var year;
            var month;
            var day;
            year = date.getFullYear();
            month = date.getMonth();
            day = date.getDate();
            var temp = new Date(year, month, day, '00', '00', '00')
            var temp1 = new Date(year, month, day, '23', '59', '59')
            faxianSearchInfo.addition_search.first_start_time_or = temp;
            faxianSearchInfo.addition_search.last_start_time_or = temp1;
            var res = getActiveInfo_unlink(faxianSearchInfo)
            var get_active_day = []
            for (var i = 0; i < res.content.length; i++) {
                get_active_day.push({
                    id: res.content[i].id,
                    title: res.content[i].activity_title,
                    start_time: createTime(res.content[i].activity_start_date),
                    addres: res.content[i].activity_show_way
                })
            }
            location.href = "./calender_ri.html?flag=" + encodeURI(JSON.stringify(get_active_day));
        })


        // 给每个日期绑定单击事件
        divDom.addEventListener('click', function(e) {
            var target = e.target;
            if (target.className == 'rilitd') {
                if (target.classList.contains('calender-active')) {
                    target.classList.remove('calender-active');
                } else {
                    calenderRemoveClass();
                    target.classList.add('calender-active');
                }
            }
            // if (target.tagName.toLowerCase() == 'li') {
            //     if (target.parentNode.parentNode.classList.contains('calender-active')) {
            //         target.parentNode.parentNode.classList.remove('calender-active');
            //     } else {
            //         calenderRemoveClass();
            //         target.parentNode.parentNode.classList.add('calender-active');
            //     }
            // }
            // if (target.tagName.toLowerCase() == 'div' || target.tagName.toLowerCase() == 'ul') {
            //     if (target.parentNode.classList.contains('calender-active')) {
            //         target.parentNode.classList.remove('calender-active');
            //     } else {
            //         calenderRemoveClass();
            //         target.parentNode.classList.add('calender-active');
            //     }
            // }

        }, false);
    }

    // 移除class
    function calenderRemoveClass() {
        var $tds = document.querySelectorAll('ul .rilitd')
        for (var i = 0; i < $tds.length; i++) {
            $tds[i].classList.remove('calender-active')
        }
    }

    // 判断当前的时间是不是周末
    function checkWeekend(data) {

        var day = new Date(data).getDay(); //0-周日，6-周六
        if (day == 0 || day == 6) {
            return true
        }
        return false
    }
    // 获取当前时间添加标记
    function currentTime(data) {
        var today = new Date()
        if (format(data) == format(today)) {
            return true
        }
        return false;
    }

    // 格式化当前时间
    function getstr(date) {
        var str = '';
        str += (date.getMonth() + 1) + '月'
        str += (date.getDate()) + '日';
        return str;
    }

    function format(date) {
        var ret = '';
        var padding = function(num) {
            if (num <= 9) {
                return '0' + num;
            }
            return num;
        }
        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());
        return ret;
    }
    // 全局注册一下
    window.datepicker = datepicker;
})();

function getDataset(ele) {
    if (ele.dataset) {
        return ele.dataset;
    } else {
        var attrs = ele.attributes, //元素的属性集合
            dataset = {},
            name, matchStr;
        for (var i = 0; i < attrs.length; i++) { //是否是data- 开头
            matchStr = attrs[i].name.match(/^data-(.+)/);
            if (matchStr) { //data-auto-play 转成驼峰写法 autoPlay
                name = matchStr[1].replace(/-([\da-z])/gi, function(all, letter) {
                    return letter.toUpperCase();
                });
                dataset[name] = attrs[i].value;
            }
        }
        return dataset;
    }
}


datepicker.init('#datepicker');

//获得本月的开始日期 
function getMonthStartDateMt(_nowYear, _nowMonth) {
    var monthStartDate = new Date(_nowYear, _nowMonth, 1, '00', '00', '00');
    monthStartDate.setHours(monthStartDate.getHours() + 8);
    return monthStartDate;
}

//获得本月的结束日期 
function getMonthEndDateMe(_nowYear, _nowMonth) {
    var days = getMonthDays(_nowMonth); //获取当月总共有多少天
    var monthEndDate = new Date(_nowYear, _nowMonth, days, '23', '59', '59');
    monthEndDate.setHours(monthEndDate.getHours() + 8);
    return monthEndDate; //返回当月结束时间
}