

// var cont = (
//     `<video width="640" height="360" controls  poster="./images/tu_gaofengduihua.png">
//         <source src="./images/video/movie.ogg"  type="video/mp4">
//         <source src="./images/video/movie.ogg"  type="video/ogg">
//         您的浏览器不支持 HTML5 video 标签。
//     </video>`
// )

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
  vid: 'j311896butu',
  width: '860px',
  height: '500px'
});

