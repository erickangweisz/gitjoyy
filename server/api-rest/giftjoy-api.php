<?php
require_once 'vendor/autoload.php';
$app = new \Slim\Slim();
$db = new mysqli("localhost", "root", "", "giftjoy");

$app->get("/products", function() use($db, $app) {
	$query = $db->query("SELECT * FROM products ORDER BY id DESC;");
	$products = array();
	while ($fila = $query->fetch_assoc()) {
		$products[] = $fila;
	}
	$result = array("status" => "success",
					"data" => $products);
	echo json_encode($result);
});

$app->get("/productsbyclientid/:client_id", function($client_id) use($db, $app) {
	$query = $db->query("SELECT * FROM products WHERE client_id = $client_id");
	$products = array();
	while ($fila = $query->fetch_assoc()) {
		$products[] = $fila;
	}
	$result = array("status" => "success",
		"data" => $products);
	echo json_encode($result);
});

$app->get("/productsbycategory/:category", function($category) use($db, $app) {
	$query = $db->query("SELECT * FROM products WHERE category = $category");
	$products = array();
	while ($fila = $query->fetch_assoc()) {
		$products[] = $fila;
	}
	$result = array("status" => "success",
		"data" => $products);
	echo json_encode($result);
});

$app->get("/products/:id", function($id) use($db, $app) {
	$query = $db->query("SELECT * FROM products WHERE id = $id;");
	$products = $query->fetch_assoc();
	if ($query->num_rows == 1) {
		$result = array("status" => "success",
			"data" => $products);
	} else {
		$result = array(
			"status" => "error",
			"message" => "The product does not exist.");
	}
	echo json_encode($result);
});

$app->post("/products", function() use($db, $app) {
	$json = $app->request->post("json");
	$data = json_decode($json, true);
	$query = "INSERT INTO products VALUES(NULL, 
			   '{$data["client_id"]}',"
			. "'{$data["nickname"]}',"
			. "'{$data["title"]}',"
			. "'{$data["description"]}',"
			. "'{$data["location"]}',"
			. "'{$data["image"]}', "
			. "'{$data["category"]}', "
			. "'{$data["telephone"]}'"
			. ")";
	$insert = $db->query($query);
	if ($insert) {
		$result = array("status" => "success",
			"message" => "The product was created correctly");
	} else {
		$result = array("status" => "error", "message" => "The product has not been created");
	}
	echo json_encode($result);
});

$app->post("/update-product/:id", function($id) use($db, $app) {
	header("Access-Control-Allow-Origin: *");
	$json = $app->request->post("json");
	$data = json_decode($json, true);
	$query = "UPDATE products SET 
			   client_id = '{$data["client_id"]}', "
			. "nickname = '{$data["nickname"]}', "
			. "title = '{$data["title"]}', "
			. "description = '{$data["description"]}', "
			. "location = '{$data["location"]}', "
			. "image = '{$data["image"]}', "
			. "category = '{$data["category"]}', "
			. "telephone = '{$data["telephone"]}' "
			. " WHERE id={$id}";
	$update = $db->query($query);
	if ($update) {
		$result = array("status" => "success", "message" => "The product was updated correctly");
	} else {
		$result = array("status" => "error", "message" => "The product has not been updated");
	}
	echo json_encode($result);
});

$app->get("/delete-product/:id", function($id) use($db, $app) {
	$query = "DELETE FROM products WHERE id = {$id}";
	$delete = $db->query($query);
	if ($delete) {
		$result = array("status" => "success", "message" => "The product was deleted correctly");
	} else {
		$result = array("status" => "error", "message" => "The product has not been deleted");
	}
	echo json_encode($result);
});

$app->post("/upload-file", function() use($db, $app) {
	$result = array("status" => "error", "message" => "The file could not be uploaded");
	if (isset($_FILES["uploads"])) {
		$piramideUploader = new PiramideUploader();
		$upload = $piramideUploader->upload("image", "uploads", "uploads", array("image/jpeg", "image/png", "image/gif"));
		$file = $piramideUploader->getInfoFile();
		$file_name = $file["complete_name"];
		
		if (isset($upload) && $upload["uploaded"] == false) {
			$result = array("status" => "error",
				"message" => $upload["error"]);
		} else {
			$result = array("status" => "success",
				"message" => "The file has been successfully uploaded",
				"filename"=>$file_name);
		}
	}
	echo json_encode($result);
});

$app->run();