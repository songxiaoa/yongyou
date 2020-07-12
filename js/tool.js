// 获取url中参数的值
function getQueryString (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]); return null;
}

// 将字符串转换为日期格式
function dataParse (ns, type) {
  var d = new Date(ns);
  var dformat = ''
  switch (type) {
    case 1:
      dformat = [d.getFullYear(), (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1, d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate()].join('-')
      break;
    case 2:
      dformat = [d.getFullYear(), (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1, d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate()].join('-') +
        ' ' + [d.getHours() < 10 ? '0' + (d.getHours()) : d.getHours(),
        d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes()
        ].join(':');
      break;
    case 3:
      dformat = [d.getFullYear(), (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1, d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate()].join('-') +
        ' ' + [d.getHours() < 10 ? '0' + (d.getHours()) : d.getHours(),
        d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes()
        ].join(':');
      break;
    case 4:
      dformat = [d.getHours() < 10 ? '0' + (d.getHours()) : d.getHours(),
      d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes()
      ].join(':');
      break;
    case 5:
      dformat = [(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1, d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate()].join('-') +
        ' ' + [d.getHours() < 10 ? '0' + (d.getHours()) : d.getHours(),
        d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes()
        ].join(':');
      break;
    case 6:
      dformat = [(d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1, d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate()].join('-');
      break;
  }
  return dformat;
}
/**
 * 活动的时间串
 * @param {*} start 
 * @param {*} end 
 */
function activeDateStr (start, end) {
  var _start = new Date(start);
  var _end = new Date(end);

  var _startYear = _start.getFullYear();
  var _endYear = _end.getFullYear();

  var _st = '';
  var _en = '';
  // 如果现在的年份等于开始时间
  if (dataParse(_start, 1) == dataParse(_end, 1)) {
    _st = dataParse(_start, 2);
    _en = dataParse(_end, 4);
  } else if (_startYear == _endYear) {
    _st = dataParse(_start, 1);
    _en = dataParse(_end, 6);
  } else {
    _st = dataParse(_start, 1);
    _en = dataParse(_end, 1);
  }
  return _st + ' - ' + _en
}

/**
 * 设置条形的活动
 */
function makeLineActive (element, type) {

  var _activeDom = '<a href="' + (localUrl + element.id) + '" class="search-active-list-item">';
  _activeDom += '<div class="search-active-list-item-cover">';
  _activeDom += '<img src="' + (imgUrl + element.meeting_cover) + '" alt="">';
  _activeDom += '</div>';
  if (type) {
    _activeDom += '<div class="search-item-content small-content">';
  } else {
    _activeDom += '<div class="search-item-content">';
  }
  _activeDom += '<p>' + element.activity_title + '</p>';
  _activeDom += '<p><img src="./assets/img/time.png" alt=""> ' + activeDateStr(element.activity_start_date, element.activity_end_date) + '</p>';
  if (element.activity_show_way == 'up') {
    _activeDom += '<p><img src="./assets/img/address.png" alt=""> 线上活动</p>';
  } else {
    var _didian = element.activity_site.province + element.activity_site.city + element.activity_site.district;
    _activeDom += '<p><img src="./assets/img/address.png" alt=""> ' + _didian + '</p>';
  }
  _activeDom += '</div>';
  _activeDom += '<div class="search-btn-pannel">';
  if (element.activity_end_date < Date.now()) {
    _activeDom += '<p class="go-look">查看详情</p>';
  } else {
    // 我要报名
    _activeDom += '<p class="go-detail">立即报名</p>';
  }
  _activeDom += '</div>';
  _activeDom += '</a>';
  return _activeDom;
}

/**
 * 设置为空
 */
function makeEmpty (title, btnInfo) {
  var _empty = '<div id="emptyPannel" class="empty-pannel">';
  _empty += '<img src="./assets/img/empty.png" alt="">';
  _empty += '<p>' + title + '</p>';
  _empty += '<p id="emptyBtn">' + btnInfo + '</p>';
  _empty += '</div>';
  return _empty;
}

/**
 * 设置公共的头部
 */
function makeTypeHeader (type, title, desc) {

  var _doms = '<div class="comon-header-top-inner">';
  _doms += '<p>【' + title + '】</p>';
  _doms += '<div>';
  _doms += '<p id="descTips">' + desc + '</p>';
  _doms += '</div></div>'
  var _back = "";
  switch (type) {
    case 'day':
      _back = "day-top";
      break;
    case 'up':
      _back = "up-top";
      break;
    case 'category':
      _back = "category-top";
      break;
    case 'wenzhang':
      _back = "wenzhang-top";
      break;
    case 'huodong':
      _back = "huodong-top";
      break;
  }
  $('#commonHeader').addClass(_back);
  $('#commonHeader').append(_doms);
}

/**
 * 设置地步的样式
 */
function countFooter () {
  if (document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)) {
    $("#footer").removeClass('footer-fixed');
  } else {
    $("#footer").addClass('footer-fixed');
  }
}