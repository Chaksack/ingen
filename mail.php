<?php
/**
 * Contact Form Handler for Ingen Cloud Technologies
 * This file processes contact form submissions and sends emails using Resend
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
    'subject_prefix' => 'New Contact Form Submission',
    'success_message' => 'Thank you for your message! We will get back to you soon.',
    'error_message' => 'Sorry, there was an error sending your message. Please try again or email us directly.',
    'allowed_domains' => ['ingencloudtechnologies.com'], 
];

// Validate that Resend API key is configured
if (empty($config['resend_api_key'])) {
    error_log('CRITICAL: RESEND_API_KEY environment variable is not set');
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Email service is not configured. Please contact the administrator.'
    ]);
    exit;
}

// CORS headers (adjust based on your domain)
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

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Function to validate email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to validate phone
function validate_phone($phone) {
    // Remove all non-numeric characters for validation
    $clean_phone = preg_replace('/[^0-9]/', '', $phone);
    return strlen($clean_phone) >= 10 && strlen($clean_phone) <= 15;
}

// Function to send email via Resend API
function send_email_resend($api_key, $from_email, $from_name, $to_email, $to_name, $reply_to, $subject, $html_body) {
    $ch = curl_init();
    
    $data = [
        'from' => $from_name . ' <' . $from_email . '>',
        'to' => [$to_name . ' <' . $to_email . '>'],
        'subject' => $subject,
        'html' => $html_body
    ];
    
    if (!empty($reply_to)) {
        $data['reply_to'] = [$reply_to];
    }
    
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
    // Collect and sanitize form data
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? sanitize_input($_POST['phone']) : '';
    $company = isset($_POST['company']) ? sanitize_input($_POST['company']) : '';
    $budget = isset($_POST['Budget']) ? sanitize_input($_POST['Budget']) : '';
    $solution = isset($_POST['solution']) ? sanitize_input($_POST['solution']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

    // Validation
    $errors = [];

    // Required fields validation
    if (empty($name)) {
        $errors[] = 'Name is required';
    } elseif (strlen($name) < 2) {
        $errors[] = 'Name must be at least 2 characters';
    }

    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!validate_email($email)) {
        $errors[] = 'Invalid email address';
    }

    if (empty($phone)) {
        $errors[] = 'Phone number is required';
    } elseif (!validate_phone($phone)) {
        $errors[] = 'Invalid phone number';
    }

    if (empty($budget) || $budget === '0') {
        $errors[] = 'Budget is required';
    }

    if (empty($solution)) {
        $errors[] = 'Service is required';
    }

    if (empty($message)) {
        $errors[] = 'Message is required';
    } elseif (strlen($message) < 10) {
        $errors[] = 'Message must be at least 10 characters';
    }

    // If there are validation errors, return them
    if (!empty($errors)) {
        $response['errors'] = $errors;
        $response['message'] = 'Please fix the following errors: ' . implode(', ', $errors);
        http_response_code(400);
        echo json_encode($response);
        exit;
    }

    // Map budget value to readable text
    $budget_ranges = [
        '1' => '£5,000 - £10,000',
        '2' => '£10,000 - £15,000',
        '3' => '£15,000 - £20,000',
        '4' => '£20,000 - £25,000',
        '5' => '£25,000 - Above'
    ];
    $budget_text = isset($budget_ranges[$budget]) ? $budget_ranges[$budget] : 'Not specified';

    // Prepare email content
    $email_subject = $config['subject_prefix'] . ' - ' . $name;
    
    // HTML email body
    $email_body = "
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
            .field {
                margin-bottom: 15px;
                padding: 10px;
                background: #f5f5f5;
                border-left: 4px solid #667eea;
            }
            .label {
                font-weight: bold;
                color: #667eea;
                display: block;
                margin-bottom: 5px;
            }
            .value {
                color: #333;
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
                <h2>New Contact Form Submission</h2>
                <p>Ingen Cloud Technologies</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span>
                    <span class='value'>" . htmlspecialchars($name) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>Email:</span>
                    <span class='value'>" . htmlspecialchars($email) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>Phone:</span>
                    <span class='value'>" . htmlspecialchars($phone) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>Company:</span>
                    <span class='value'>" . (empty($company) ? 'Not provided' : htmlspecialchars($company)) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>Budget:</span>
                    <span class='value'>" . htmlspecialchars($budget_text) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>Service:</span>
                    <span class='value'>" . htmlspecialchars($solution) . "</span>
                </div>
                
                <div class='field'>
                    <span class='label'>Message:</span>
                    <div class='value' style='white-space: pre-wrap;'>" . htmlspecialchars($message) . "</div>
                </div>
                
                <div class='footer'>
                    <p>This email was sent from the contact form on ingencloudtechnologies.com</p>
                    <p>Submission Time: " . date('Y-m-d H:i:s') . "</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";

    // Send email via Resend
    $mail_sent = send_email_resend(
        $config['resend_api_key'],
        $config['from_email'],
        $config['from_name'],
        $config['recipient_email'],
        $config['recipient_name'],
        $name . ' <' . $email . '>',
        $email_subject,
        $email_body
    );

    if ($mail_sent) {
        // Send auto-reply to customer
        $auto_reply_subject = 'Thank you for contacting Ingen Cloud Technologies';
        $auto_reply_body = "
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
                    padding: 30px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    background: white;
                    padding: 30px;
                    border: 1px solid #ddd;
                    border-radius: 0 0 5px 5px;
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
                    <h1>Thank You!</h1>
                </div>
                <div class='content'>
                    <p>Dear " . htmlspecialchars($name) . ",</p>
                    
                    <p>Thank you for reaching out to Ingen Cloud Technologies. We have received your inquiry and will respond within 24-48 hours.</p>
                    
                    <p>Here's a summary of what you sent us:</p>
                    <ul>
                        <li><strong>Service:</strong> " . htmlspecialchars($solution) . "</li>
                        <li><strong>Budget:</strong> $budget_text</li>
                    </ul>
                    
                    <p>In the meantime, feel free to explore our services at <a href='https://ingencloudtechnologies.com'>ingencloudtechnologies.com</a></p>
                    
                    <p>Best regards,<br>
                    <strong>Ingen Cloud Technologies Team</strong></p>
                    
                    <div class='footer'>
                        <p>This is an automated response. Please do not reply to this email.</p>
                        <p>For urgent inquiries, contact us at info@ingencloudtechnologies.com or call (505) 555-0125</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        ";
        
        // Send auto-reply via Resend (don't fail if this doesn't work)
        send_email_resend(
            $config['resend_api_key'],
            $config['from_email'],
            $config['from_name'],
            $email,
            $name,
            '',
            $auto_reply_subject,
            $auto_reply_body
        );

        // Success response
        $response['success'] = true;
        $response['message'] = $config['success_message'];
        http_response_code(200);
    } else {
        // Email sending failed
        $response['message'] = $config['error_message'];
        error_log('Mail sending failed for: ' . $email);
        http_response_code(500);
    }

} catch (Exception $e) {
    // Handle any unexpected errors
    $response['message'] = $config['error_message'];
    error_log('Error in mail.php: ' . $e->getMessage());
    http_response_code(500);
}

// Return JSON response
echo json_encode($response);
exit;
