$(document).ready(function(){
			 //$("#new").html('<object data="http://adv.oozzme.com" style="width:100%">');
    		//$("#mypage1").css("display","none");
			//$("#mypage2").css("display","none");
			//$("#mypage3").css("display","none");
			//$("#mypage4").css("display","none");
			 var d = new Date();
    var time = d.toLocaleTimeString();

        		
				
			$("#chaxt").click(function(){
        		
				$("#send-message").submit();
			
    		
    		});
			
			$("#btn-info").click(function(){
				window.location.href = "group-info.html";
						});
			
				$("#btn-email").click(function(){
				alert("Your conversation has been successfully e-mailed.");
				
				
				});	
				$("#btn-delete").click(function(){
				alert("You Are About to Delete All Your Chats Click 'OK' to Confirm");
				window.location.href= "chats-with-search.html";
				
				});	
				$("#wlt").click(function(){
				window.location.href = "wallet.html";
						});	
            $("#btn-clear").click(function(){
				
				$("#container").replaceWith("");
				alert("Conversation cleared successfully!!");
				
				});	
			
			$("#exit-btn").click(function(){
				
    			$(this).hide(100);
				$("#exited").show(100);
				$("#type").hide(100);
			});
			$('#attach-icon').click(function(){
				
					$('#attach').toggle();
			
					$('#block-hide').toggle();
			});
			$('#cancel1').click(function(){
				
					
			
					$('#attach').hide();
					$('#block-hide').toggle();
					
			});
			$("#set12").click(function(){
			
				$("#ul2").fadeOut();
				$("#ul1").fadeIn(1000);
				
			
			});
		$("#back").click(function(){
			
				$("#ul1").fadeOut();
				$("#ul2").fadeIn(1000);
				
			
			});  
		$("#setting").click(function(){
				window.location.href = "setting.html";
						});
		$("#btn-invite").click(function(){
				window.location.href = "invites.html";
						});
			$("#btn-wallet").click(function(){
				window.location.href = "wallet.html";
						});
			$("#btn-newgrp").click(function(){
				window.location.href = "group-info1.html";
						});
			$("#btn-broadcast").click(function(){
				window.location.href = "broadcast-with-search.html";
						});
			$("#btn-faq").click(function(){
				window.location.href="faq.html";
				});
			$("#btn-terms").click(function(){
				window.location.href="terms.html";
				});
			$("#btn-profile").click(function(){
				window.location.href="profile-info-Copy2.html";
				});
			$("#btn").click(function(){
				window.location.href="chats-with-search.html";
				});    
			 $('#logo').click(function(){
					
					window.location.href="group-info.html";
					
					});
			$('#goshop').click(function(){
					
					window.location.href="shopom/index.html";
					
					});
					
					
			
		});