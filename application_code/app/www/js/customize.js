var permanentStorage = window.localStorage;
var tempStorage = window.sessionStorage;
jQuery(function($){
		//var socket = io.connect('191.239.12.168:1710');
		var socket = io.connect('45.40.143.98:4732');
		$(".h-btn").hide();
		var $nickForm = $('#setNick');
		var $nickError = $('#nickError');
		var $nickBox = $('#nickname');
		
		var $users = $('#myusers');
		var $messageForm = $('#send-message');
		var $messageBox = $('#msg');
		var $messageBox1 = $('#msg');
		var $chat = $('#foo');
		var chatSession = {};
		//permanentStorage.removeItem("chatDataHistory");

		users = {};
		var pictureSource;   // picture source
        var destinationType; // sets the format of returned value
        document.addEventListener("deviceready",onDeviceReadyPhoto,false);

        function convertImgToBase64URL(url, callback, outputFormat){
		    var img = new Image();
		    img.crossOrigin = 'Anonymous';
		    img.onload = function(){
		        var canvas = document.createElement('CANVAS'),
		        ctx = canvas.getContext('2d'), dataURL;
		        canvas.height = this.height;
		        canvas.width = this.width;
		        ctx.drawImage(this, 0, 0);
		        dataURL = canvas.toDataURL(outputFormat);
		        callback(dataURL);
		        canvas = null; 
		    };
		    img.src = url;
		}

        function onDeviceReadyPhoto() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
        }

        function onPhotoURISuccess(imageURI) {
            convertImgToBase64URL(imageURI, function(base64Img){

            	var username = permanentStorage.getItem("userName");
				var adminUser = $("#adminId").val();
				var imageData = {
					'chatImage' : base64Img,
					'chatUser' : username,
					'chatAdmin' : adminUser 
				};				
				socket.emit('send img to admin', imageData);


				var chatHImage = {
					'chatImage' : base64Img,
					'chatMsg' : '',
					'chatUser' : username,
					'chatAdmin' : adminUser,
					'image' : true,
					'Type' : 'To Admin'
				};

				if(permanentStorage.getItem("chatDataHistory") != null){
					var chatSave = JSON.parse(permanentStorage.getItem("chatDataHistory"));

					if(typeof chatSave[username] !== 'undefined'){
						chatSave[username].push(chatHImage);
						permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSave));
					} else {
						chatSave[username] = [];
						chatSave[username].push(chatHImage);
						permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSave));
					}					
				} else {
					chatSession[username].push(chatHImage);
					permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSession));
				}

				//socket.emit('send img', base64Img, function(data1){ });
			},'image/png');

			$chat.append('<div class="ui-grid-solo margin-solo"><div class="bubble-out"><img style="width:100%;height:auto;" src="' + imageURI + '"/>' + '<div class="align-r"><span>11</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
			$('html, body').animate({scrollTop: $("#scrolly").offset().top}, 500);
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

        function getPhoto(source) {
            navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                        destinationType: destinationType.FILE_URI,
                                        sourceType: source });
        }

        $('#getPhotoFromGallery').bind('click', function(){
        	getPhoto(pictureSource.PHOTOLIBRARY);
        });

		/*$('#imagefile').bind('change', function(e){
			  var data = e.originalEvent.target.files[0];
			  var reader = new FileReader();
			  reader.onload = function(evt){
				//image('me', evt.target.result);
				var username = permanentStorage.getItem("userName");
				var mymsg = username+': '+$messageBox.val();
				
				socket.emit('send img', evt.target.result, function(data1){
					//$chat.append('<span class="error">' + data1 + "</span><br/>");
				});	

				$chat.append('<div class="ui-grid-solo margin-solo"><div class="bubble-out"><img style="width:100%;height:auto;" src="' + evt.target.result + '"/>' + '<div class="align-r"><span>11</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
				$('html, body').animate({scrollTop: $("#scrolly").offset().top}, 500);

			  };
			  reader.readAsDataURL(data);
			  
		});*/
			 
			
			socket.on('chat img from admin', function(data){	

				var username = permanentStorage.getItem("userName");
				var adminUser = $("#adminId").val();
				var chatHImageFromAdmin = {
					'chatImage' : data.img,
					'chatMsg' : '',
					'chatUser' : username,
					'chatAdmin' : adminUser,
					'image' : true,
					'Type' : 'From Admin'
				};

				if(permanentStorage.getItem("chatDataHistory") != null){
					var chatSave = JSON.parse(permanentStorage.getItem("chatDataHistory"));

					if(typeof chatSave[username] !== 'undefined'){
						chatSave[username].push(chatHImageFromAdmin);
						permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSave));
					} else {
						chatSave[username] = [];
						chatSave[username].push(chatHImageFromAdmin);
						permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSave));
					}

					
				} else {
					chatSession[username].push(chatHImageFromAdmin);
					permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSession));
				}

				$chat.append('<div class="ui-grid-solo margin-solo"><div class="bubble-in"><img style="width:100%;height:auto;" src="' + data.img + '"/>' + '<div class="align-r"><span>11</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
				$('html, body').animate({scrollTop: $("#scrolly").offset().top}, 500);
			});

			socket.on('chat over admin', function(data){	
				var d = new Date();
    			var time = d.toLocaleTimeString();
				$chat.append('<div class="ui-grid-solo margin-solo"><div class="bubble-in">' + data.msg + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
				$('html, body').animate({scrollTop: $("#scrolly").offset().top}, 500);
				$("#type").hide();
				$(".retry").show();
			});				

			
			socket.on('join chat response', function(data){
				if(data.status_code==1)
				{					
					$(".ui-loader").hide();
					$('#nickWrap').hide();
					$('#contentWrap').show();	
					$(".h-btn").show();
					//$chat.html("");
					$("#type").show();
					$(".retry").hide();
					$("#adminId").val(data.adminId);
					$("#pageone").addClass("chatImage");
					users[data.adminId] = socket;
				}
				else
				{	
					$(".ui-loader").hide();
					$('#nickWrap').hide();
					$('#contentWrap').show();
					$(".h-btn").show();				
					$("#type").hide();
					$(".retry").show();
					$chat.append('<div class="ui-grid-solo margin-solo"><div class="bubble-in"> '+ data.msg + ' </div>');
					$('html, body').animate({scrollTop: $("#scrolly").offset().top}, 500);					
					$("#adminId").val("");
					$("#pageone").addClass("chatImage");
					
				}
				loadHistory();
			});			
			
			$(".retry").click(function(){
				$(".ui-loader").show();
				var username = permanentStorage.getItem("userName");
				var loginDetails={  
					id : username,  
					username : username,
					pic:'pic'
				};
				socket.emit('new user', loginDetails);
				socket.emit('join chat', function(data){
					if(data){
						$(".ui-loader").hide();
						$('#nickWrap').hide();
						$('#contentWrap').show();
						$(".h-btn").show();
						$("#type").show();
						$(".retry").hide();
					} else{
						alert('That username is already taken!  Try again.');
						$(".ui-loader").hide();
						$('#nickWrap').show();
						$('#contentWrap').hide();
						$(".h-btn").hide();
						$("#type").show();
						$(".retry").hide();
					}
				});
			});

			$("#psreg").click(function(){
				$(this).hide();
				$("#errmmsg").text("Please Enter Detail Below to SignUp.");
				$nickForm.slideUp(500);
				$("#setRegg").slideDown(1000);
			});


			$(".fbLogin").click(function(){
			    if (!window.cordova) {
			        var appId = prompt("Enter FB Application ID", "");
			        facebookConnectPlugin.browserInit(appId);
			    }
			    
			    facebookConnectPlugin.login( ['email'],
                    function (response) {
                        if (response.status=="connected"){
                        	facebookConnectPlugin.api("me/?fields=id,email,name", ["public_profile"],
						        function(response) {
						            permanentStorage.setItem("faceBookResp", JSON.stringify(response));
						            FBSignUp(response);
						        }, function(response) {
						            //alert("Fail: "+JSON.stringify(response))
						        });
						}
                    },
                    function (response) {
                    	//alert(JSON.stringify(response));
                    }
				);
			});

	
			function FBSignUp(results){				
					var signUpDetails={
						name : results.name,
						email : results.email,
						phone : results.id
					};
					socket.emit('new user signup facebook', signUpDetails);

					socket.on('new user signup response', function(dataResp){
						if(dataResp.status == true){
							$(".psname").html("");
							$(".ui-loader").hide();
							permanentStorage.setItem('loginSession', true);
							permanentStorage.setItem("userName", dataResp.name);

							chatSession[dataResp.name] = [];
							socket.emit('join chat', function(data){
								if(data){
									$(".ui-loader").hide();
									$('#nickWrap').hide();
									$('#contentWrap').show();
									$(".h-btn").show();
									$("#type").show();
									//$chat.html("");
									$(".retry").hide();
								} else{
									alert('That username is already taken!  Try again.');
									$(".ui-loader").hide();
									$('#nickWrap').show();
									$('#contentWrap').hide();
									$(".h-btn").hide();
									$("#type").show();
									$(".retry").hide();
								}
							});

						} else {
							$(".psname").html(dataResp.msg);
							$(".ui-loader").hide();
						}
					});
			} 
			
			//Automatic Login Start
			function autoLogin(){
				$("#nickWrap").hide();
				$(".ui-loader").show();
				if(permanentStorage.getItem('loginSession') != null && permanentStorage.getItem("userName") != null){
					
					var username = permanentStorage.getItem("userName");
					var loginDetails={
						id : username,
						username : username
					};
										
					chatSession[username] = [];

					socket.emit('new user', loginDetails);

					socket.on('new user response', function(data){
						if(data.status == true){							
							$(".nickname").html("");
							$(".ui-loader").hide();							
							socket.emit('join chat', function(data){
								if(data){
									$(".ui-loader").hide();
									$('#nickWrap').hide();
									$('#contentWrap').show();
									$(".h-btn").show();
									$("#type").show();
									//$chat.html("");
									$(".retry").hide();
								} else{
									alert('That username is already taken! Try again.');
									$(".ui-loader").hide();
									$('#nickWrap').show();
									$('#contentWrap').hide();
									$(".h-btn").hide();
									$("#type").show();
									$(".retry").hide();
								}
							});
						} else {
							$(".nickname").html(data.msg);
							$('#nickWrap').show();
							$('#contentWrap').hide();
							$(".h-btn").hide();
							$("#type").hide();
							$(".retry").hide();
							$(".ui-loader").hide();
						}
					});
						
				} else {
						$(".ui-loader").hide();
						$('#nickWrap').show();
						$('#contentWrap').hide();
						$(".h-btn").hide();
				}	          

			} 
			//Automatic Login End
			autoLogin();
			
			//Logout Start
			$(".logoutFromApp").click(function(){
				var username = permanentStorage.getItem("userName");		        
		        if($("#adminId").val() != ''){
		          var exitChat = {
		            adminId : $("#adminId").val(),
		            userId : username
		          };
		          socket.emit('exit chat', exitChat);
		        }	        
				if (!window.cordova) {
					permanentStorage.removeItem('loginSession');
					permanentStorage.removeItem('userName');
                 	location.reload();
				} else {
					if(permanentStorage.getItem("faceBookResp") != null){
						facebookConnectPlugin.logout(
                                function (response) { 
                                 	//alert(JSON.stringify(response)); 
                                 	permanentStorage.removeItem("faceBookResp"); 
                                 	permanentStorage.removeItem('loginSession');
									permanentStorage.removeItem('userName');
                                 	location.reload();
                                }, 
                                function (response) {
                                  	//alert("2"+JSON.stringify(response))
                                  	permanentStorage.removeItem('loginSession');
									permanentStorage.removeItem('userName');
                                 	location.reload();
                                }
		                );
					} else {
						permanentStorage.removeItem('loginSession');
						permanentStorage.removeItem('userName');
		                location.reload();
					}
                }
			});
			//Logout End


			$("#cancel-btn").click(function(){
				$("#setRegg").slideUp(500);
				$("#errmmsg").text("We as your personal assistant, concierge, butler - want to make life easier for you. Just message us whatever you need.");
				$("#psreg").slideUp(500);
				$("#setNick").slideDown(500);
				$("#psreg").slideDown(500);
			});

			$(".profileForm").click(function(e){

				$(".ui-loader").show();
				e.preventDefault();
				/*var getProfileUrl = "http://gokadabra.topuserapps.com/account/serviceGetProfile";
				$.ajaxPrefilter(function (options) {
                    if (options.crossDomain && jQuery.support.cors) {
                        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                        options.url = http + '//cors-anywhere.herokuapp.com/' + "http://gokadabra.topuserapps.com/account/serviceGetProfile";

                    }
                });*/
				var username = permanentStorage.getItem("userName");
				var getUserDetail={
					username : username
				};
				socket.emit('get user detail', getUserDetail);

				socket.on('get user detail response', function(resp){
					
					if(resp.status == true){
						$(".ui-loader").hide();
						$("#login").val(username);
						$("#name").val(resp.data.name);
						$("#email").val(resp.data.email);
						$("#phone").val(resp.data.phone);
						$('#contentWrap').hide();
						$(".h-btn").show();
						$('#profile').show();
						$("#faqPage").hide();
						$(".name").html("");
						$(".email").html("");
						$(".phone").html("");
					} else {
						$(".ui-loader").hide();
						alert(resp.msg);
					}
					
				});			
				/*$.post(getProfileUrl, {'login' : username} , function (jsonResp) {
					$(".ui-loader").hide();
					$("#login").val(username);
					$("#name").val(jsonResp.name);
					$("#email").val(jsonResp.email);
					$("#phone").val(jsonResp.phone);
					$('#contentWrap').hide();
					$(".h-btn").show();
					$('#profile').show();
					$("#faqPage").hide();
					$(".name").html("");
					$(".email").html("");
					$(".phone").html("");
				},'json');*/
				return false;
				
			});

			$(".cancelButton").click(function(){
				$('#contentWrap').show();
				$(".h-btn").show();
				$('#profile').hide();
			});

			$(".faqButton").click(function(){
				$('#contentWrap').hide();
				$(".h-btn").show();
				$('#profile').hide();
				$("#faqPage").show();
			});

			$(".faqButtonHide").bind('click',function(){
				$('#contentWrap').show();
				$(".h-btn").show();
				$('#profile').hide();
				$("#faqPage").hide();				
			});

			$(".saveButton").click(function(e){
				var errorProfile = true;
				if($("#name").val() == ''){
					$(".name").html("Please enter name");
					errorProfile = false;
				} else {
					$(".name").html("");
				}
				if($("#email").val() == ''){
					$(".email").html("Please enter email");
					errorProfile = false;
				} else {
					$(".email").html("");
				}
				if($("#phone").val() == ''){
					$(".phone").html("Please enter phone");
					errorProfile = false;
				} else {
					$(".phone").html("");
				}
				
				if($("#email").val() != ''){
					if(!parseInt($("#email").val()) && !validateEmail($("#email").val())){
						$(".email").html("Invalid email");
						errorProfile = false;
					} else {
						$(".email").html("");
					}
				}
				if($("#phone").val() != ''){
					if((!parseInt($("#phone").val())) || (parseInt($("#phone").val()) && !validatePhone($("#phone").val()))){
						$(".phone").html("Invalid phone");
						errorProfile = false;
					} else {
						$(".phone").html("");
					}
				}
				e.preventDefault();
				if(errorProfile){

					var username = permanentStorage.getItem("userName");

					var updateUserDetail={
						username : username,
						name : $("#name").val(),
						email : $("#email").val(),
						phone : $("#phone").val()
					};
					
					socket.emit('update user details', updateUserDetail);

					socket.on('update user detail response', function(resp){
						if(resp.status == true){
							$(".ui-loader").hide();
							alert(resp.msg);
							$('#contentWrap').show();
							$(".h-btn").show();
							$('#profile').hide();
						} else {
							$(".ui-loader").hide();
							alert(resp.msg);
						}						
					});	
					
					/*$(".ui-loader").show();
					var serviceUpdateProfile = "http://gokadabra.topuserapps.com/account/serviceUpdateProfile";
					$.ajaxPrefilter(function (options) {
	                    if (options.crossDomain && jQuery.support.cors) {
	                        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
	                        options.url = http + '//cors-anywhere.herokuapp.com/' + "http://gokadabra.topuserapps.com/account/serviceUpdateProfile";
	                    }
	                });
					$.post(serviceUpdateProfile, $("#setProfile").serialize(), function (jsonResp) {
							$(".ui-loader").hide();
							alert(jsonResp.message);
							$('#contentWrap').show();
							$(".h-btn").show();
							$('#profile').hide();
					},'json');*/
				}
				return false;
			});

			

			$("#setRegg").submit(function(e){				
				var errorSignup = true;
				if($("#psname").val() == ''){
					$(".psname").html("Please enter name");
					errorSignup = false;
				} else {
					$(".psname").html("");
				}
				if($("#psemail").val() == ''){
					$(".psemail").html("Please enter email");
					errorSignup = false;
				} else {
					$(".psemail").html("");
				}
				if($("#psphone").val() == ''){
					$(".psphone").html("Please enter phone");
					errorSignup = false;
				} else {
					$(".psphone").html("");
				}
				
				if($("#psemail").val() != ''){
					if(!parseInt($("#psemail").val()) && !validateEmail($("#psemail").val())){
						$(".psemail").html("Invalid email");
						errorSignup = false;
					} else {
						$(".psemail").html("");
					}
				}
				if($("#psphone").val() != ''){
					if((!parseInt($("#psphone").val())) || (parseInt($("#psphone").val()) && !validatePhone($("#psphone").val()))){
						$(".psphone").html("Invalid phone");
						errorSignup = false;
					} else {
						$(".psphone").html("");
					}
				}

				if(errorSignup){

					console.log('success');
					var d = new Date();
					var time = d.toLocaleTimeString();
					var name= $("#psname").val();
					var email= $("#psemail").val();
					var phone= $("#psphone").val();
					//$('#psname').text(nick);
					//$('#lastseen').text("last seen on "+ time);
					$(".ui-loader").show();
					
					var signUpDetails={
						name : name,
						email : email,
						phone : phone
					};
					socket.emit('new user signup', signUpDetails);

					socket.on('new user signup response', function(dataResp){
						if(dataResp.status == true){
							$(".psname").html("");
							$(".ui-loader").hide();
							permanentStorage.setItem('loginSession', true);
							permanentStorage.setItem("userName", dataResp.name);
							
							socket.emit('join chat', function(data){
								if(data){
									$(".ui-loader").hide();
									$('#nickWrap').hide();
									$('#contentWrap').show();
									$(".h-btn").show();
									$("#type").show();
									//$chat.html("");
									$(".retry").hide();
								} else{
									alert('That username is already taken!  Try again.');
									$(".ui-loader").hide();
									$('#nickWrap').show();
									$('#contentWrap').hide();
									$(".h-btn").hide();
									$("#type").show();
									$(".retry").hide();
								}
							});

						} else {
							$(".psname").html(dataResp.msg);
							$(".ui-loader").hide();
						}
					});


				  /*e.preventDefault();
				  $(".ui-loader").show();
				  $.ajaxPrefilter(function (options) {
                            if (options.crossDomain && jQuery.support.cors) {
                                var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                                options.url = http + '//cors-anywhere.herokuapp.com/' + "http://gokadabra.topuserapps.com/account/serviceSignup";

                            }
                        });
				  		$.post($(this).attr('action'), $(this).serialize(), function (json) {
                        	$(".ui-loader").hide();
                            var new_value = JSON.parse(JSON.stringify(json));
                            console.log(new_value);
                            if (new_value.success === true) {
                                
                               	console.log('success');
								
								permanentStorage.setItem("userName", $("#psphone").val());
								permanentStorage.setItem("loginSession", new_value.success);

								var username = $("#psphone").val();
								var loginDetails={  
									id : username,  
									username : username,
									pic:'pic'
								};
								socket.emit('new user', loginDetails);

								socket.emit('join chat', function(data){
									if(data){
										$(".ui-loader").hide();
										$('#nickWrap').hide();
										$chat.html("");
										$('#contentWrap').show();
										$(".h-btn").show();
										$("#type").show();
										$(".retry").hide();
									} else{
										alert('That username is already taken!  Try again.');
										$(".ui-loader").hide();
										$('#nickWrap').show();
										$('#contentWrap').hide();
										$(".h-btn").hide();
										$("#type").show();
										$(".retry").hide();
									}
								});
								//$("#msg").text(new_value.message);
                            } else { 
									$("#errmmssg").after("<div class='message error'><i class='fa fa-exclamation'></i><p class='color-white'>" + new_value.message + "</p></div>");
									alert(new_value.message);
							}
                        }, 'json');*/
				}	
                return false;			
			});

			$nickForm.submit(function b(e,counter){
				e.preventDefault();
				var error = true;
				if($("#nickname").val() == ''){
					$(".nickname").html("Please enter phone or email");
					error = false;
				} else {
					$(".nickname").html("");
				}
				if($("#nickname").val() != '' && !parseInt($("#nickname").val())){
					if(!validateEmail($("#nickname").val())){
						$(".nickname").html("Invalid email");
						error = false;
					} else {
						$(".nickname").html("");
					}
				}
				if($("#nickname").val() != '' && parseInt($("#nickname").val())){
					if(!validatePhone($("#nickname").val())){
						$(".nickname").html("Invalid phone");
						error = false;
					} else {
						$(".nickname").html("");
					}
				}
		  		/*$.ajaxPrefilter(function (options) {
                    if (options.crossDomain && jQuery.support.cors) {
                        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                        options.url = http + '//cors-anywhere.herokuapp.com/' + "http://gokadabra.topuserapps.com/account/serviceLogin";
                    }
                });*/
		  		if(error){
		  			console.log('success');
					var d = new Date();
					var time = d.toLocaleTimeString();
					var nick=$nickBox.val();

					//$('#psname').text(nick);
					//$('#lastseen').text("last seen on "+ time);
					$(".ui-loader").show();
					
					var loginDetails={
						id : nick,
						username : nick
					};
					socket.emit('new user', loginDetails);

					socket.on('new user response', function(data){
						if(data.status == true){
							$(".nickname").html("");
							$(".ui-loader").hide();
							permanentStorage.setItem('loginSession', true);
							permanentStorage.setItem("userName", data.name);

							chatSession[data.name] = [];

							socket.emit('join chat', function(data){
								if(data){
									$(".ui-loader").hide();
									$('#nickWrap').hide();
									$('#contentWrap').show();
									$(".h-btn").show();
									$("#type").show();
									//$chat.html("");
									$(".retry").hide();
								} else{
									alert('That username is already taken!  Try again.');
									$(".ui-loader").hide();
									$('#nickWrap').show();
									$('#contentWrap').hide();
									$(".h-btn").hide();
									$("#type").show();
									$(".retry").hide();
								}
							});

						} else {
							$(".nickname").html(data.msg);
							$('#nickWrap').show();
							$('#contentWrap').hide();
							$(".h-btn").hide();
							$("#type").hide();
							$(".retry").hide();
							$(".ui-loader").hide();
						}
					});

					/*socket.emit('join chat', function(data){
						if(data){
							$(".ui-loader").hide();
							$('#nickWrap').hide();
							$('#contentWrap').show();
							$(".h-btn").show();
							$("#type").show();
							$chat.html("");
							$(".retry").hide();
						} else{
							alert('That username is already taken!  Try again.');
							$(".ui-loader").hide();
							$('#nickWrap').show();
							$('#contentWrap').hide();
							$(".h-btn").hide();
							$("#type").show();
							$(".retry").hide();
						}
					});*/

				}
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
			/*$("#myusers").on('click','li',function(e){
					e.preventDefault();
					$('#myusers').hide();
					
					$("#contentWrap").show();
					var thisname=$(this).find("h2").text();
					$messageForm.submit(function(e){
				e.preventDefault();
				var mymsg ='/w test@gmail.com'+' '+$messageBox.val();
				socket.emit('send message1', mymsg, function(data){
					$chat.append('<span class="error">' + data + "</span><br/>");
				});
					
						var d = new Date();
						var time = d.toLocaleTimeString();	
						$("#foo").append('<div class="ui-grid-solo margin-solo"><div class="bubble-out">'+ $messageBox.val() + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
					$('#msg').val('');
					$('html, body').animate({
					scrollTop: $("#scrolly").offset().top}, 500);
			});
			
					$messageBox.val('');
			});*/
			
			
			
			$messageForm.submit(function(e){
				e.preventDefault();
				var username = permanentStorage.getItem("userName");
				//var mymsg = username+': '+$messageBox.val();
				var mymsg = $messageBox.val();
				var adminUser = $("#adminId").val();
				//socket.emit('send message1', mymsg, function(data){
				/*socket.emit('send msg', mymsg, function(data){
					//$chat.append('<span class="error">' + data + "</span><br/>");
				});*/
				var chatData = {
					'chatMsg' : mymsg,
					'chatUser' : username,
					'chatAdmin' : adminUser 
				};
				
				socket.emit('send msg to admin', chatData);
				
				var chatH = {
					'chatMsg' : mymsg,
					'chatImage' : '',
					'chatUser' : username,
					'chatAdmin' : adminUser,
					'image' : false,
					'Type' : 'To Admin'
				};

				if(permanentStorage.getItem("chatDataHistory") != null){
					var chatSave = JSON.parse(permanentStorage.getItem("chatDataHistory"));
					if(typeof chatSave[username] !== 'undefined'){
						chatSave[username].push(chatH);
						permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSave));	
					} else {
						chatSave[username] = [];
						chatSave[username].push(chatH);
						permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSave));	
					}
				} else {
					chatSession[username].push(chatH);
					permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSession));
				}
					

				var d = new Date();
    			var time = d.toLocaleTimeString();	
				$("#foo").append('<div class="ui-grid-solo margin-solo"><div class="bubble-out">'+ $messageBox.val() + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
				$('#msg').val('');
				$('html, body').animate({ scrollTop: $("#scrolly").offset().top}, 500);
			});
			
			socket.on('new message1', function(data){
				var d = new Date();
    			var time = d.toLocaleTimeString();	
				$chat.append('<div class="ui-grid-solo margin-solo"><div class="bubble-in">' + data.msg + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');			
				$('html, body').animate({
    			scrollTop: $("#scrolly").offset().top}, 500);
			});
			
			//socket.on('whisper', function(data){
			socket.on('chat msg', function(data){

				var username = permanentStorage.getItem("userName");
				var adminUser = $("#adminId").val();
				var chatHMessageFromAdmin = {
					'chatMsg' : data.msg,
					'chatImage' : '',
					'chatUser' : username,
					'chatAdmin' : adminUser,
					'image' : false,
					'Type' : 'From Admin'
				};
				
				if(permanentStorage.getItem("chatDataHistory") != null){
					var chatSave = JSON.parse(permanentStorage.getItem("chatDataHistory"));
					if(typeof chatSave[username] !== 'undefined'){
						chatSave[username].push(chatHMessageFromAdmin);
						permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSave));
					} else {
						chatSave[username] = [];
						chatSave[username].push(chatHMessageFromAdmin);
						permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSave));
					}
					
				} else {
					chatSession[username].push(chatHMessageFromAdmin);
					permanentStorage.setItem("chatDataHistory", JSON.stringify(chatSession));
				}

				var d = new Date();
    			var time = d.toLocaleTimeString();
				$chat.append('<div class="ui-grid-solo margin-solo"><div class="bubble-in">' + data.msg + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
				/*$chat.append('<div class="ui-grid-solo margin-solo"><img src="http://gokadabra.topuserapps.com/upload/client/images/icon-dp.png" class="float-p" width="42" height="47" alt=""><div class="bubble-out"><b>' + data.msg + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');*/			
				$('html, body').animate({
	    		scrollTop: $("#scrolly").offset().top}, 500);
			});

			function validateEmail(email) {
			    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			    return re.test(email);
			}

			function validatePhone(phoneNumber) {
			    if (phoneNumber.match(/^\d{10}/)) {
			         return true;
			    } 			    
			    return false;
			}

		});	



		function loadHistory(){
				if(permanentStorage.getItem("chatDataHistory") != null){
					var username = permanentStorage.getItem("userName");
					var displayHistory = JSON.parse(permanentStorage.getItem("chatDataHistory"));

					if(typeof displayHistory[username] !== 'undefined'){
						$(displayHistory[username]).each(function(key, value){
							var chatUserName = value.chatUser;
							var chatAdminName = value.chatAdmin;
							var chatimageStatus = value.image;
							var chatType = value.Type;
							var chatChatMsg = value.chatMsg;
							var chatChatImg = value.chatImage;

							if(value.image == true){
								if(chatType == "To Admin"){
									$("#foo").append('<div class="ui-grid-solo margin-solo"><div class="bubble-out"><img style="width:100%;height:auto;" src="' + chatChatImg + '"/>' + '<div class="align-r"><span>11</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
								} else {
									$("#foo").append('<div class="ui-grid-solo margin-solo"><div class="bubble-in"><img style="width:100%;height:auto;" src="' + chatChatImg + '"/>' + '<div class="align-r"><span>11</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>');
								}
							} else {
								if(chatType == "To Admin"){
									var d = new Date();
	    							var time = d.toLocaleTimeString();
									$("#foo").append('<div class="ui-grid-solo margin-solo"><div class="bubble-out">' + chatChatMsg + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>'); 
								} else {
									var d = new Date();
	    							var time = d.toLocaleTimeString();
									$("#foo").append('<div class="ui-grid-solo margin-solo"><div class="bubble-in">' + chatChatMsg + '<div class="align-r"><span>' + time + '</span>&nbsp;<i class="fa fa-thumbs-up"></i></div></div>'); 
								}
							}

						});
					}
				}
		}

		


