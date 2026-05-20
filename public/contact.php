<?php
// Prevent CORS issues for testing (adjust as needed for production)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed"));
    exit;
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"));

// Validate inputs
if (
    !empty($data->name) &&
    !empty($data->email) &&
    !empty($data->phone) &&
    !empty($data->subject) &&
    !empty($data->message)
) {
    // Recipient Email (Business Email)
    $to = "info@ultimatevetserve.com"; 
    
    // Email Subject
    $email_subject = "New Website Inquiry: " . strip_tags($data->subject);
    
    // Headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    
    // sender address (must be a valid email on your domain to avoid spam folders)
    // Using the one provided: _mainaccount@ultimatevetserve.com or info@
    $headers .= "From: Website Contact Form <_mainaccount@ultimatevetserve.com>" . "\r\n";
    $headers .= "Reply-To: " . strip_tags($data->email) . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Email Body
    $message = "
    <html>
    <head>
        <title>New Website Inquiry</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
            h2 { color: #0077B6; border-bottom: 2px solid #0077B6; padding-bottom: 10px; }
            p { margin-bottom: 10px; }
            strong { color: #555; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> " . htmlspecialchars($data->name) . "</p>
            <p><strong>Email:</strong> " . htmlspecialchars($data->email) . "</p>
            <p><strong>Phone:</strong> " . htmlspecialchars($data->phone) . "</p>
            <p><strong>Subject:</strong> " . htmlspecialchars($data->subject) . "</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>" . nl2br(htmlspecialchars($data->message)) . "</p>
        </div>
    </body>
    </html>
    ";
    
    // Send Email
    if(mail($to, $email_subject, $message, $headers)) {
        http_response_code(200);
        echo json_encode(array("message" => "Message sent successfully."));
    } else {
        http_response_code(500);
        echo json_encode(array("message" => "Unable to send message. Server error."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data. Please fill all fields."));
}
?>
