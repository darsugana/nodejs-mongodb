<h1 class="pageTitle">What do we charge for this personal butler ready to do whatever you want 24X7?</h1>

<div class="pageLeft">

	<form action="<?=base_url()?>home/registerUser" method="post" >
		<?php
			if(isset($message)){echo "<font color=\"red\">$message</font>";}
		?>
        <div class="inputContainer">
            <input  type="text" name="name" placeholder="Name" />
        </div>
        <div class="inputContainer">
            <input type="tel" name="phone" placeholder="Phone" required="required" />
        </div>
        <div class="inputContainer">
            <input type="email" name="email" placeholder="Email" required="required" />
        </div>
        <div class="inputContainer">
            <input type="submit" name="submit" value="Its free.. So use GoKadabra now!" />
        </div>

    </form>

    <div class="storLinks">

        <img src="<?=$assets?>/images/google_play_icon.jpg" alt="Google Play" />

        <img src="<?=$assets?>/images/app_store_icon.jpg" alt="Apple Store" />

    </div>
    
    

</div>

<div class="pageRight">
	<div class="homebeforeChat">
    	<p class="strongType">Chat with us to get whatever you want at no extra cost</p>
    <p>We as your personal assistant, concierge, butler – want to make life easier for you.  Just message us whatever you need.</p>
    <p>GoKadabra gets everything you want and need, all in one place. so whether it comes to ordering food, groceries, booze,gifts, cakes and flowers or booking taxis, flights, hotels, movies and plays or making reservations for dinner ,appointments with the salon or dentist Anything under the Sun!</p>
<p>Why do it yourself, when we can do it for you. GoKadabra gets everything you want and need, all in one place..</p>
    </div>
    <div id="chat-window">
    		<div id="pageloader"></div>
            <div id="chat-header"><a class="chat-close">X</a></div>
            <iframe src="" width="600" height="400"></iframe>
    </div>
               

</div>

<div class="clear"></div>
<h2 class="strongType"><center>Call or Whatsapp (+91) 7838578758 to experience your new butler.</center></h2>