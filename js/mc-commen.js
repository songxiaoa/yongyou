var yuefendate = []

var gjarr = []
var getAllCityData = [];
var allCity = [];
var activityListInfo = [];
var getAllcityAbroadData = []


var currentdate = null
var week = null
var active_day = null
var faxianSearchInfo = {
    addition_search: {
        first_start_time_or: '',
        last_start_time_or: '',
        field: '',
        industry: '',
        activity_show_way: '', // up 线上 down 线下
        state: 1, // 1 全部 3 未发布 4 进行中  5 已结束
        title: '',
        activity_site_conutry: '', // 国内、国外
        activity_site_province: '', //省
        activity_site_city: '', //市
        activity_site_district: '', //区
        activity_sort: ''
    },
    hide_past_activity: false,
    page_number: 1,
    page_size: 12,
    sort_field: 'activity_start_date',
    sort_term: 0
};
var defalarr = ['北京市', "天津市", "上海市", "重庆市", "香港特别行政区", "澳门特别行政区", "广州市", "深圳市"]
$(function() {
    //获取全部城市
    $.ajax({
        type: "GET",
        url: getAllCity,
        data: {},
        contentType: 'application/json',
        success: function(res) {
            if (res.flag == 0) {
                if (!res.data || res.data.length == 0) {
                    $('.city-list').hide();
                    return
                }
                getAllCityData = res.data;
                for (var index = 0; index < res.data.length; index++) {
                    var element = res.data[index];
                    var _item = '<li id=' + element.id + '>';
                    _item += element.name;
                    _item += '</li>';
                    $('.city-list').append(_item);
                    $('#' + element.id).bind('click', { id: element.id, data: res.data[index] }, hangyeChange);
                }
                $('.city-list').append('<li id="abroad">海外</li>');
                // 全部行业
            }
        }
    });
    //获取海外城市
    $.ajax({
        type: "GET",
        url: 'http://mk.yonyou.com:8080/opservice/opbasedocarea/allcityAbroad.json',
        data: {},
        contentType: 'application/json',
        success: function(res) {
            if (res.flag == 0) {
                if (!res.data || res.data.length == 0) {
                    $('.city-list').hide();
                    return
                }
                getAllcityAbroadData = res.data
            }
        }
    });
})


// 获取全国数据
function getAllcityDatalist() {
    //获取全部城市
    $.ajax({
        type: "GET",
        url: getAllCity,
        data: {},
        contentType: 'application/json',
        success: function(res) {
            if (res.flag == 0) {
                if (!res.data || res.data.length == 0) {
                    $('.city-list').hide();
                    return
                }
                $('.city-list').html('')
                getAllCityData = res.data;
                for (var index = 0; index < res.data.length; index++) {
                    var element = res.data[index];
                    var _item = '<li id=' + element.id + '>';
                    _item += element.name;
                    _item += '</li>';
                    $('.city-list').append(_item);
                    $('#' + element.id).bind('click', { id: element.id, data: res.data[index] }, hangyeChange);
                }
                $('.city-list').append('<li id="abroad">海外</li>');
                // 全部行业
            }
        }
    });
}
$(document).on('click', '#more-city', function() {
    $('.city-panal').show()
    getAllcityDatalist()
})
$(document).on('click', '.city-close', function() {
    $('.city-panal').hide()
    claerClass()
})

$(document).on('click', '#adder-item', function() {
    getAllcityDatalist()
    $('#item007').hide()
    $('#item007').removeClass('city-nav-item-active')
    $(this).addClass('city-nav-item-active')
})

$(".city-list").on('click', '#abroad', function() {
    getAllcityAbroad()
});


function getAllcityAbroad() {
    $('.city-list').html('')
    for (var index = 0; index < getAllcityAbroadData.length; index++) {
        var element = getAllcityAbroadData[index];
        var _item = '<li id=' + element.id + '>';
        _item += element.name;
        _item += '</li>';
        $('.city-list').append(_item);
        $('#' + element.id).bind('click', { id: element.id, data: getAllcityAbroadData[index] }, changeAbroad);
    }
}

