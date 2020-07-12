function getActiveInfo_unlink(info) {
    jQuery.support.cors = true;
    var _data = [];
    $.ajax({
        url: activityList,
        type: 'POST',
        async: false, // 设置同步
        contentType: 'application/json',
        data: JSON.stringify(info),
        success: function(res) {
            if (res.flag == 0) {
                _data = res.data;
            } else {}
        }
    })
    return _data;
}