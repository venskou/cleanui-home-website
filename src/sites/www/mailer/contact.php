<?php
require('class.phpmailer.php');

$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPDebug = 0;
$mail->SMTPAuth = TRUE;
$mail->SMTPSecure = 'tls';
$mail->Port     = 587;  
$mail->Username = 'support@mediatec.org';
$mail->Password = 'SupervisorPass12';
$mail->Host     = 'smtp.gmail.com';
$mail->Mailer   = 'smtp';
$mail->SetFrom($_POST["userEmail"], $_POST["userName"]);
$mail->AddReplyTo($_POST["userEmail"], $_POST["userName"]);
$mail->AddAddress("hello@mediatec.org");
$mail->Subject = 'HOME -> Hire Us';
$mail->WordWrap   = 80;
$mail->MsgHTML('<br /> Name: ' . $_POST["userName"] . '<br /> Email: ' . $_POST["userEmail"] . '<br /> Country: ' . $_POST["userCountry"] . '<br /> Typical Pages: ' . $_POST["numberTypical"] . '<br /> Custom Pages: ' . $_POST["numberCustom"] . '<br /> Price: ' . $_POST["price"] . '<br /> Days: ' . $_POST["days"] . '<br /><br /> Content: <br /><br />' . $_POST["content"] . '<br /><br />' );

$mail->From = 'cleanuitemplate-www@mediatec.com';
$mail->FromName = 'Hire Us <- www.cleanuitemplate.com ';

if($_FILES['attachmentFile']['name']) {
    $mail->AddAttachment($_FILES['attachmentFile']['tmp_name'],$_FILES['attachmentFile']['name']);
}

$mail->IsHTML(true);

if(!$mail->Send()) {
	echo "<p class='ctf__form__message ctf__form__message--error'>Problem in sending prorosal. Please write to support@cleanuitemplate.com</p>";
} else {
	echo "<p class='ctf__form__message'>Proposal was succesfully sent.</p>";
}	
?>