/**
 * 城市的更改
 */
function hangyeChange(e) {
    var _id = e.data.id;
    var name = e.data.data.name;
    var cc = defalarr.indexOf(name)
    if (cc >= 0) {
        $('.city-right').children()
        for (var i = 0; i < $('.city-right').children().length; i++) {
            if (name == '北京市') {
                $($('.city-right').children().get(i)).removeClass('city-a-active')
                $($('.city-right').children().get(1)).addClass('city-a-active');
                $('#active-city').hide();
            }
            if (name == '上海市') {
                $($('.city-right').children().get(i)).removeClass('city-a-active')
                $($('.city-right').children().get(2)).addClass('city-a-active')
                $('#active-city').hide();
            }
        }
        $('.city-panal').hide()
        return
    }

    $('.city-list').html('');
    $('#item007').html(e.data.data.name)
    $('#item007').addClass('city-nav-item-active')
    $('#adder-item').removeClass('city-nav-item-active')
    $('#item007').show()
    for (var i = 0; i < getAllCityData.length; i++) {
        if (getAllCityData[i].id === e.data.id) {
            for (var index = 0; index < getAllCityData[i].child.length; index++) {
                var element = getAllCityData[i].child[index];
                var _item = '<li id=' + element.code + '>';
                _item += element.name;
                _item += '</li>';
                $('.city-list').append(_item);
                $('#' + element.code).bind('click', { id: element.id, data: [getAllCityData[i].child[index], e.data.data.name] }, childChang);
            }
        }
    }
}

function claerClass() {
    $('#item007').removeClass('city-nav-item-active');
    $('#item007').hide()
    $('#adder-item').addClass('city-nav-item-active')
}

function childChang(e) {
    $('#active-city').show();
    for (var i = 0; i < $('.city-right').children().length; i++) {
        $($('.city-right').children().get(i)).removeClass('city-a-active')
        if (e.data.data[0].name == '深圳市') {
            $($('.city-right').children().get(4)).addClass('city-a-active');
            return
        }
        if (e.data.data[0].name == '广州市') {
            $($('.city-right').children().get(3)).addClass('city-a-active')
            return
        }
        claerClass()
        $('#active-city').html(e.data.data[0].name);
        $('#active-city').removeClass('selsect-item');
        $('#active-city').addClass('city-a-active')
        $('.city-panal').hide()

    }
    faxianSearchInfo['addition_search']['activity_site_conutry'] = '国内'
    faxianSearchInfo['addition_search']['activity_site_province'] = e.data.data[1]
    faxianSearchInfo['addition_search']['activity_site_city'] = e.data.data[0].name
    searchdata(faxianSearchInfo)

}

