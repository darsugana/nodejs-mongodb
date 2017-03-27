<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
class Template extends MX_Controller
{

    function __construct() {
    parent::__construct();
    }
    
    function public_view($data){
        $data['assets'] = base_url().'assets';
        $this->load->view('public_view', $data);
        
    }
    
    function  client_view($data =  array()){
        $data['assets'] = base_url().'assets';
        $this->load->view('client_view', $data);       
    }
    
    function  admin_view($data = array()){
        $data['assets'] = base_url().'assets';
        $this->load->view('admin_view', $data);       
    }

   
}

?>