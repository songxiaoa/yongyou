var num = 0;
var text = '';
for (var i = 0; i < 4; i++) {
    num = i
    $('#plate' + num).bind('click', tab)
}

function tab(e) {
    $('.plate-right li div').not(tab).removeClass('plate-active');
    var target = e.currentTarget;
    var tab = $($(target).find("div").get(0))
    text = tab.text();
    tab.addClass('plate-active');
    $('.m-b div').text(text)
}