// 海外城市
function changeAbroad(e) {
    $('#active-city').show();
    for (var i = 0; i < $('.city-right').children().length; i++) {
        $($('.city-right').children().get(i)).removeClass('city-a-active')
    }
    $('#active-city').html(e.data.data.name);
    $('#active-city').removeClass('selsect-item');
    $('#active-city').addClass('city-a-active')

    faxianSearchInfo['addition_search']['activity_site_conutry'] = '海外'
    faxianSearchInfo['addition_search']['activity_site_province'] = e.data.data['name']
    selectpagerender(location.href)
}
// 热门城市的点击事件
$('.quanguo').on('click', function() {
    faxianSearchInfo['addition_search']['activity_site_conutry'] = ''
    faxianSearchInfo['addition_search']['activity_site_province'] = ''
    faxianSearchInfo['addition_search']['activity_site_city'] = ''
    selectpagerender(location.href)
    $('.city-a-active').removeClass('city-a-active')
    $('.quanguo').addClass('city-a-active')
    $('#active-city').hide()

})
$('.beijing').on('click', function() {
    faxianSearchInfo['addition_search']['activity_site_conutry'] = '国内'
    faxianSearchInfo['addition_search']['activity_site_province'] = ''
    faxianSearchInfo['addition_search']['activity_site_city'] = '北京'
    selectpagerender(location.href)
    $('.city-a-active').removeClass('city-a-active')
    $('.beijing').addClass('city-a-active')
    $('#active-city').hide()

})
$('.shanghai').on('click', function() {
    faxianSearchInfo['addition_search']['activity_site_conutry'] = '国内'
    faxianSearchInfo['addition_search']['activity_site_province'] = ''
    faxianSearchInfo['addition_search']['activity_site_city'] = '上海'
    selectpagerender(location.href)
    $('.city-a-active').removeClass('city-a-active')
    $('.shanghai').addClass('city-a-active')
    $('#active-city').hide()
})
$('.guangzhou').on('click', function() {
    faxianSearchInfo['addition_search']['activity_site_conutry'] = '国内'
    faxianSearchInfo['addition_search']['activity_site_province'] = '广东省'
    faxianSearchInfo['addition_search']['activity_site_city'] = '广州市'
    selectpagerender(location.href)
    $('.city-a-active').removeClass('city-a-active')
    $('.guangzhou').addClass('city-a-active')
    $('#active-city').hide()
})
$('.shenzhen').on('click', function() {
    faxianSearchInfo['addition_search']['activity_site_conutry'] = '国内'
    faxianSearchInfo['addition_search']['activity_site_province'] = '广东省'
    faxianSearchInfo['addition_search']['activity_site_city'] = '深圳市'
    selectpagerender(location.href)
    $('.city-a-active').removeClass('city-a-active')
    $('.shenzhen').addClass('city-a-active')
    $('#active-city').hide()
})


/**
 * 移除active
 * @param {} _data 
 */
function removeContentActive(_data) {
    for (var index = 0; index < _data.length; index++) {
        var element = _data[index];
        if (element.id) {
            $('#' + element.id).removeClass('active');
        }
    }
}


