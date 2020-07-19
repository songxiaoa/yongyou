

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
        $('#plate' + num).bind('click',{'id':num+1}, tab)
    }
    function tab(e) {
        $('.plate-right li div').not(tab).removeClass('plate-active');
            var target = e.currentTarget;
            var tab = $($(target).find("div").get(0))
            text = tab.text();
            tab.addClass('plate-active');
            // $('.m-b div').text(text)
            var id = e.data.id*1;
            switch (id) {
                case 1:
                    $('#container').html(`
                        <iframe class="default-css" src="https://v.qq.com/txp/iframe/player.html?vid=a00221hqpko" allowFullScreen="true"></iframe>
                    `)
                    break;
                case 2:
                    $('#container').html(`
                        <iframe class="default-css" src="https://v.qq.com/txp/iframe/player.html?vid=l002228mydt" allowFullScreen="true"></iframe>
                    `)   
                    break;
                case 3:
                    $('#container').html(`
                        <iframe class="default-css" src="https://v.qq.com/txp/iframe/player.html?vid=y0021yzp8ab" allowFullScreen="true"></iframe>
                    `) 
                    break;
                case 4:
                    $('#container').html(`
                        <iframe class="default-css" src="https://v.qq.com/txp/iframe/player.html?vid=e00237qmhcd" allowFullScreen="true"></iframe>
                    `) 
                    break;
                default:
                    break;
        }
    }