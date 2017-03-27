<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?=$title?></title>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,800italic,800,700italic,700,600italic,600,400italic' rel='stylesheet' type='text/css'>
<link rel="stylesheet" type="text/css" href="<?=$assets?>/css/public_style.css" />
<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
</head>
<body>
    <!--header start-->
    <div id="topWrapper">
        <div class="cenerPadding">
            <div class="cover">
                <div id="logo">
                    <a href="/"><img src="<?=$assets?>/images/logo.png" alt="" /></a>
                </div>
                <ul class="menu" id="menuParent">
                    <li><a href="/">HOME</a></li>
                    <li><a href="<?=base_url()?>p/faqs">FAQ</a></li>	    
                    <li><a href="<?=base_url()?>p/service">SERVICES</a></li>		       
                    <li><a href="<?=base_url()?>p/media">MEDIA</a></li>		    
                    <li><a href="<?=base_url()?>p/contact">CONTACT US</a></li>
                    <li><a href="<?=base_url()?>account/login"><img src="<?=$assets?>/images/login-icon.png" alt="" /><span>LOG IN</span></a></li>
                </ul>
                <div class="clear"></div>
            </div>
        </div>        
    </div>
    <!-- header end-->
    
    <div id="wrapper">
        <div class="cover">
            <?php
                if(!isset($module)){
                    $module = $this->uri->segment(1);                        
                }

                if(!isset($view_file)){
                    $view_file = "";
                }

                if($module != "" && $view_file != ""){
                    $path = $module."/".$view_file;
                    $this->load->view($path);
                }
            ?>            
        </div>
    </div>
    
    <div id="footer">
		<div id="liveChat">
			<div class="cover">
				<a href="javascript:void(0)" id="chat-link" data-url="<?=base_url()?>template/client_view"><i class="fa fa-wechat fa-lg"></i>Live Chat </a>               
			</div>
		</div>
        <div class="copyright">
            <div class="cover">
                <p><strong>Copyright-2015 GoKadabra</strong>, Powered By- Trieffects Technologies</p>
            </div>                
        </div>        
    </div>
    
    <div id="chat-window">
        <div id="chat-header"><a class="chat-close">X</a></div>
        <iframe src="" style="width:inherit !important;height:inherit !important;"></iframe>
    </div>
    <script type="text/javascript">
        $(document).ready(function(){
            $('#chat-link').click(function(){
                $('#chat-window').show('slide', {direction: 'down'});
				if($('#chat-window iframe').attr('src')==''){
					$('#chat-window iframe').attr('src', $(this).data('url')).removeAttr('width').removeAttr('height').css({'width':'inherit','height':'450px'});
				}
                $('#liveChat').css({'visibility':'hidden'});
            });   
            $('.chat-close').click(function(){
                $('#chat-window').css({'display':'none'});
                $('#liveChat').css({'visibility':'visible'});
            });
        });
    </script>
</body>
</html>
