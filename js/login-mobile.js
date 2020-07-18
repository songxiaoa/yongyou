/* 
*/

// ;(function(){

//     jQuery(function($){
        
//         $('#login_top').load('register.html #header');


//         $('#login_footer').load('01footer.html');
//     })

// })();


;(function($){
    document.addEventListener('DOMContentLoaded',function(){

        let phone = document.querySelector('#phone');
        let code = document.querySelector('#code');
        let btn = document.querySelector('.button-div');
        let phone_error = document.querySelector('.phone-tip');
        let code_error = document.querySelector('.code-tip');
        let num_code = document.querySelector('.slot-code'); 

        // 点击登录
        btn.onclick = ()=>{

            let _phone = phone.value;
            let _code = code.value;

            console.log(_phone,_code)
            // let xhr = new XMLHttpRequest();
            // let status = [200,304];
            // xhr.onload = ()=>{
            //     if(status.indexOf(xhr.status)>=0){
            //         if(xhr.responseText==='success'){
            //             // 去首页
            //             location.href = 'index.html';
            //         }else if(xhr.responseText === 'fail'){
            //             // 失败
            //             error.style.display = 'block';
            //             error.innerHTML = '用户名或密码不正确';
            //         }
            //     }
            // }

            // xhr.open('post','../api/login.php',true);
            // // 设置请求头，以便后端接收post数据
            // xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
           
            if(_phone==''||!(/^1[3456789]\d{9}$/.test(_phone))){
                phone_error.style.display = 'block';
            }else{
                phone_error.style.display = 'none';   
                if(_code==''){
                    code_error.style.display = 'block';
                }else{
                    code_error.style.display = 'none';
                    if(_code!=='123456'){
                        code_error.style.display = 'block';
                        code_error.innerHTML = '验证码错误';
                    }else{
                        code_error.style.display = 'none';
                        window.alert('登录成功')
                        console.log('登录成功',_phone,_code)
                    }
                }
                    
            } 

        }

        // 电话号码输入触发
        phone.oninput = ()=>{
            if(phone.value!==''){
                $('.slot-code').addClass("active")
            }else {
                $('.slot-code').removeClass("active")
            }
        }
        // 发送验证码
        num_code.onclick = function() {
        
            if(phone.value=='') return false
            if(phone.value&&(/^1[3456789]\d{9}$/.test(phone.value))){
                $('.phone-tip').css({"display":"none"})
                var timeClock;
                function sendCode() {
                    var timer_num = 60;
                    timeClock=setInterval(function(){
                        timer_num--;
                        $('.slot-code').removeClass("active")
                        num_code.value = timer_num+'s';
                        num_code.setAttribute("disabled", true)
                        if (timer_num == 0) {
                            clearInterval(timeClock);
                            $('.slot-code').addClass("active")
                            num_code.value='发送验证码';
                            num_code.removeAttribute("disabled")
                        }
                    },1000)
                }
                sendCode()
            }else {
                $('.phone-tip').css({"display":"block"})
                
            }
        }
        
    });

})($);