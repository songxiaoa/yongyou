
;(function($){
    document.addEventListener('DOMContentLoaded',function(){
        
        // 下一步按钮
        $(".register").click(function(){
            let reg_user_val = $('#reg_user').val();
            let reg_company_val = $('#reg_company').val();
            let reg_post_val = $('#reg_post').val();
            let reg_email_val = $('#reg_email').val();
            let reg_checked = $('#agree').is(":checked")
            console.log(reg_user_val,reg_company_val,reg_post_val,reg_email_val,reg_checked)
            
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
                if(reg_checked){
                    $('.reg_agree_error').css({display:'none'})
                    $('.one-bar').addClass('pager-bar-complete')
                    $('.two-bar').addClass('pager-bar-current')
                    $('.m-r-p1').text('选择分论坛')
                    $('#one-content').css({display:'none'})
                    $('#two-content').css({display:'block'})
                }else {
                    $('.reg_agree_error').css({display:'block',float:'none'})
                }
            }else {
                $('.reg_email_error').css({
                    display:'block'
                })
                $('.reg_email_error').text('请输入正确的邮箱')
            }

            
        });
        // 勾选协议
        $('#agree').click(function(){
            if($('#agree').is(":checked")){
                $('.red-bar').addClass('bar-active')
                // $('.reg_agree_error').css({display:'none'})
            }else {
                $('.red-bar').removeClass('bar-active')
                // $('.reg_agree_error').css({display:'block',float:'none'})
            }
        } );
       
        //全选/全不选功能
        $("#all").click(function(){
            $(".check_item").prop("checked",$(this).prop("checked"));
        });
        //单个单选框绑定点击事件
        $(document).on("click",".check_item",function(){
            var flag=$(".check_item:checked").length==$(".check_item").length;
            $("#all").prop("checked",flag);
        });
        // 所有勾选触发
        $('#two-content input:checkbox').click(function(){
            // 控制进度条高亮
            if($("#two-content input:checkbox:checked").length){
                // 只要勾选一个就高亮
                $('.red-bar-two').addClass('bar-active')
            }else {
                $('.red-bar-two').removeClass('bar-active')
            }
        })
         // 提交按钮
         $('.submit').click(function(){
            var arr = new Array();
            $("#two-content .check_item:checked").each(function(i){
                arr[i] = $(this).val();
            });
            if(arr.length>0){
                $('.m-r-p1').text('注册完成')
                $('.red-bar').addClass('bar-active')
                $('.red-bar-two').addClass('bar-active')
                $('.one-bar').addClass('pager-bar-complete')
                $('.two-bar').addClass('pager-bar-complete')
                $('.three-bar').addClass('pager-bar-complete')
                $('#one-content').css({display:'none'})
                $('#two-content').css({display:'none'})
                $('#three-content').css({display:'block'})
            }
            console.log(arr,'提交勾选的值');
        } );






    });

})($);