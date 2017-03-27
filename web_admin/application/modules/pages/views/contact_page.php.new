<h1 class="pageTitle-white contact-head" style="width: 400px;">For ordering please use live chat</h1>
<div id="form-container">
    <h2 class="pageTitle">For any other query</h2>
    <form action="<?=base_url()?>/p/contactSubmit" method="post" onsubmit="validate();">
        <?php
        if(isset($thankyou)){echo "<font color=\"green\">$thankyou</font>";}
        else if(isset($error)){echo "<font color=\"red\">$error</font>";}
        ?>
        <div class="field">
            <input type="text" name="name" placeholder="Name" />
        </div>
        <div class="field">
            <input type="text" name="email" placeholder="Email" />
        </div>
        <div class="field">
            <input type="text" name="phone" placeholder="Phone" />
        </div>
        <div class="field">
            <textarea name="query" placeholder="Query"></textarea>
        </div>
        <div class="field" style="position: relative;">
            <input type="text" name="captcha" placeholder="Captcha" style="padding: 8px 8px 8px 110px;"/><img src="<?=base_url()?>captcha/getCaptcha/rand" id="captchaimg" height="35px" style="position: absolute;top: 1px;left: 1px;"/>
            <a href="javascript:void(0)" onclick="refreshCaptcha();" style="position: absolute;right: -55px;top: 10px;">Refresh</a>
        </div>
        <div class="field">
            <input type="submit" name="submit" value="Submit" />
        </div>
    </form>
</div>
<script type='text/javascript'>
function refreshCaptcha(){
	var img = document.images['captchaimg'];
	img.src = img.src.replace('/^\/r[0-9]*', '')+"/r"+Math.random()*1000;
}
</script>


