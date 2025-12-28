/**
 * Newsletter Subscription Handler for Vercel Serverless Function
 * Handles newsletter subscriptions using Resend
 */

export default async function handler(req, res) {
  // Set CORS headers
  const allowedOrigins = [
    'https://ingencloudtechnologies.com',
    'https://www.ingencloudtechnologies.com',
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || origin?.includes('vercel.app')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Please use POST.'
    });
  }

  try {
    // Get Resend API key from environment
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
      console.error('CRITICAL: RESEND_API_KEY environment variable is not set');
      return res.status(500).json({
        success: false,
        message: 'Newsletter service is not configured. Please contact the administrator.'
      });
    }

    // Parse form data
    const { email } = req.body;

    // Validation
    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required'
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Prepare admin notification email
    const adminBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 5px 5px; }
            .email-highlight { font-size: 18px; font-weight: bold; color: #667eea; padding: 15px; background: #f5f5f5; border-left: 4px solid #667eea; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'><h2>New Newsletter Subscription</h2></div>
            <div class='content'>
                <p>A new user has subscribed to your newsletter!</p>
                <div class='email-highlight'>${escapeHtml(email)}</div>
                <p><strong>Next Steps:</strong></p>
                <ul>
                    <li>Add this email to your mailing list</li>
                    <li>Send a welcome email (optional)</li>
                    <li>Track engagement and preferences</li>
                </ul>
                <div class='footer'>
                    <p>Subscription received on ${new Date().toLocaleString()}</p>
                    <p>From: ingencloudtechnologies.com</p>
                </div>
            </div>
        </div>
    </body>
    </html>`;

    // Send admin notification
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Ingen Cloud Technologies <noreply@ingencloudtechnologies.com>',
        to: ['info@ingencloudtechnologies.com'],
        subject: `New Newsletter Subscription - ${email}`,
        html: adminBody
      })
    });

    if (!adminEmailResponse.ok) {
      const errorText = await adminEmailResponse.text();
      console.error('Resend API Error (admin):', errorText);
      throw new Error('Failed to send admin notification');
    }

    // Prepare welcome email
    const welcomeBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body{font-family:Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:40px 20px;text-align:center;border-radius:5px 5px 0 0}.header h1{margin:0;font-size:32px}.content{background:white;padding:40px 30px;border:1px solid #ddd;border-radius:0 0 5px 5px}.welcome-text{font-size:18px;margin:20px 0}.cta-button{display:inline-block;padding:15px 30px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;text-decoration:none;border-radius:5px;margin:20px 0;font-weight:bold}.features{margin:30px 0}.feature-item{padding:15px;margin:10px 0;background:#f9f9f9;border-left:4px solid #667eea}.footer{text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #ddd;font-size:12px;color:#666}.social-links{margin:20px 0}.social-links a{display:inline-block;margin:0 10px;color:#667eea;text-decoration:none}
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'><h1>Welcome to Ingen! 🎉</h1></div>
            <div class='content'>
                <p class='welcome-text'>Thank you for subscribing to Ingen Cloud Technologies newsletter!</p>
                <p>We're excited to have you join our community of innovators, entrepreneurs, and technology enthusiasts.</p>
                <div class='features'>
                    <h3>What to Expect:</h3>
                    <div class='feature-item'><strong>🚀 Latest Tech Trends</strong><br>Stay ahead with insights on cloud computing, web development, and digital transformation</div>
                    <div class='feature-item'><strong>💡 Expert Tips & Guides</strong><br>Practical advice from our team of experienced developers and consultants</div>
                    <div class='feature-item'><strong>🎁 Exclusive Offers</strong><br>Special discounts and early access to our services and products</div>
                    <div class='feature-item'><strong>📊 Case Studies</strong><br>Real success stories from businesses we've helped transform</div>
                </div>
                <center><a href='https://ingencloudtechnologies.com' class='cta-button'>Visit Our Website</a></center>
                <p style='margin-top:30px;'>Have a project in mind? We'd love to hear from you!</p>
                <p><a href='https://ingencloudtechnologies.com/contact.html' style='color:#667eea;'>Get in touch →</a></p>
                <div class='social-links'>
                    <p><strong>Follow Us:</strong></p>
                    <a href='#'>LinkedIn</a> | <a href='#'>Instagram</a> | <a href='#'>YouTube</a>
                </div>
                <div class='footer'>
                    <p>You're receiving this email because you subscribed to our newsletter at ingencloudtechnologies.com</p>
                    <p><strong>Ingen Cloud Technologies</strong><br>Milton Keynes, UK | Accra, Ghana</p>
                    <p>Questions? Email us at <a href='mailto:info@ingencloudtechnologies.com' style='color:#667eea;'>info@ingencloudtechnologies.com</a></p>
                </div>
            </div>
        </div>
    </body>
    </html>`;

    // Send welcome email to subscriber
    const welcomeEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Ingen Cloud Technologies <noreply@ingencloudtechnologies.com>',
        to: [email],
        subject: 'Welcome to Ingen Cloud Technologies Newsletter!',
        html: welcomeBody
      })
    });

    if (!welcomeEmailResponse.ok) {
      const errorText = await welcomeEmailResponse.text();
      console.error('Resend API Error (welcome):', errorText);
      // Don't fail completely if welcome email fails, as admin notification succeeded
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing! Check your email to confirm.'
    });

  } catch (error) {
    console.error('Error in newsletter subscription:', error);
    return res.status(500).json({
      success: false,
      message: 'Sorry, there was an error processing your subscription. Please try again.'
    });
  }
}

// Helper functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
