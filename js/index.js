var recommend = []
    // 获取最新活动数据
$(function() {
    faxianSearchInfo.page_size = 12
    var res = getActiveInfo_unlink(faxianSearchInfo)
    activityListInfo = res.content;
    faxianSearchInfo.page_number = res.page_number;
    if (res.totalElements > 12) {
        // 设置分页
        var h_options = {
            currentPage: faxianSearchInfo.page_number, //当前的请求页面。
            totalPages: Math.ceil(res.totalElements / 12), //一共多少页。
            bootstrapMajorVersion: 3, //bootstrap的版本要求。
            alignment: 'center',
            numberOfPages: 5, //控制分页按钮数量
            itemTexts: function(type, page, current) {
                //如下的代码是将页眉显示的中文显示我们自定义的中文。
                switch (type) {
                    case 'first':
                        return '首页'
                    case 'prev':
                        return '上一页'
                    case 'next':
                        return '下一页'
                    case 'last':
                        return '末页'
                    case 'page':
                        return page
                }
            },
            onPageClicked: function(event, originalEvent, type, page) {
                getActiveInfor(page);
            }
        }
        $('#searchPage').bootstrapPaginator(h_options);
        for (var i = 0; i < activityListInfo.length; i++) {
            var item = '<li id="content-right-list" class="content-right-list-item"> <a title="' + activityListInfo[i].activity_title + '" href="http://mk.yonyou.com/detail.html?id=' + activityListInfo[i].id + '"><ul><li class="content-list-item-img"><img src="' +
                imgUrl + activityListInfo[i].meeting_cover +
                '" alt=""></li><li class="content-list-item-title content-common-text">' + activityListInfo[i].activity_title
            item += '</li><li class="content-list-item-time content-common-text"><span class="content-list-item-time-icon"></span> 活动时间：' +
                createTime(activityListInfo[i].activity_start_date)
            item += '</li><li class="content-list-item-addres content-common-text"><span class="content-list-item-addres-icon"></span>活动地点：' +
                currenStatus(activityListInfo[i].activity_show_way) + ' </li></ul></a></li>'
            $('.content-right-main-list').append(item)
        }
        if (activityListInfo.length < 12) {
            $('searchPage-box').html('')
        }
    }
})

var arr = ['allselect1', 'allselect2', 'allselect3', 'allselect4', 'allselect5']
    // 点击下一页的时候重新渲染页面
function getActiveInfor(pageNumber) {
    faxianSearchInfo.page_number = pageNumber;
    $('.content-right-main-list').html('');
    var res = getActiveInfo_unlink(faxianSearchInfo)
    activityListInfo = res.content;
    for (var i = 0; i < activityListInfo.length; i++) {
        var item = '   <li id="content-right-list" class="content-right-list-item"><a title="' + activityListInfo[i].activity_title + '" href="http://mk.yonyou.com/detail.html?id=' + activityListInfo[i].id + '"> <ul><li class="content-list-item-img"><img src="' +
            imgUrl + activityListInfo[i].meeting_cover + '" alt=""></li><li class="content-list-item-title content-common-text">' +
            activityListInfo[i].activity_title
        item += '</li><li class="content-list-item-time content-common-text"><span class="content-list-item-time-icon"></span> 活动时间：' +
            createTime(activityListInfo[i].activity_start_date)
        item += '</li><li class="content-list-item-addres content-common-text"><span class="content-list-item-addres-icon"></span>活动地点：' +
            currenStatus(activityListInfo[i].activity_show_way) + ' </li></ul></a></li>'
        $('.content-right-main-list').append(item)
    }
}


// 推荐数据渲染
$(function() {
    jQuery.support.cors = true;
    $.ajax({
        url: recomendList,
        type: 'POST',
        datatype: 'json',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(res) {
            recommend = res.data;
            for (var i = 0; i < recommend.length; i++) {
                var item = '   <li id="content-right-list" class="content-right-list-item"><a title="' + recommend[i].activity_title + '" href="http://mk.yonyou.com/detail.html?id=' + recommend[i].id +
                    '"><ul><li class="content-list-item-img"><img src="' +
                    imgUrl + recommend[i].meeting_cover + '" alt=""></li><li class="content-list-item-title content-common-text">' + recommend[i].activity_title
                item += '</li><li class="content-list-item-time content-common-text"><span class="content-list-item-time-icon"></span> 活动时间：' +
                    createTime(recommend[i].activity_start_date)
                item += '</li><li class="content-list-item-addres content-common-text"><span class="content-list-item-addres-icon"></span>活动地点：' +
                    currenStatus(recommend[i].activity_show_way) + ' </li></ul></a></li>'
                $('.content-right-banner-box').append(item)
            }
        }
    })
})

// 推荐数据手动轮播
var boxw = recommend.length
var itemw = parseInt($('.content-right-list-item').css('width')) + 14
$('.content-right-banner-box').css("width", boxw * itemw + "px")

var currentleft = 0
$('.content-right-title-pre').click(function() {
    currentleft += 242
    if (currentleft > 0) {
        currentleft = 0
    }
    if (currentleft > -968) {
        $('.banner-progress-item2').removeClass('banner-progress-active')
        $('.banner-progress-item').addClass('banner-progress-active')
    }
    $('.content-right-banner-box').css("left", currentleft + "px")
})
$('.content-right-title-next').click(function() {
    currentleft -= 242
    if (currentleft <= -968) {
        currentleft = -968
        $('.banner-progress-item').removeClass('banner-progress-active')
        $('.banner-progress-item2').addClass('banner-progress-active')
    }
    $('.content-right-banner-box').css("left", currentleft + "px")
})