// 活动筛选数据渲染
function getinfo() {
    // 获取行业
    $.ajax({
        type: "GET",
        url: getIndustry,
        data: {},
        contentType: 'application/json',
        crossDomain: true == !(document.all),
        success: function(res) {
            if (res.flag == 0) {
                if (!res.data || res.data.length == 0) {
                    return
                }
                var item = '<div class="active-list-category  industry"><span class="industry-icon"></span> ' + '行业' +
                    '</div><div class="active-list-category-item hangye">'
                item += '<div style="position:relative"><input type="checkbox" checked  name="allselect2" id="allselect2" class="inputs" /><label for="allselect2">全部</label></div>'
                for (var j = 0; j < res.data.length; j++) {
                    item += '<div style="position:relative"><input type="checkbox" name="checkbox2" id="' + res.data[j].id + '" class="inputs" /><label for="' + res.data[j].id + '">' + res.data[j].name + '</label></div>'
                }
                $('.hangyeli').append(item)
                for (var i = 0; i < res.data.length; i++) {
                    $('#' + res.data[i].id).bind('click', { id: res.data[i].id, data: res.data }, industryChage)
                }
            }
        }
    });

    // 获取领域
    $.ajax({
        type: "GET",
        url: getField,
        data: {},
        contentType: 'application/json',
        crossDomain: true == !(document.all),
        success: function(res) {
            if (res.flag == 0) {
                if (!res.data || res.data.length == 0) {
                    // $('#lingyuLi').hide();
                    return
                }
                var item = '<div class="active-list-category field"><span class="industry-icon"></span> ' + '领域' +
                    '</div><div class="active-list-category-item lingyu">'
                item += '<div style="position:relative"><input type="checkbox" checked id="allselect1" name="allselect1" class="inputs" /><label for="allselect1">全部</label></div>'
                for (var j = 0; j < res.data.length; j++) {
                    item += '<div style="position:relative"><input type="checkbox" name="checkbox1" id="' + res.data[j].id + '"class="inputs" /><label for="' + res.data[j].id + '">' + res.data[j].name + '</label></div>'
                }
                $('.lingyuli').append(item)
                for (var i = 0; i < res.data.length; i++) {
                    $('#' + res.data[i].id).bind('click', { id: res.data[i].id, data: res.data }, fieldchage)
                }

            }
        }
    });
    // 时段
    var searchtime = [{
            name: '今天',
            id: 'jintian',
        },
        {
            name: '本周',
            id: 'benzhou'
        },
        {
            name: '本月',
            id: 'benyue'
        },
    ]

    var item = '<div class="active-list-category shiduan"><span class="industry-icon"></span> ' + '时段' +
        '</div><div class="active-list-category-item shiduan1">'
    item += '<div style="position:relative"><input type="checkbox" checked id="allselect3" name="allselect3" class="inputs" /><label for="allselect3">全部</label></div>'
    for (var j = 0; j < searchtime.length; j++) {
        item += '<div style="position:relative"><input type="checkbox" name="checkbox3" id="' + searchtime[j].id + '"class="inputs" /><label for="' + searchtime[j].id + '">' + searchtime[j].name + '</label></div>'
    }
    $('.shiduanli').append(item)
    for (var i = 0; i < searchtime.length; i++) {
        $('#' + searchtime[i].id).bind('click', { id: searchtime[i].id }, timechage)
    }



    // // 状态
    // var searchstate = [{
    //         name: '未开始',
    //         id: 'weikaishi',
    //         state: 3
    //     },
    //     {
    //         name: '进行中',
    //         id: 'jingxingzhong',
    //         state: 4,
    //     },
    //     {
    //         name: '已结束',
    //         id: 'yijieshu',
    //         state: 5,
    //     }
    // ]
    // var item = '<div class="active-list-category zhuangtai"><span class="industry-icon"></span> ' + '状态' +
    //     '</div><div class="active-list-category-item zhuangtai1">'
    // item += '<div><input type="checkbox" checked id="allselect4" name="allselect4" class="inputs" /><label for="allselect4">全部</label></div>'
    // for (var j = 0; j < searchstate.length; j++) {
    //     item += '<div><input type="checkbox" name="checkbox4" id="' + searchstate[j].id + '"class="inputs" /><label for="' + searchstate[j].id + '">' + searchstate[j].name + '</label></div>'
    // }
    // $('.zhuangtaili').append(item)
    // for (var i = 0; i < searchstate.length; i++) {
    //     $('#' + searchstate[i].id).bind('click', { id: searchstate[i].id, data: searchstate[i].state }, statechage)
    // }


    // 形式
    var searchxingshi = [{
            name: '线上活动',
            id: 'xianshang',
            activity_show_way: 'up'
        },
        {
            name: '线下活动',
            id: 'xianxia',
            activity_show_way: 'down'
        }
    ]
    var item = '<div class="active-list-category xingshi"><span class="industry-icon"></span> ' + '形式' +
        '</div><div class="active-list-category-item xingshi1">'
    item += '<div style="position:relative"><input type="checkbox" checked id="allselect5" name="allselect5" class="inputs" /><label for="allselect5">全部</label></div>'
    for (var j = 0; j < searchxingshi.length; j++) {
        item += '<div style="position:relative"><input type="checkbox" name="checkbox5" id="' + searchxingshi[j].id + '"class="inputs" /><label for="' + searchxingshi[j].id + '">' + searchxingshi[j].name + '</label></div>'
    }
    $('.xingshili').append(item)
    for (var i = 0; i < searchxingshi.length; i++) {
        $('#' + searchxingshi[i].id).bind('click', { id: searchxingshi[i].id }, xingshichage)
    }
}
getinfo()

// 每一项点击事件
// 领域
function fieldchage(e) {
    // 当其他选项不选中时，默认选中全部并请求数据
    $("input[name='allselect1']").prop("checked", $('input[name="checkbox1"]:checked').length === 0);
    if ($('input[name="checkbox1"]:checked').length === 0) {
        faxianSearchInfo['addition_search']['field'] = ''
        selectpagerender(location.href)
    } else if ($('#' + this.id).prop('checked') === true) {
        faxianSearchInfo['addition_search']['field'] = this.id
        $('input[name="checkbox1"]').prop('checked', false)
        $('#' + this.id).prop('checked', true)
        selectpagerender(location.href)
    }
}

