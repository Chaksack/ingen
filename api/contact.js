/**
 * Contact Form Handler for Vercel Serverless Function
 * Handles contact form submissions and sends emails using Resend
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
        message: 'Email service is not configured. Please contact the administrator.'
      });
    }

    // Parse form data
    const { name, email, phone, company, Budget: budget, solution, message } = req.body;

    // Validation
    const errors = [];

    if (!name || name.trim().length < 2) {
      errors.push('Name is required and must be at least 2 characters');
    }

    if (!email || !validateEmail(email)) {
      errors.push('Valid email address is required');
    }

    if (!phone || !validatePhone(phone)) {
      errors.push('Valid phone number is required');
    }

    if (!budget || budget === '0') {
      errors.push('Budget is required');
    }

    if (!solution || solution.trim().length === 0) {
      errors.push('Service is required');
    }

    if (!message || message.trim().length < 10) {
      errors.push('Message is required and must be at least 10 characters');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Please fix the following errors: ' + errors.join(', '),
        errors: errors
      });
    }

    // Map budget value to readable text
    const budgetRanges = {
      '1': '£5,000 - £10,000',
      '2': '£10,000 - £15,000',
      '3': '£15,000 - £20,000',
      '4': '£20,000 - £25,000',
      '5': '£25,000 - Above'
    };
    const budgetText = budgetRanges[budget] || 'Not specified';

    // Prepare email HTML
    const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
            .content { background: white; padding: 30px; border-radius: 0 0 5px 5px; }
            .field { margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-left: 4px solid #667eea; }
            .label { font-weight: bold; color: #667eea; display: block; margin-bottom: 5px; }
            .value { color: #333; }
            .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
                <p>Ingen Cloud Technologies</p>
            </div>
            <div class='content'>
                <div class='field'><span class='label'>Name:</span><span class='value'>${escapeHtml(name)}</span></div>
                <div class='field'><span class='label'>Email:</span><span class='value'>${escapeHtml(email)}</span></div>
                <div class='field'><span class='label'>Phone:</span><span class='value'>${escapeHtml(phone)}</span></div>
                <div class='field'><span class='label'>Company:</span><span class='value'>${company ? escapeHtml(company) : 'Not provided'}</span></div>
                <div class='field'><span class='label'>Budget:</span><span class='value'>${escapeHtml(budgetText)}</span></div>
                <div class='field'><span class='label'>Service:</span><span class='value'>${escapeHtml(solution)}</span></div>
                <div class='field'><span class='label'>Message:</span><div class='value' style='white-space: pre-wrap;'>${escapeHtml(message)}</div></div>
                <div class='footer'>
                    <p>This email was sent from the contact form on ingencloudtechnologies.com</p>
                    <p>Submission Time: ${new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    </body>
    </html>`;

    // Send main email via Resend
    const mainEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Ingen Cloud Technologies <noreply@ingencloudtechnologies.com>',
        to: ['info@ingencloudtechnologies.com'],
        reply_to: [`${name} <${email}>`],
        subject: `New Contact Form Submission - ${name}`,
        html: emailBody
      })
    });

    if (!mainEmailResponse.ok) {
      const errorText = await mainEmailResponse.text();
      console.error('Resend API Error:', errorText);
      throw new Error('Failed to send email');
    }

    // Send auto-reply to customer
    const autoReplyBody = `
    <!DOCTYPE html>
    <html>
    <head><meta charset='UTF-8'><style>body{font-family:Arial,sans-serif;line-height:1.6;color:#333}.container{max-width:600px;margin:0 auto;padding:20px}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:30px;text-align:center;border-radius:5px 5px 0 0}.content{background:white;padding:30px;border:1px solid #ddd;border-radius:0 0 5px 5px}.footer{text-align:center;margin-top:20px;padding-top:20px;border-top:1px solid #ddd;font-size:12px;color:#666}</style></head>
    <body>
        <div class='container'>
            <div class='header'><h1>Thank You!</h1></div>
            <div class='content'>
                <p>Dear ${escapeHtml(name)},</p>
                <p>Thank you for reaching out to Ingen Cloud Technologies. We have received your inquiry and will respond within 24-48 hours.</p>
                <p>Here's a summary of what you sent us:</p>
                <ul>
                    <li><strong>Service:</strong> ${escapeHtml(solution)}</li>
                    <li><strong>Budget:</strong> ${budgetText}</li>
                </ul>
                <p>In the meantime, feel free to explore our services at <a href='https://ingencloudtechnologies.com'>ingencloudtechnologies.com</a></p>
                <p>Best regards,<br><strong>Ingen Cloud Technologies Team</strong></p>
                <div class='footer'>
                    <p>This is an automated response. Please do not reply to this email.</p>
                    <p>For urgent inquiries, contact us at info@ingencloudtechnologies.com or call (505) 555-0125</p>
                </div>
            </div>
        </div>
    </body>
    </html>`;

    // Send auto-reply (don't fail if this doesn't work)
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Ingen Cloud Technologies <noreply@ingencloudtechnologies.com>',
          to: [email],
          subject: 'Thank you for contacting Ingen Cloud Technologies',
          html: autoReplyBody
        })
      });
    } catch (autoReplyError) {
      console.error('Auto-reply failed:', autoReplyError);
      // Don't fail the whole request if auto-reply fails
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Error in contact form:', error);
    return res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or email us directly.'
    });
  }
}

// Helper functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 15;
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
