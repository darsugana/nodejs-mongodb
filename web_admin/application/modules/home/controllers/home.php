<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
class Home extends MX_Controller
{

    function __construct() {
    parent::__construct();
    }
	
	
	function index($data = array()){
			$data['title'] = 'Home';
            $data['view_file'] = 'home';
            $data['module'] = 'home';
            $this->load->module('template');
            $this->template->public_view($data);
	}
	
	function registerUser(){
        $name = trim($this->input->post('name', TRUE));
        $email = trim($this->input->post('email', TRUE));
        $phone = trim($this->input->post('phone', TRUE));
		$query = $this->_custom_query("SELECT * FROM `user` WHERE `email`='{$email}' OR `phone`='{$phone}'");
		if($query->num_rows()>0){
			$data['message'] = "Email or number already exist.";
			$this->index($data);
		}else{
			$query = $this->_custom_query("INSERT INTO `user` SET `name`='{$name}', `email`='{$email}', `phone`='{$phone}', `enabled`=1, `joined`=NOW()");
			if($query > 0){
				$data['message'] = "Congratulations! You have successfully registered.";
				$this->index($data);
			}else{
				$data['message'] = "Some error occurred, please try again later.";
				$this->index($data);
			}   
		}
    }

    function get($order_by) {
    $this->load->model('mdl_home');
    $query = $this->mdl_home->get($order_by);
    return $query;
    }

    function get_with_limit($limit, $offset, $order_by) {
    $this->load->model('mdl_home');
    $query = $this->mdl_home->get_with_limit($limit, $offset, $order_by);
    return $query;
    }

    function get_where($id) {
    $this->load->model('mdl_home');
    $query = $this->mdl_home->get_where($id);
    return $query;
    }

    function get_where_custom($col, $value) {
    $this->load->model('mdl_home');
    $query = $this->mdl_home->get_where_custom($col, $value);
    return $query;
    }

    function _insert($data) {
    $this->load->model('mdl_home');
    $this->mdl_home->_insert($data);
    }

    function _update($id, $data) {
    $this->load->model('mdl_home');
    $this->mdl_home->_update($id, $data);
    }

    function _delete($id) {
    $this->load->model('mdl_home');
    $this->mdl_home->_delete($id);
    }

    function count_where($column, $value) {
    $this->load->model('mdl_home');
    $count = $this->mdl_home->count_where($column, $value);
    return $count;
    }

    function get_max() {
    $this->load->model('mdl_home');
    $max_id = $this->mdl_home->get_max();
    return $max_id;
    }

    function _custom_query($mysql_query) {
    $this->load->model('mdl_home');
    $query = $this->mdl_home->_custom_query($mysql_query);
    return $query;
    }

}

?>