function industryChage(e) {
    $("input[name='allselect2']").prop("checked", $('input[name="checkbox2"]:checked').length === 0);
    if ($('input[name="checkbox2"]:checked').length === 0) {
        faxianSearchInfo['addition_search']['industry'] = ''
        selectpagerender(location.href)
    } else if ($('#' + this.id).prop('checked') === true) {
        faxianSearchInfo['addition_search']['industry'] = this.id
        $('input[name="checkbox2"]').prop('checked', false)
        $('#' + this.id).prop('checked', true)
        selectpagerender(location.href)
    }
}

function timechage(e) {
    var _id = e.data.id
    switch (_id) {
        case 'jintian':
            // 今天
            var _tstart = new Date(dataParse(new Date(), 1) + ' 00:00:00');
            var _tend = new Date(dataParse(new Date(), 1) + ' 23:59:59');
            _tstart.setHours(_tstart.getHours() + 8);
            _tend.setHours(_tend.getHours() + 8);
            faxianSearchInfo.addition_search.first_start_time_or = _tstart;
            faxianSearchInfo.addition_search.last_start_time_or = _tend;
            break;
        case 'benzhou':
            // 本周
            faxianSearchInfo.addition_search.first_start_time_or = getWeekStartDate();
            faxianSearchInfo.addition_search.last_start_time_or = getWeekEndDate();
            break;
        case 'benyue':
            // 本月
            faxianSearchInfo.addition_search.first_start_time_or = getMonthStartDate();
            faxianSearchInfo.addition_search.last_start_time_or = getMonthEndDate();
            break;
    }
    $("input[name='allselect3']").prop("checked", $('input[name="checkbox3"]:checked').length === 0);
    if ($('input[name="checkbox3"]:checked').length === 0) {
        faxianSearchInfo['addition_search']['first_start_time_or'] = '';
        faxianSearchInfo['addition_search']['last_start_time_or'] = '';
    } else if ($('#' + this.id).prop('checked') === true) {
        $('input[name="checkbox3"]').prop('checked', false)
        $('#' + this.id).prop('checked', true)
    }
    // 日历页面不用时间筛选
    if (location.href.indexOf('networklive.html') !== -1) {
        searchdata2(faxianSearchInfo)
    } else {
        searchdata(faxianSearchInfo)
    }

}

// function statechage(e) {
//     $("input[name='allselect4']").prop("checked", $('input[name="checkbox4"]:checked').length === 0);
//     if ($('input[name="checkbox4"]:checked').length === 0) {
//         faxianSearchInfo['addition_search']['state'] = ''
//         searchdata(faxianSearchInfo)
//     } else if ($('#' + this.id).prop('checked') === true) {
//         faxianSearchInfo['addition_search']['state'] = e.data.data
//         $('input[name="checkbox4"]').prop('checked', false)
//         $('#' + this.id).prop('checked', true)
//         searchdata(faxianSearchInfo)
//     }

// }

