<?php
class DB extends PDO {
	public function __construct() {
		$my_DB_account = array();
		require 'secret/DB_account.php';

		$dns = "mysql:dbname={$my_DB_account['db_name']};host={$my_DB_account['host']}";
		parent::__construct($dns, $my_DB_account['user'], $my_DB_account['password']);
	}
}

$db = new DB();
?>
