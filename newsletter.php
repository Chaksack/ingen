<?php
/**
 * Newsletter Subscription Handler for Ingen Cloud Technologies
 * Handles newsletter/subscription form submissions using Resend
 */

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');

// Set response header
header('Content-Type: application/json');

// Configuration
$config = [
    'resend_api_key' => getenv('RESEND_API_KEY') ?: $_ENV['RESEND_API_KEY'] ?? '',
    'recipient_email' => 'info@ingencloudtechnologies.com',
    'recipient_name' => 'Ingen Cloud Technologies',
    'from_email' => 'noreply@ingencloudtechnologies.com',
    'from_name' => 'Ingen Cloud Technologies',
    'success_message' => 'Thank you for subscribing! Check your email to confirm.',
    'error_message' => 'Sorry, there was an error processing your subscription. Please try again.',
    'allowed_domains' => ['ingencloudtechnologies.com'],
];

// Validate that Resend API key is configured
if (empty($config['resend_api_key'])) {
    error_log('CRITICAL: RESEND_API_KEY environment variable is not set');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Newsletter service is not configured. Please contact the administrator.'
    ]);
    exit;
}

// CORS headers
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array(parse_url($origin, PHP_URL_HOST), $config['allowed_domains']) || 
    strpos($origin, 'localhost') !== false || 
    strpos($origin, '127.0.0.1') !== false) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Please use POST.'
    ]);
    exit;
}

// Function to send email via Resend API
function send_email_resend($api_key, $from_email, $from_name, $to_email, $to_name, $subject, $html_body) {
    $ch = curl_init();
    
    $data = [
        'from' => $from_name . ' <' . $from_email . '>',
        'to' => [$to_email],
        'subject' => $subject,
        'html' => $html_body
    ];
    
    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://api.resend.com/emails',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $api_key,
            'Content-Type: application/json'
        ]
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        error_log('Resend cURL Error: ' . $error);
        return false;
    }
    
    if ($http_code >= 200 && $http_code < 300) {
        return json_decode($response, true);
    } else {
        error_log('Resend API Error: HTTP ' . $http_code . ' - ' . $response);
        return false;
    }
}

// Initialize response
$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];

try {
    // Get email from POST data
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    
    // Validation
    if (empty($email)) {
        $response['message'] = 'Email address is required';
        http_response_code(400);
        echo json_encode($response);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Please enter a valid email address';
        http_response_code(400);
        echo json_encode($response);
        exit;
    }
    
    // Prepare notification email for admin
    $admin_subject = 'New Newsletter Subscription - ' . $email;
    $admin_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
            }
            .content {
                background: white;
                padding: 30px;
                border-radius: 0 0 5px 5px;
            }
            .email-highlight {
                font-size: 18px;
                font-weight: bold;
                color: #667eea;
                padding: 15px;
                background: #f5f5f5;
                border-left: 4px solid #667eea;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Newsletter Subscription</h2>
            </div>
            <div class='content'>
                <p>A new user has subscribed to your newsletter!</p>
                
                <div class='email-highlight'>
                    " . htmlspecialchars($email) . "
                </div>
                
                <p><strong>Next Steps:</strong></p>
                <ul>
                    <li>Add this email to your mailing list</li>
                    <li>Send a welcome email (optional)</li>
                    <li>Track engagement and preferences</li>
                </ul>
                
                <div class='footer'>
                    <p>Subscription received on " . date('F j, Y \a\t g:i A') . "</p>
                    <p>From: ingencloudtechnologies.com</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Send notification to admin
    $admin_sent = send_email_resend(
        $config['resend_api_key'],
        $config['from_email'],
        $config['from_name'],
        $config['recipient_email'],
        $admin_body,
        $admin_subject,
        $admin_body
    );
    
    // Prepare welcome email for subscriber
    $subscriber_subject = 'Welcome to Ingen Cloud Technologies Newsletter!';
    $subscriber_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 40px 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
            }
            .header h1 {
                margin: 0;
                font-size: 32px;
            }
            .content {
                background: white;
                padding: 40px 30px;
                border: 1px solid #ddd;
                border-radius: 0 0 5px 5px;
            }
            .welcome-text {
                font-size: 18px;
                margin: 20px 0;
            }
            .cta-button {
                display: inline-block;
                padding: 15px 30px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
                font-weight: bold;
            }
            .features {
                margin: 30px 0;
            }
            .feature-item {
                padding: 15px;
                margin: 10px 0;
                background: #f9f9f9;
                border-left: 4px solid #667eea;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 12px;
                color: #666;
            }
            .social-links {
                margin: 20px 0;
            }
            .social-links a {
                display: inline-block;
                margin: 0 10px;
                color: #667eea;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Welcome to Ingen! 🎉</h1>
            </div>
            <div class='content'>
                <p class='welcome-text'>Thank you for subscribing to Ingen Cloud Technologies newsletter!</p>
                
                <p>We're excited to have you join our community of innovators, entrepreneurs, and technology enthusiasts.</p>
                
                <div class='features'>
                    <h3>What to Expect:</h3>
                    <div class='feature-item'>
                        <strong>🚀 Latest Tech Trends</strong><br>
                        Stay ahead with insights on cloud computing, web development, and digital transformation
                    </div>
                    <div class='feature-item'>
                        <strong>💡 Expert Tips & Guides</strong><br>
                        Practical advice from our team of experienced developers and consultants
                    </div>
                    <div class='feature-item'>
                        <strong>🎁 Exclusive Offers</strong><br>
                        Special discounts and early access to our services and products
                    </div>
                    <div class='feature-item'>
                        <strong>📊 Case Studies</strong><br>
                        Real success stories from businesses we've helped transform
                    </div>
                </div>
                
                <center>
                    <a href='https://ingencloudtechnologies.com' class='cta-button'>Visit Our Website</a>
                </center>
                
                <p style='margin-top: 30px;'>Have a project in mind? We'd love to hear from you!</p>
                <p><a href='https://ingencloudtechnologies.com/contact.html' style='color: #667eea;'>Get in touch →</a></p>
                
                <div class='social-links'>
                    <p><strong>Follow Us:</strong></p>
                    <a href='#'>LinkedIn</a> | 
                    <a href='#'>Instagram</a> | 
                    <a href='#'>YouTube</a>
                </div>
                
                <div class='footer'>
                    <p>You're receiving this email because you subscribed to our newsletter at ingencloudtechnologies.com</p>
                    <p><strong>Ingen Cloud Technologies</strong><br>
                    Milton Keynes, UK | Accra, Ghana</p>
                    <p>Questions? Email us at <a href='mailto:info@ingencloudtechnologies.com' style='color: #667eea;'>info@ingencloudtechnologies.com</a></p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Send welcome email to subscriber
    $subscriber_sent = send_email_resend(
        $config['resend_api_key'],
        $config['from_email'],
        $config['from_name'],
        $email,
        $subscriber_body,
        $subscriber_subject,
        $subscriber_body
    );
    
    if ($admin_sent && $subscriber_sent) {
        $response['success'] = true;
        $response['message'] = $config['success_message'];
        http_response_code(200);
    } else {
        $response['message'] = $config['error_message'];
        error_log('Newsletter subscription email sending failed for: ' . $email);
        http_response_code(500);
    }
    
} catch (Exception $e) {
    $response['message'] = $config['error_message'];
    error_log('Error in newsletter.php: ' . $e->getMessage());
    http_response_code(500);
}

// Return JSON response
echo json_encode($response);
exit;
