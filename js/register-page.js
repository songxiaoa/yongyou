
;(function($){
    document.addEventListener('DOMContentLoaded',function(){
        
        // 点击注册下一步
        $(".register").click(function(){
            let reg_user_val = $('#reg_user').val();
            let reg_company_val = $('#reg_company').val();
            let reg_post_val = $('#reg_post').val();
            let reg_email_val = $('#reg_email').val();
            let reg_checked = $('#agree').is(":checked")
            console.log(reg_user_val,reg_company_val,reg_post_val,reg_email_val,reg_checked)
            window.location.href='register-page-two.html';
        　　if(reg_user_val== ''){
    
                $('.reg_user_error').css({
                    display:'block'
                })

            }else{
              
                $('.reg_user_error').css({
                    display:'none'
                })
            }
            
            if(reg_company_val== ''){
    
                $('.reg_company_error').css({
                    display:'block'
                })

            }else{
    
                $('.reg_company_error').css({
                    display:'none'
                })
            }

            if(reg_post_val== ''){
    
                $('.reg_post_error').css({
                    display:'block'
                })

            }else{
    
                $('.reg_post_error').css({
                    display:'none'
                })
            }

            if(reg_email_val== ''){
    
                $('.reg_email_error').css({
                    display:'block'
                })

            }else if((/^\w+@[a-z0-9]+\.[a-z]+$/i).test(reg_email_val)){
                // 正确
                $('.reg_email_error').css({
                    display:'none'
                })
            }else {
                $('.reg_email_error').css({
                    display:'block'
                })
                $('.reg_email_error').text('请输入正确的邮箱')
            }

            if(reg_checked){
                $('.reg_agree_error').css({display:'none'})
            }else {
                $('.reg_agree_error').css({display:'block',float:'none'})
            }
        });

        // 姓名输入
        // $('#reg_user').input(function(){
        //     console.log('-----')
        // })
    });

})($);