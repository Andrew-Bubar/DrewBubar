<!DOCTYPE html>
<?php

    $name = $_POST['name'];
    $vist_email = $_POST['email'];
    $serv = $_POST['service'];
    $subj = $_POST['subject'];

    $email_from = 'stevetrooper121@gmail.com';
    $email_subj = 'Form Submission from WebSite';
    $email_body = 'User Name: $name.\n'.
                    'User Email: $vist_email.\n'. 
                        'User Service: $serv\n'.
                            'User Message: $subj.\n';

    $to = 'andrewpbubar@gmail.com';
    $head = 'From: $email_from \r\n';
    $head .= 'Reply=To: $vist_email \r\n';

    mail($to, $email_subj, $email_body, $head);
    header('Location: index.html');

?>