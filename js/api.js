// 首页
var mkUrl = '//mk.yonyou.com/';
var imgUrl = 'http://mk.yonyou.com/';
// 正式地址
var basicUrl = window.location.href.indexOf('10.16.5.41') > 0 ? 'http://10.10.17.15:50003/' : 'http://mk.yonyou.com:8080/';
// 测试地址
// var basicUrl = 'http://10.10.17.15:50003/';
// 活动详情地址
var localUrl = window.location.href.indexOf('10.16.5.41') > 0 ? '/mk_portal/detail.html?id=' : '/detail.html?id=';
var searchUrl = window.location.href.indexOf('10.16.5.41') > 0 ? '/mk_portal/search.html?str=' : '/search.html?str=';
var singupUrl = window.location.href.indexOf('10.16.5.41') > 0 ? '/mk_portal/singup.html?id=' : '/singup.html?id=';
var typePageUrl = window.location.href.indexOf('10.16.5.41') > 0 ? '/mk_portal/type.html?type=' : '/type.html?type=';
var priactiveUrl = window.location.href.indexOf('10.16.5.41') > 0 ? '/mk_portal/priactive.html' : '/priactive.html';
var articleUrl = window.location.href.indexOf('10.16.5.41') > 0 ? '/mk_portal/article.html' : '/article.html';
var indexUrl = window.location.href.indexOf('10.16.5.41') > 0 ? '/mk_portal/index.html' : '/index.html';
var userUrl = window.location.href.indexOf('10.16.5.41') > 0 ? '/mk_portal/user.html' : '/user.html';

var bannerList = basicUrl + 'opservice/ad/html/page?location=pc'; // banner,广告 http://10.10.17.16:50003/opservice/ad/html/page
// 最新活动列表
var activityList = basicUrl + "activityservice/activitysearch/html/page";
// 推荐活动列表
var recomendList = basicUrl + "activityservice/activitysearch/html/page/recommend";
// 获取验证码 post
var getSmsCode = basicUrl + 'opservice/userlogin/get/smscode?phone=';
// 登录 post
var loginin = basicUrl + 'opservice/userlogin/login';
// 下面是详情
var post_base_url = basicUrl + 'activityservice/';
// 资料详情
var file_url = basicUrl;
// 获取活动详询信息
var query = post_base_url + 'activitymicrosite/query?activity_id=';
// 获取会议议程
var listschedule = post_base_url + 'activitymicrosite/listschedule?activity_id=';
// 获取参会嘉宾
var queryguest = post_base_url + 'activitymicrosite/queryguest?activity_id=';
// 获取文档资料
var filemanager = file_url + 'formbuilder/filemanager/html/page';
// 直播列表
var livemanager = post_base_url + 'activitylive/list';
// 通道详情
var channellist = post_base_url + "activitymicrosite/listchannel?activity_id=";
// 获取人员权限
var rangInfo = basicUrl + 'activityservice/weiApp/my/range/pc?aid=';
// 测试地址
var imgbascUrl = '//mk.yonyou.com/';
// 更新用户信息 post
var updateUserInfo = basicUrl + 'opservice/usercenter/updateUserInfo';
// 我参与的活动 post
var getMyActive = basicUrl + 'opservice/usercenter/my/activity';
// 通道详情
var channellist = post_base_url + 'activitymicrosite/listchannel?activity_id=';
// 获取报名表单
var listsignupform = post_base_url + 'activitymicrosite/listsignupform?channel_id=';
// 获取活动详询信息
var query = post_base_url + 'activitymicrosite/query?activity_id=';
// 报名活动
var singInfoUp = post_base_url + 'activitymicrosite/apply';
// 验证手机号
var testPhoneNumUrl = post_base_url + 'prticipantsearch/getbyphone';
// 更新用户信息 post
var updateUserInfo = basicUrl + 'opservice/usercenter/updateUserInfo';
// 我参与的活动 post
var getMyActive = basicUrl + 'opservice/usercenter/my/activity';
// 用户信息
var getUserInfo = basicUrl + 'opservice/usercenter/get/userinfo';
// 获取文章列表
var getArticleList = basicUrl + 'content-server/cnt_sys_article/page_query';
// 记录pc端浏览量
var setLivePvCount = basicUrl + 'activityservice/activitylive/update/pv/uv/type?type=pc&live_id=';
// 获取行业信息
var getIndustry = basicUrl + 'content-server/sys_industry/list';
// 获取领域信息
var getField = basicUrl + 'content-server/sys_field/list';
// 获取动态图片验证码
var getVarCodeUrl = basicUrl + 'opservice/verifycode/getcode';
// 获取注册手机验证码
var getZhuVarCodeUrl = basicUrl + 'opservice/userlogin/get/register/smscode';
// 注册
var registerDo = basicUrl + 'opservice/userlogin/register';
// 账号密码登录
var passwordLogin = basicUrl + 'opservice/userlogin/pwd/login';
// 获取用户的设置
var getUserSetting = basicUrl + 'opservice/user_sub/setting';
// 是否跳过
var getUserJump = basicUrl + 'opservice/user_sub/getJump';
// 获取用户的设置
var getUserPri = basicUrl + 'opservice/user_sub/get';
// 用户私享的活动列表
var getUserPriActive = basicUrl + 'opservice/user_sub/get/subActivity';
// 用户私享的文章列表
var getUserPriArticle = basicUrl + 'opservice/user_sub/get/subArticle';
// 获取国内城市
var getAllCity = basicUrl + 'opservice/opbasedocarea/allcity.json';
// 获取海外国家
var getAllcityAbroad = basicUrl + 'opservice/opbasedocarea/allcityAbroad.json';