# Vercel Deployment Fix - Contact & Newsletter Forms

## Problem Fixed ✅

The 405 errors for `mail.php` and `newsletter.php` occurred because **Vercel doesn't support PHP**. Vercel uses Node.js serverless functions instead.

## What Was Changed

### 1. Created Serverless Functions
- **`/api/contact.js`** - Handles contact form submissions (replaces mail.php)
- **`/api/newsletter.js`** - Handles newsletter subscriptions (replaces newsletter.php)

### 2. Updated Frontend
- **`contact.html`** - Now sends to `/api/contact` instead of `mail.php`
- **`assets/js/newsletter.js`** - Now sends to `/api/newsletter` instead of `newsletter.php`

### 3. Added Vercel Configuration
- **`vercel.json`** - Configures serverless functions and rewrites
  - Rewrites `/mail.php` → `/api/contact` (for backward compatibility)
  - Rewrites `/newsletter.php` → `/api/newsletter` (for backward compatibility)

## Deployment Steps

### Step 1: Set Environment Variable in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (ingen)
3. Go to **Settings** → **Environment Variables**
4. Add variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Your Resend API key (starts with `re_`)
   - **Environments:** ✓ Production, ✓ Preview, ✓ Development
5. Click **Save**

### Step 2: Deploy Changes

You have two options:

**Option A: Git Push (Automatic)**
```bash
cd /Users/andrewchakdahah/Documents/ingen
git add .
git commit -m "Fix contact and newsletter forms for Vercel deployment"
git push
```
Vercel will automatically detect and deploy.

**Option B: Vercel CLI (Manual)**
```bash
cd /Users/andrewchakdahah/Documents/ingen
vercel --prod
```

### Step 3: Verify Deployment

1. **Wait for deployment** to complete (usually 1-2 minutes)
2. **Test contact form:**
   - Go to: https://www.ingencloudtechnologies.com/contact.html
   - Fill out and submit the form
   - Should see success message
   - Check emails

3. **Test newsletter:**
   - Scroll to footer on any page
   - Enter email and subscribe
   - Should see success message
   - Check emails

## How It Works Now

### Contact Form Flow:
```
User submits form
    ↓
contact.html sends POST to /api/contact
    ↓
api/contact.js processes request
    ↓
Sends email via Resend API
    ↓
Returns JSON response
```

### Newsletter Form Flow:
```
User submits email
    ↓
newsletter.js sends POST to /api/newsletter
    ↓
api/newsletter.js processes request
    ↓
Sends emails via Resend API
    ↓
Returns JSON response
```

## API Endpoints

Your forms now use these serverless functions:

- **Contact Form:** `https://www.ingencloudtechnologies.com/api/contact`
- **Newsletter:** `https://www.ingencloudtechnologies.com/api/newsletter`

The old PHP URLs still work due to rewrites in vercel.json:
- `/mail.php` → redirects to `/api/contact`
- `/newsletter.php` → redirects to `/api/newsletter`

## Testing Locally (Optional)

If you want to test before deploying:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Run local dev server:**
   ```bash
   cd /Users/andrewchakdahah/Documents/ingen
   vercel dev
   ```

3. **Test at:** http://localhost:3000

4. **Note:** You need to create `.env` file:
   ```
   RESEND_API_KEY=your_api_key_here
   ```

## What to Delete (Optional)

These PHP files are no longer needed and can be deleted:
- `mail.php`
- `newsletter.php`
- `test-resend.php`

**But keep them for now** until you confirm everything works!

## Troubleshooting

### Still Getting 405 Error?
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Wait a few minutes for Vercel deployment to propagate
3. Check Vercel deployment logs

### Getting 500 Error?
1. Check Vercel Function logs:
   - Dashboard → Project → Functions tab
   - Look for errors in contact.js or newsletter.js
2. Verify `RESEND_API_KEY` is set in Vercel
3. Check Resend API key is valid

### Emails Not Sending?
1. Check Resend dashboard: https://resend.com/emails
2. Verify domain is set up in Resend
3. Check Vercel function logs for API errors
4. Ensure using correct from_email:
   - For testing: `onboarding@resend.dev`
   - For production: `noreply@ingencloudtechnologies.com` (requires domain verification)

### CORS Errors?
The serverless functions include CORS headers, but if you still see CORS errors:
1. Check browser console for specific error
2. Verify your domain is in the allowedOrigins array in both API files
3. Clear cache and try again

## Monitoring

**View Function Logs:**
1. Vercel Dashboard → Your Project
2. Click on latest deployment
3. Go to **Functions** tab
4. Click on `contact.js` or `newsletter.js`
5. View real-time logs

**Check Email Delivery:**
1. Resend Dashboard: https://resend.com/emails
2. See all sent emails, delivery status, opens, clicks

## Summary

✅ Converted PHP to Node.js serverless functions
✅ Updated frontend to use new API endpoints  
✅ Added Vercel configuration
✅ Set up backward-compatible rewrites
✅ Forms will work after deployment + environment variable setup

**Next Step:** Deploy to Vercel and set RESEND_API_KEY environment variable! 🚀
