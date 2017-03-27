<?php if (!defined('BASEPATH')) exit('No direct script access allowed');
class Account extends MX_Controller
{

    function __construct() {
    parent::__construct();
    }
    
    function login(){
		$data['title'] = 'Login';
        $data['view_file'] = 'login';
        $data['module'] = 'account';
        $this->load->module('template');
        $this->template->public_view($data);
    }
    
    function loginSubmit(){
        $login = trim($this->input->post('login', TRUE));
        $query = $this->_custom_query("SELECT * FROM `user` WHERE `email`='{$login}' OR `phone`='{$login}'");
        if($query->num_rows){
            $row = $query->row();
            $this->session->set_userdata('login', TRUE);
            $this->session->set_userdata('name', $row['name']);
        }
    }
    
    function serviceLogin(){
        $login = trim($this->input->post('login', TRUE));
        $query = $this->_custom_query("SELECT * FROM `user` WHERE `email`='{$login}' OR `phone`='{$login}'");
        if($query->num_rows){
            $row = $query->row();
            $result = array('success'=>TRUE, 'message'=>'Login Successful', 'id' => $row->id, 'name' => $row->name, 'email' => $row->email, 'phone' => $row->phone, 'enabled' => $row->enabled);
        }else{
             $result = array('success'=>FALSE, 'message'=>'Email or number does not exist');
        }       
        echo json_encode($result);
    }

    function serviceGetProfile(){
        $login = trim($this->input->post('login', TRUE));
        $query = $this->_custom_query("SELECT * FROM `user` WHERE `email`='{$login}' OR `phone`='{$login}'");
        if($query->num_rows){
            $row = $query->row();
            $result = array('success'=>TRUE, 'message'=>'Get Profile Successful', 'id' => $row->id, 'name' => $row->name, 'email' => $row->email, 'phone' => $row->phone, 'enabled' => $row->enabled);
        }else{
             $result = array('success'=>FALSE, 'message'=>'Email or number does not exist');
        }       
        echo json_encode($result);
    }

    function serviceUpdateProfile(){
        $login = trim($this->input->post('login', TRUE));
        $name = trim($this->input->post('name', TRUE));
        $email = trim($this->input->post('email', TRUE));
        $phone = trim($this->input->post('phone', TRUE));
        $query = $this->_custom_query("UPDATE `user` SET `name`='{$name}', `email`='{$email}', `phone`='{$phone}' where `email`='{$login}' OR `phone`='{$login}' ");
        $result = array('success'=>TRUE, 'message'=>'Profile Updated Successfully!');
        echo json_encode($result);
    }
    
    function serviceSignup(){
        $name = trim($this->input->post('name', TRUE));
        $email = trim($this->input->post('email', TRUE));
        $phone = trim($this->input->post('phone', TRUE));
		$query = $this->_custom_query("SELECT * FROM `user` WHERE `email`='{$email}' OR `phone`='{$phone}'");
		if($query->num_rows()>0){
			$result = array('success'=>FALSE, 'message'=>'Email or phone already exist.');
		}else{
			$query = $this->_custom_query("INSERT INTO `user` SET `name`='{$name}', `email`='{$email}', `phone`='{$phone}', `enabled`=1, `joined`=NOW()");
			if($query > 0){
				$result = array('success'=>TRUE, 'message'=>'Signup Successful');
			}else{
				 $result = array('success'=>FALSE, 'message'=>'Some error ocured');
			} 
		}
        echo json_encode($result);
    }

    function get($order_by) {
    $this->load->model('mdl_account');
    $query = $this->mdl_account->get($order_by);
    return $query;
    }

    function get_with_limit($limit, $offset, $order_by) {
    $this->load->model('mdl_account');
    $query = $this->mdl_account->get_with_limit($limit, $offset, $order_by);
    return $query;
    }

    function get_where($id) {
    $this->load->model('mdl_account');
    $query = $this->mdl_account->get_where($id);
    return $query;
    }

    function get_where_custom($col, $value) {
    $this->load->model('mdl_account');
    $query = $this->mdl_account->get_where_custom($col, $value);
    return $query;
    }

    function _insert($data) {
    $this->load->model('mdl_account');
    $this->mdl_account->_insert($data);
    }

    function _update($id, $data) {
    $this->load->model('mdl_account');
    $this->mdl_account->_update($id, $data);
    }

    function _delete($id) {
    $this->load->model('mdl_account');
    $this->mdl_account->_delete($id);
    }

    function count_where($column, $value) {
    $this->load->model('mdl_account');
    $count = $this->mdl_account->count_where($column, $value);
    return $count;
    }

    function get_max() {
    $this->load->model('mdl_account');
    $max_id = $this->mdl_account->get_max();
    return $max_id;
    }

    function _custom_query($mysql_query) {
    $this->load->model('mdl_account');
    $query = $this->mdl_account->_custom_query($mysql_query);
    return $query;
    }

}

?>