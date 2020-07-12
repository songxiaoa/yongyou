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
faxianSearchInfo.page_size = 12
    // 网络直播数据渲染 
$(function() {
    var res = getActiveInfo_unlink(faxianSearchInfo)
    faxianSearchInfo.page_number = res.page_number;
    if (res.totalElements > 12) {
        // 设置分页
        var h_options = {
            currentPage: faxianSearchInfo.page_number, //当前的请求页面。
            totalPages: Math.ceil(res.totalElements / 10), //一共多少页。
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
        for (var i = 0; i < res.content.length; i++) {
            var item = '<li id="content-right-list" class="content-right-list-item"><a title="' + res.content[i].activity_title + '" href="http://mk.yonyou.com/detail.html?id=' + res.content[i].id + '"><ul><li class="content-list-item-img"><img src="' +
                imgUrl + res.content[i].meeting_cover + '" alt=""></li><li class="content-list-item-title content-common-text">' + res.content[i].activity_title
            item += '</li><li class="content-list-item-time content-common-text"><span class="content-list-item-time-icon"></span> 直播时间：' +
                createTime(res.content[i].create_time)
            item += '</li></ul></a></li>'
            $('.content-right-main-list').append(item)
        }
    }
})


function getActiveInfor(pageNumber) {
    faxianSearchInfo.page_number = pageNumber;
    $('.content-right-main-list').html('');
    var res = getActiveInfo_unlink(faxianSearchInfo)
    for (var i = 0; i < res.content.length; i++) {
        var item = '<li id="content-right-list" class="content-right-list-item"><a title="' + res.content[i].activity_title + '" href="http://mk.yonyou.com/detail.html?id=' + res.content[i].id + '"><ul><li class="content-list-item-img"><img src="' + imgUrl + res.content[i].meeting_cover +
            '" alt=""></li><li class="content-list-item-title content-common-text">' + res.content[i].activity_title
        item += '</li><li class="content-list-item-time content-common-text"><span class="content-list-item-time-icon"></span> 直播时间：' + createTime(res.content[i].create_time)
        item += '</li></ul></a></li>'
        $('.content-right-main-list').append(item)
    }
}

function _searchActive(pageNumber) {
    faxianSearchInfo.page_number = pageNumber;
    var _data = getActiveInfo(faxianSearchInfo);
    $('.content-right-main-list').html('');
    if (_data.totalElements > 10) {
        // 设置分页
        var h_options = {
            currentPage: faxianSearchInfo.page_number, //当前的请求页面。
            totalPages: Math.ceil(_data.totalElements / 10), //一共多少页。
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
                _searchActive(page);
            }
        }
        $('#searchPage').bootstrapPaginator(h_options);
    }
    // 设置dom
    if (_data.content.length > 0) {
        $('.search-pages').show();
        for (var index = 0; index < _data.content.length; index++) {
            var element = _data.content[index];
            var _activeDom = makeLineActive(element);
            $("#searchSctiveList").append(_activeDom);
        }
    } else {
        $('.search-pages').hide();
        var _empty = makeEmpty('暂无活动', '查看所有活动');
        $("#searchSctiveList").append(_empty);
        $('#emptyBtn').bind('click', {}, function(e) {
            window.location.replace(searchUrl);
        })
    }
    countFooter();
}