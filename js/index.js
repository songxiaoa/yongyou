var num = 0;
var text = '';
for (var i = 0; i < 4; i++) {
    num = i
    $('#plate' + num).bind('click', tab)
}
var cont = (
    `<div id="c_video_container"></div>`
)
function tab(e) {
    $('.plate-right li div').not(tab).removeClass('plate-active');
    var target = e.currentTarget;
    var tab = $($(target).find("div").get(0))
    //text = tab.text();
	var vid = target.dataset.vid;
    tab.addClass('plate-active');
    // $('.m-b div').text(text)
    //$('.plate-cont').html(cont);
	player1.play({vid: vid})
}


var player1 = new Txplayer({
  containerId: 'c_video_container',
  vid: 'j3117wy6h8p',
  width: '640px',
  height: '360px'
});