function xingshichage(e) {
    var _id = e.data.id
    switch (_id) {
        case 'xianshang':
            // 线上
            faxianSearchInfo.addition_search.activity_show_way = 'up';
            break;
        case 'xianxia':
            // 线下
            faxianSearchInfo.addition_search.activity_show_way = 'down';
            break;
    }
    $("input[name='allselect5']").prop("checked", $('input[name="checkbox5"]:checked').length === 0);
    if ($('input[name="checkbox5"]:checked').length === 0) {
        faxianSearchInfo['addition_search']['activity_show_way'] = '';
        selectpagerender(location.href)
    } else if ($('#' + this.id).prop('checked') === true) {
        $('input[name="checkbox5"]').prop('checked', false)
        $('#' + this.id).prop('checked', true)
        selectpagerender(location.href)
    }
}
// 点击筛选数据时 判断当前页面并渲染对应数据
function selectpagerender(url) {
    if (url.indexOf('networklive.html') !== -1) {
        searchdata2(faxianSearchInfo)
    } else if (url.indexOf('calender_yue.html') !== -1) {
        var cc = JSON.parse($.cookie('shaixuanYue')).first_start_time_or
        var dd = JSON.parse($.cookie('shaixuanYue')).last_start_time_or
        faxianSearchInfo['addition_search']['first_start_time_or'] = cc
        faxianSearchInfo['addition_search']['last_start_time_or'] = dd
        searchdata3(faxianSearchInfo)
    } else if (url.indexOf('calender_ri.html') !== -1) {
        var ee = JSON.parse($.cookie('shiaxuanRi')).first_start_time_or
        var ff = JSON.parse($.cookie('shiaxuanRi')).last_start_time_or
        faxianSearchInfo['addition_search']['first_start_time_or'] = ee
        faxianSearchInfo['addition_search']['last_start_time_or'] = ff
        searchdata4(faxianSearchInfo)
    } else {
        searchdata(faxianSearchInfo)
    }
}




// 全部操作
// 行业
$(document).on('click', '#allselect2', function() {
        $('#allselect2').prop('checked', true)
        $('input[name="checkbox2"]').prop('checked', false)
        faxianSearchInfo['addition_search']['industry'] = ''
        selectpagerender(location.href)
    })
    // 领域
$(document).on('click', '#allselect1', function() {
        $('#allselect1').prop('checked', true)
        $('input[name="checkbox1"]').prop('checked', false)
        faxianSearchInfo['addition_search']['field'] = ''
        selectpagerender(location.href)
    })
    // 时段
$(document).on('click', '#allselect3', function() {
    $('#allselect3').prop('checked', true)
    $('input[name="checkbox3"]').prop('checked', false)
    faxianSearchInfo['addition_search']['first_start_time_or'] = ''
    faxianSearchInfo['addition_search']['last_start_time_or'] = ''
    selectpagerender(location.href)
})

$(document).on('click', '#allselect5', function() {
    $('#allselect5').prop('checked', true)
    $('input[name="checkbox5"]').prop('checked', false)
    faxianSearchInfo['addition_search']['activity_show_way'] = ''
    selectpagerender(location.href)
})



// 活动筛选点击隐藏
$(document).on('click', '.industry', function() {
    $('.hangye').toggle()
})
$(document).on('click', '.field', function() {
    $('.lingyu').toggle()
})
$(document).on('click', '.xingshi', function() {
    $('.xingshi1').toggle()
})
$(document).on('click', '.zhuangtai', function() {
    $('.zhuangtai1').toggle()
})
$(document).on('click', '.shiduan', function() {
    $('.shiduan1').toggle()
})


// 时间处理
function createTime(v) {
    var now = new Date(v);
    var yy = now.getFullYear(); //年
    var mm = now.getMonth() + 1; //月
    var dd = now.getDate(); //日
    var hh = now.getHours(); //时
    var ii = now.getMinutes(); //分
    var ss = now.getSeconds(); //秒
    var clock = yy + "-";
    if (mm < 10) clock += "0";
    clock += mm + "-";
    if (dd < 10) clock += "0";
    clock += dd + " ";
    if (hh < 10) clock += "0";
    clock += hh + ":";
    if (ii < 10) clock += '0';
    clock += ii + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return clock;
}

// 时间处理
function endTime(v) {
    var now = new Date(v);
    var yy = now.getFullYear(); //年
    var mm = now.getMonth() + 1; //月
    var dd = now.getDate(); //日
    var hh = now.getHours(); //时
    var ii = now.getMinutes(); //分
    var ss = now.getSeconds(); //秒
    var clock = "-";
    clock += hh + ':00';
    return clock;
}

