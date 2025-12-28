# Resend Email Integration - Testing Guide

## Current Status

✅ Your mail.php has been updated to use Resend API
✅ Environment variable configuration added (reads from Vercel)
✅ API key validation implemented
✅ Error logging configured

## What Needs to Be Done in Vercel

### 1. Set Up Resend API Key

1. **Get Resend API Key:**
   - Go to https://resend.com
   - Sign up or log in
   - Navigate to "API Keys"
   - Create a new API key with "Sending access"
   - Copy the full API key (starts with `re_`)

2. **Add to Vercel Environment Variables:**
   - Go to your Vercel project dashboard
   - Navigate to: **Settings → Environment Variables**
   - Click "Add New"
   - Set:
     - **Key:** `RESEND_API_KEY`
     - **Value:** Your full Resend API key (e.g., `re_RuX5qiJy...`)
     - **Environments:** Select all (Production, Preview, Development)
   - Click "Save"

3. **Redeploy:**
   - Go to Deployments tab
   - Click "Redeploy" on your latest deployment
   - OR: Push a new commit to trigger deployment

### 2. Verify Your Domain in Resend

⚠️ **IMPORTANT:** Resend only allows sending from verified domains in production.

**For Testing (Use Resend's Test Domain):**
- In `mail.php` line 20, change:
  ```php
  'from_email' => 'onboarding@resend.dev',
  ```

**For Production (Verify Your Domain):**
1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter: `ingencloudtechnologies.com`
4. Add the DNS records shown to your domain registrar:
   - SPF record
   - DKIM records (usually 3)
   - DMARC record (optional but recommended)
5. Wait for verification (can take a few minutes to 48 hours)
6. Once verified, use:
   ```php
   'from_email' => 'noreply@ingencloudtechnologies.com',
   ```

## Testing Methods

### Method 1: Run Test Script (Local/Development)

If you have PHP CLI access:

```bash
cd /Users/andrewchakdahah/Documents/ingen
php test-resend.php
```

This will:
- ✓ Check if API key is loaded
- ✓ Test API connection
- ✓ Send a test email
- ✓ Display detailed error messages if something fails

### Method 2: Test Contact Form (Production)

1. **Deploy to Vercel** (make sure environment variable is set)

2. **Visit your contact page:**
   - Go to: https://your-domain.com/contact.html

3. **Fill out the form:**
   - Name: Test User
   - Email: your-email@example.com
   - Phone: 1234567890
   - Company: Test Company
   - Budget: Select any option
   - Service: Web Development
   - Message: This is a test message

4. **Submit and verify:**
   - ✓ Should see success message
   - ✓ Check info@ingencloudtechnologies.com for the email
   - ✓ Check your email for auto-reply

### Method 3: Check Logs

**In Vercel:**
1. Go to your project
2. Click on your deployment
3. Go to "Functions" tab
4. Check logs for mail.php
5. Look for:
   - ✓ "200 OK" responses (success)
   - ❌ Any error messages
   - ❌ "RESEND_API_KEY not set" errors

## Common Issues & Solutions

### Issue: "RESEND_API_KEY environment variable is not set"
**Solution:** 
- Set the environment variable in Vercel
- Redeploy your application
- Environment variables only work after redeployment

### Issue: "Domain not verified"
**Solution:**
- Use `onboarding@resend.dev` for testing
- OR verify your domain in Resend dashboard

### Issue: "401 Unauthorized"
**Solution:**
- Check if API key is correct
- Regenerate API key in Resend dashboard
- Update in Vercel environment variables

### Issue: "403 Forbidden" or "from address not allowed"
**Solution:**
- Verify your domain in Resend
- OR use `onboarding@resend.dev` for testing

### Issue: Email not received
**Solution:**
- Check spam folder
- Verify recipient email is correct
- Check Resend logs at https://resend.com/emails
- Check Vercel function logs

## Newsletter/Subscribe Section

Currently, the subscribe forms in the footer have:
```html
<form action="#" class="subscribe-form">
```

This means they're not connected to any backend. To enable newsletter subscriptions:

### Option 1: Create separate newsletter handler
Create `newsletter.php` to handle email subscriptions (store in database or send to mailing list service)

### Option 2: Use a service like Mailchimp
Integrate with Mailchimp or similar service for newsletter management

### Option 3: Simple email notification
Update the form action to send subscription emails via mail.php

Let me know if you want to implement newsletter functionality!

## Monitoring

**Check Resend Dashboard:**
- https://resend.com/emails
- View all sent emails
- Check delivery status
- View bounce/complaint rates

**Vercel Function Logs:**
- Real-time logs of mail.php execution
- See any PHP errors or warnings

## Next Steps

1. ✅ Set RESEND_API_KEY in Vercel
2. ✅ Deploy/Redeploy your site
3. ✅ Test using contact form
4. ✅ Verify domain (for production use)
5. ⏳ Implement newsletter subscription (optional)

## Files Modified

- `mail.php` - Updated to use Resend API with environment variables
- `test-resend.php` - Test script (can be deleted after testing)
- `RESEND_TESTING.md` - This documentation

## Need Help?

If you encounter issues:
1. Check Vercel function logs
2. Check Resend dashboard logs
3. Run the test-resend.php script
4. Review error messages in browser console (Network tab)
