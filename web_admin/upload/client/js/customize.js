jQuery(function($){
			var socket = io.connect('191.239.12.168:1710');
			
			var $nickForm = $('#setNick');
			var $nickError = $('#nickError');
			var $nickBox = $('#nickname');
			
			var $users = $('#myusers');
			var $messageForm = $('#send-message');
			var $messageBox = $('#msg');
			var $messageBox1 = $('#msg');
			var $chat = $('#foo');
			$("#psreg").click(function(){
				$(this).hide();
				$("#errmmsg").text("Please Enter Detail Below to SignUp.");
				$nickForm.slideUp(500);
				$("#setRegg").slideDown(1000);
				
				
				
				
			});
			
			$("#setRegg").submit(function(e){
				e.preventDefault();
				  $.ajaxPrefilter(function (options) {
                            if (options.crossDomain && jQuery.support.cors) {
                                var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                                options.url = http + '//cors-anywhere.herokuapp.com/' + "http://gokadabra.topuserapps.com/account/serviceSignup";

                            }
                        });
                        $.post($(this).attr('action'), $(this).serialize(), function (json) {
                            var new_value = JSON.parse(JSON.stringify(json));
                            console.log(new_value);
                            if (new_value.success === true) {
                                
                               console.log('success');
								$("#errmmsg").html("<div class='message success'><i class='fa fa-check'></i><p class='color-white'>Successfully Registered. Thank you for signing up with us.</p></div>");
                               	$("#setRegg").slideUp(500);
								$("#dh").slideUp(500);
								
								$("#setNick").slideDown(1000);
                                //$("#msg").text(new_value.message);
                            } else { 
									$("#errmmssg").after("<div class='message error'><i class='fa fa-exclamation'></i><p class='color-white'>" + new_value.message + "</p></div>");

							}
                        }, 'json');
                        return false;
			
			});
			$nickForm.submit(function(e){
				e.preventDefault();
				  $.ajaxPrefilter(function (options) {
                            if (options.crossDomain && jQuery.support.cors) {
                                var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                                options.url = http + '//cors-anywhere.herokuapp.com/' + "http://gokadabra.topuserapps.com/account/serviceLogin";

                            }
                        });
                        $.post($(this).attr('action'), $(this).serialize(), function (json) {
                            var new_value = JSON.parse(JSON.stringify(json));
                            console.log(new_value);
                            if (new_value.success === true) {
                                
                                console.log('success');
									var d = new Date();
									var time = d.toLocaleTimeString();
									var nick=$nickBox.val();
									$('#psname').text(nick);
									$('#lastseen').text("last seen on "+ time);
									socket.emit('new user', $nickBox.val(), function(data){
										if(data){
											$('#nickWrap').hide();
											$('#myusers').show();
											
										} else{
											$nickError.html('That username is already taken!  Try again.');
										}
									});
									$nickBox.val('');
                                //$("#msg").text(new_value.message);
                            } else { 
									$("#nick23").after("<div class='message error'><i class='fa fa-exclamation'></i><p class='color-white'>" + new_value.message + "</p></div>");
									$("#errmmsg").html('');
							}
                        }, 'json');
                        return false;
			
			});
			socket.on('adnames', function(data){
				var d = new Date();
									var time = d.toLocaleTimeString();
				var html = '';
				for(i=0; i < data.length; i++){
					html+='<li id="'+data.indexOf(data[i])+'" class="ui-li-has-thumb ui-first-child ui-last-child"><a href="#" class="ps-user-list ui-btn">';
                        html+='<img class="ps-userpic" src="images/avatar_2x.png">';
                         html+='<h2 class="ps-username">'+data[i]+'</h2>';
						  html+='<p><i class="fa fa-circle ps-userstatus">&nbsp;&nbsp;Online</i></p>';
                         html+='<p class="ui-li-aside"><strong>'+time+'</strong>PM</p>';
                     html+='</a></li>';
				}
				$users.html(html);
			});
			$("#myusers").on('click','li',function(e){
					e.preventDefault();
					$('#myusers').hide();
					
					$("#contentWrap").show();
					var thisname=$(this).find("h2").text();
					$messageForm.submit(function(e){
				e.preventDefault();
				var mymsg ='/w '+thisname+' '+$messageBox.val();
				socket.emit('send message1', mymsg, function(data){
					$chat.append('<span class="error">' + data + "</span><br/>");
				});
					
						var d = new Date();
						var time = d.toLocaleTimeString();	
						$("#foo").append('<div class="ui-grid-solo margin-solo"><img src="http://gokadabra.topuserapps.com/upload/client/images/icon-dp.png" class="float-p" width="42" height="47" alt=""><div class="bubble-out">'+ $messageBox.val() + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
					$('#msg').val('');
					$('html, body').animate({
					scrollTop: $("#scrolly").offset().top}, 500);
			});
			
					$messageBox.val('');
			});
			
			
			
			/*$messageForm.submit(function(e){
				e.preventDefault();
				var mymsg ='/w admin '+$messageBox.val();
				socket.emit('send message', mymsg, function(data){
					$chat.append('<span class="error">' + data + "</span><br/>");
				});
				var d = new Date();
    var time = d.toLocaleTimeString();	
				$("#foo").append('<div class="ui-grid-solo margin-solo"><img src="http://gokadabra.topuserapps.com/upload/client/images/icon-dp.png" class="float-p" width="42" height="47" alt=""><div class="bubble-out">'+ $messageBox.val() + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
			$('#msg').val('');
			$('html, body').animate({
    		scrollTop: $("#scrolly").offset().top}, 500);
			});*/
			
			socket.on('new message1', function(data){
				var d = new Date();
    var time = d.toLocaleTimeString();	

				$chat.append('<div class="ui-grid-solo margin-solo"><img src="http://gokadabra.topuserapps.com/upload/client/images/icon-dp.png" width="42" height="47" alt=""><div class="chat-bubble bubble-in">' + data.msg + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
			
			$('html, body').animate({
    		scrollTop: $("#scrolly").offset().top}, 500);
			});
			
			socket.on('whisper', function(data){
				 var d = new Date();
    var time = d.toLocaleTimeString();
				$chat.append('<div class="ui-grid-solo margin-solo"><img src="http://gokadabra.topuserapps.com/upload/client/images/icon-dp.png" width="42" height="47" alt=""><div class="chat-bubble bubble-in"><b>' + data.nick + ': </b>' + data.msg + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
				/*$chat.append('<div class="ui-grid-solo margin-solo"><img src="http://gokadabra.topuserapps.com/upload/client/images/icon-dp.png" class="float-p" width="42" height="47" alt=""><div class="bubble-out"><b>' + data.msg + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');*/
			
			$('html, body').animate({
    		scrollTop: $("#scrolly").offset().top}, 500);
			});
		});