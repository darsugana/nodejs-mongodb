	jQuery(function($){
			var socket = io.connect('191.239.12.168:1710');
			var $nickForm = $('#setNick');
			var $nickError = $('#nickError');
			var $nickBox = $('#nickname');
			var $users = $('#users');
			var $messageForm = $('#send-message');
			var $messageBox = $('#msg');
			
			var $chat = $('#foo');
						$nickForm.submit(function(e){
				e.preventDefault();
				var d = new Date();
				var time = d.toLocaleTimeString();
				var nick=$nickBox.val();
				$('#psname').text(nick);
				$('#lastseen').text("last seen on "+ time);
				socket.emit('new user', $nickBox.val(), function(data){
					if(data){
						$('#nickWrap').hide();
						$('#contentWrap').show();
					} else{
						$nickError.html('That username is already taken!  Try again.');
					}
				});
				$nickBox.val('');
			});
			
			socket.on('usernames', function(data){
					
				var html = '';
				for(i=0; i < data.length; i++){
					html = data[data.length-1]
					
				}
				
			});
			
			$messageForm.submit(function(e){
				e.preventDefault();
				socket.emit('send message', $messageBox.val(), function(data){
					$chat.append('<span class="error">' + data + "</span><br/>");
				});
				$messageBox.val('');
			});
			
			socket.on('new message', function(data){
				 var d = new Date();
    var time = d.toLocaleTimeString();

				$chat.append('<div class="ui-grid-solo margin-solo"><img src="http://gokadabra.topuserapps.com/upload/admin/images/icon-dp.png" class="float-p" width="42" height="47" alt=""><div class="bubble-out"><b>' + data.nick + ': </b>' + data.msg + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
				
			$('html, body').animate({
    		scrollTop: $("#scrolly").offset().top}, 500);
			});
			
			socket.on('whisper', function(data){
				 var d = new Date();
    var time = d.toLocaleTimeString();
				$chat.append('<div class="ui-grid-solo margin-solo"><img src="http://gokadabra.topuserapps.com/upload/admin/images/icon-dp.png" width="42" height="47" alt=""><div class="chat-bubble bubble-in"><b>' + data.nick + ': </b>' + data.msg + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
				
			$('html, body').animate({
    		scrollTop: $("#scrolly").offset().top}, 500);
			});
		});