// 公共渲染活动列表
function searchdata(faxianSearchInfo) {
    $('.content-right-main-list').html('');
    jQuery.support.cors = true;
    var res = getActiveInfo_unlink(faxianSearchInfo);
    if (res.totalElements < 12) {
        $('.searchPage-box').hide()
    } else {
        $('.searchPage-box').show()
    }
    var searchList = res.content;
    if (searchList.length === 0) {
        var item1 = '<div class="activenone"><span>暂无活动</span> <button>查看所有活动</button></div>'
        $('.content-right-main-list').append(item1)
    } else {
        for (var i = 0; i < searchList.length; i++) {
            var item = '<li id="content-right-list" class="content-right-list-item"><a <a title="' + searchList[i].activity_title + '" href="http://mk.yonyou.com/detail.html?id=' + searchList[i].id + '"><ul><li class="content-list-item-img"><img src="' +
                imgUrl + searchList[i]['meeting_cover'] + '" alt=""></li><li class="content-list-item-title content-common-text">' +
                searchList[i].activity_title
            item += '</li><li class="content-list-item-time content-common-text"><span class="content-list-item-time-icon"></span> 活动时间：' +
                createTime(searchList[i].activity_start_date)
            item += '</li><li class="content-list-item-addres content-common-text"><span class="content-list-item-addres-icon"></span>活动地点：' +
                currenStatus(searchList[i].activity_show_way) + ' </li></ul></a> </li>'
            $('.content-right-main-list').append(item)
        }
    }
}
// 公共渲染网络直播列表
function searchdata2(faxianSearchInfo) {
    $('.content-right-main-list').html('');
    jQuery.support.cors = true;
    var res = getActiveInfo_unlink(faxianSearchInfo);
    if (res.totalElements < 12) {
        $('.searchPage-box').hide()
    } else {
        $('.searchPage-box').show()
    }
    var searchList = res.content;
    if (searchList.length === 0) {
        var item1 = '<div class="activenone"><span>暂无活动</span> <button>查看所有活动</button></div>'
        $('.content-right-main-list').append(item1)
    } else {
        for (var i = 0; i < searchList.length; i++) {
            var item = '<li id="content-right-list" class="content-right-list-item"><a title="' + searchList[i].activity_title + '" href="http://mk.yonyou.com/detail.html?id=' + searchList[i].id + '"><ul><li class="content-list-item-img"><img src="' +
                imgUrl + searchList[i]['meeting_cover'] + '" alt=""></li><li class="content-list-item-title content-common-text">' +
                searchList[i].activity_title
            item += '</li><li class="content-list-item-time content-common-text"><span class="content-list-item-time-icon"></span> 活动时间：' +
                createTime(searchList[i].activity_start_date) + ' </li></ul></a> </li>'
            $('.content-right-main-list').append(item)
        }
    }
}
// 日历-月数据筛选
function searchdata3(faxianSearchInfo) {
    faxianSearchInfo.page_size = 500
    gjarr = []

    var res = getActiveInfo_unlink(faxianSearchInfo);
    yuefendate = res.content
        // datepicker.init('#datepicker');
        // datepicker.render()
    datepicker.render('gump-taday');
    datepicker.tdweekbgChange()
    datepicker.guilei()
}
// 日历-日数据筛选
function searchdata4(faxianSearchInfo) {
    var res = getActiveInfo_unlink(faxianSearchInfo);
    renderRidata(res.content)
    if (res.content.length) {
        active_day = []
        for (var i = 0; i < res.content.length; i++) {
            active_day.push({
                id: res.content[i].id,
                title: res.content[i].activity_title,
                start_time: createTime(res.content[i].activity_start_date),
                addres: res.content[i].activity_show_way
            })
        }
        $('.calender-ri-detail>li').html('')
        renderRidata(active_day)
    }
}

// 活动搜索
$('.search-inp>button').on('click', function() {
    faxianSearchInfo['addition_search']['title'] = $('.search-inp>input').val()
    selectpagerender(location.href)
})

// 判断状态
function currenStatus(_id) {
    switch (_id) {
        case 'up':
            // 线上
            return '线上活动'
            break;
        case 'down':
            // 线下
            return "线下活动"
            break;
        default:
            // 线下
            return ""
            break;
    }
}