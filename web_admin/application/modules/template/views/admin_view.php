<!DOCTYPE HTML>
<html class="ui-mobile">
    <head>
        <title>Trieffects Chat Client</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		
        <!-- jQueryMobileCSS - original without styling -->
        <link rel="stylesheet" href="<?=$assets?>/css/main.css" />
			
         <!-- jQueryMobileCSS - original without styling -->
        <link rel="stylesheet" href="<?=$assets?>/css/font-awesome.min.css" />
        
         <!-- jQueryMobileCSS - original without styling -->
        <link rel="stylesheet" href="<?=$assets?>/css/font-awesome.css" />

        <!-- nativeDroid core CSS -->
        <link rel="stylesheet" href="<?=$assets?>/css/jquerymobile.nativedroid.css" />

        <!-- nativeDroid: Dark -->
        <link rel="stylesheet" href="<?=$assets?>/css/jquerymobile.nativedroid.light.css"  id='jQMnDTheme' />

        <!-- nativeDroid: Color Schemes -->
        <link rel="stylesheet" href="<?=$assets?>/css/style.css" id="jQMnDColor" />       
        <script type="text/javascript" src="<?=$assets?>/js/jquery.xdomainajax.js"></script>
        <!-- jQuery / jQueryMobile Scripts -->
        <script src="<?=$assets?>/js/jquery-1.9.1.min.js"></script>
        <script src="<?=$assets?>/js/jquery.mobile-1.4.2.min.js"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script type="text/javascript" src="<?=$assets?>/js/custom.js"></script>
        <script src="http://191.239.12.168:1710/socket.io/socket.io.js"></script>
        <script type="text/javascript" src="<?=$assets?>/js/customize.js"></script>
        
  </head>    
  <body class="ui-mobile-viewport ui-overlay-a">
  		
    <div data-role="page" data-theme='b' class="ui-content">
    		  
        <div data-role="header" data-position="fixed" data-tap-toggle="false" data-theme='b' class="text-red">         
           <img id="logo" class="header-logo margin-top10 chat-img-h1" src="<?=$assets?>/images/logo-img.png" width="42" height="47" alt="">
           <h6 class="padding-left6 chat-img-h" id="users"><span id="psname">Gokadabra</span>  <br><span class="font-size11">last seen on 10:34 PM</span></h6>
        </div>	
         				
        <div data-role="content" id="bubble" class="margin-top90 margin-top-sm"> 
        		
                <div id="nickWrap">
                <div class="ui-grid-solo">
                     <div class="ui-grid-solo margin-solo1 main-box-with-shadow">	
						<div class="ui-block-a">
                        	<p class="justify">Please Login With Your Registered Email or Phone To Start Chatting.</p>
                             <p id="nickError"></p>
                            <form id="setNick" action="#">
                            	 <ul data-role="listview" data-inset="true">
                             <li data-role="fieldcontain">
                        <div class="ui-grid-solo">
                        	
                        	<div class="">
                            	<input type="text" name="name2" id="nickname" value="" data-clear-btn="true" placeholder="Enter Your Name to start chat"/>
                                 <button id="nick23" class="ui-btn btn-submit" style="color:#fff;" type="submit">Submit</button>
                            </div>
                        </div>
                       
                         
                    </li>     
                            </form>
                        </div>
                    </div>
                  
                
                </div>
                </div>
                <div id="contentWrap" style="display:none;">
                
                <!--End Form Input -->
                
            	
					<div id="foo"></div>
                  	
              		
                    
                   <!-- end ui-grid-solo-->
                    
                
                  <div id="scrolly" class="margin-top75">&nbsp;</div>  
      <div id="footer" class="main-box-with-shadow chat-footer-bg"> 
        <div id="type" class="ui-grid-solo ui-navbar" data-role="navbar" role="navigation">
        			
                   <span class="chat-footer-span1"> <img src="<?=$assets?>/images/icon-smile1.png" height="25" width="25" style="
    margin-top: 10px;
"></span>
                   <span class="chat-footer-span2">
              		<form id="send-message">
                    <input type="text" name="name" id="msg" value="" placeholder="Write a message"  class="important"/>
					
                    </form>
                   </span>
                    <span class="pull-left chat-footer-span3"><i class="fa fa-microphone"></i> </span> 
                   <span id="chaxt" class="chat-footer-span4">Send</span>
                
        </div>
        <ul id="uszers"></ul>
        </div> 
        
           
        </div>
        
    </div>      
          
          
          
       </div>
          
        
    </div>
            
       
            
        
            
        
    
	</body>
</html>