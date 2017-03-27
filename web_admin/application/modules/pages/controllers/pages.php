<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
class Pages extends MX_Controller
{

    function __construct() {
    parent::__construct();
    }
	
	function service(){
        $data['title'] = 'Services';
        $data['view_file'] = 'service_page';
        $data['module'] = 'pages';
        $this->load->module('template');
        $this->template->public_view($data);
    }
	
	
	function media(){
		$data['title'] = 'Media';
        $data['view_file'] = 'media_page';
        $data['module'] = 'pages';
        $this->load->module('template');
        $this->template->public_view($data);
    }

    function faqs(){
		$data['title'] = 'FAQs';
        $data['view_file'] = 'faq_page';
        $data['module'] = 'pages';
        $this->load->module('template');
        $this->template->public_view($data);
    }
    
    function contact(){
		$data['title'] = 'Contact Us';
        $data['view_file'] = 'contact_page';
        $data['module'] = 'pages';
        $this->load->module('template');
        $this->template->public_view($data);
    }
    
    function contactSubmit(){
        $data['name'] = $this->input->post('name', TRUE);
        $data['email'] = $this->input->post('email', TRUE);
        $data['phone'] = $this->input->post('phone', TRUE);
        $data['query'] = $this->input->post('query', TRUE);
        $data['captcha'] = $this->input->post('captcha', TRUE);
        if(!empty($data['name']) && !empty($data['email']) && !empty($data['phone']) && !empty($data['query']) && !empty($data['captcha'])){
            if($data['captcha'] != $this->session->userdata('captcha_code')){
                $data['error'] = 'Invalid Captcha value.';
                $this->contact($data);
            }else{
                $this->load->library('email');
                
                $config['wordwrap'] = TRUE;
                $config['mailtype'] = 'html';
                $this->email->initialize($config);

                $this->email->from($data['email'], $data['name']);
                $this->email->to('info@gokadabra.com');
                
                $this->email->subject('Gokadabra contact mail from '.$data['name']);
                $this->email->message($this->getContactMailContent($data));

                if( $this->email->send()){
                    $data['thankyou'] = "Thank you for contacting us, We will get back to you soon.";
                    $this->contact($data);
                }else{
                   $data['error'] = 'Some error occurred, please try later.';
                   $this->contact($data);
                }
            }
        }
    }
    
    function getContactMailContent($data){
        extract($data);
        $body = '<html><body>';
        $body .= '<table style="width:100%;text-align:left;">';
        $body .= 	'<tr>';
        $body .=		'<th style="width:15%;" valign="top">Name</th><td valign="top">'.$name.'</td>';
        $body .=	'</tr>';
        $body .=	'<tr>';
        $body .=		'<th style="width:15%;" valign="top">Email Address</th><td valign="top">'.$email.'</td>';
        $body .=	'</tr>';
        $body .=	'<tr>';
        $body .=		'<th style="width:15%;" valign="top">Contact Number</th><td valign="top">'.$phone.'</td>';
        $body .=	'</tr>';
        $body .=	'<tr>';
        $body .=		'<th style="width:15%;" valign="top">Query</th><td valign="top">'.$query.'</td>';
        $body .=	'</tr>';
        $body .='</table>';
        $body .='</body></html>';
        
        return $body;
        
    }

}

?>