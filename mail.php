<?php
session_start();
require './PHPMailer/src/Exception.php';
require './PHPMailer/src/PHPMailer.php';
require './PHPMailer/src/SMTP.php';

$host = "EMAIL SMTP HOST";
$myEmail = "EMAIL USERNAME";
$myPassword = "EMAIL PASSWORD";

$name = $_POST["name"];
$email = $_POST["email"];
$points = $_POST["points"];

$htmlContent = '<p>Name: ' . $name . '</p><p>Email: ' . $email . '</p><p>Points: ' . $points . '</p>';

$mail = new PHPMailer\PHPMailer\PHPMailer(false);
try {
	$mail->SMTPDebug = 0;
	$mail->isSMTP();
	$mail->Host = $host;
	$mail->SMTPAuth = true;
	$mail->Username = $myEmail;
	$mail->Password = $myPassword;
	$mail->SMTPSecure = 'tls';
	$mail->Port = 25;
	$mail->SMTPOptions = array(
		'ssl' => array(
			'verify_peer' => false,
			'verify_peer_name' => false,
			'allow_self_signed' => true,
		),
	);

	//Recipients
	$mail->setFrom($myEmail, 'Wheel of Fortune');
	$mail->addAddress($myEmail, 'Wheel of Fortune');

	//Content
	$mail->CharSet = 'UTF-8';
	$mail->isHTML(true);
	$mail->Subject = 'Wheel of Fortune';
	$mail->Body = $htmlContent;

	$mail->send();

	$_SESSION['message'] = true;
	header('Location: index.php');
} catch (Exception $e) {
	$_SESSION['message'] = false;
	header('Location: index.php');
}
?>