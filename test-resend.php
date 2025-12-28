<?php
/**
 * Test script to verify Resend API integration
 * This file should be deleted after testing
 */

// Load environment variable
$api_key = getenv('RESEND_API_KEY') ?: $_ENV['RESEND_API_KEY'] ?? '';

echo "=== Resend API Test ===\n\n";

// Check if API key is loaded
if (empty($api_key)) {
    echo "❌ ERROR: RESEND_API_KEY environment variable is NOT set\n";
    echo "Please set it in Vercel: Settings → Environment Variables\n";
    exit(1);
}

echo "✓ API Key loaded: " . substr($api_key, 0, 10) . "..." . substr($api_key, -4) . "\n\n";

// Test API connection
echo "Testing Resend API connection...\n";

$ch = curl_init();

$test_data = [
    'from' => 'Ingen Cloud Technologies <noreply@ingencloudtechnologies.com>',
    'to' => ['info@ingencloudtechnologies.com'],
    'subject' => 'Test Email from Ingen - Resend Integration',
    'html' => '<html><body><h1>Test Email</h1><p>This is a test email to verify Resend integration is working correctly.</p><p>Sent at: ' . date('Y-m-d H:i:s') . '</p></body></html>'
];

curl_setopt_array($ch, [
    CURLOPT_URL => 'https://api.resend.com/emails',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($test_data),
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $api_key,
        'Content-Type: application/json'
    ]
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo "\nHTTP Status Code: $http_code\n";

if ($error) {
    echo "❌ cURL Error: $error\n";
    exit(1);
}

if ($http_code >= 200 && $http_code < 300) {
    echo "✓ SUCCESS: Test email sent successfully!\n";
    echo "Response: $response\n";
    $response_data = json_decode($response, true);
    if (isset($response_data['id'])) {
        echo "\n✓ Email ID: " . $response_data['id'] . "\n";
    }
    echo "\nCheck your inbox at info@ingencloudtechnologies.com\n";
} else {
    echo "❌ FAILED: API returned error\n";
    echo "Response: $response\n";
    
    $error_data = json_decode($response, true);
    if (isset($error_data['message'])) {
        echo "\nError Message: " . $error_data['message'] . "\n";
        
        // Common error hints
        if (strpos($error_data['message'], 'domain') !== false) {
            echo "\n💡 Hint: You need to verify your domain in Resend dashboard\n";
            echo "   Go to: https://resend.com/domains\n";
        }
        if (strpos($error_data['message'], 'API key') !== false) {
            echo "\n💡 Hint: Check if your API key is valid in Resend dashboard\n";
            echo "   Go to: https://resend.com/api-keys\n";
        }
    }
    exit(1);
}

echo "\n=== Test Complete ===\n";
