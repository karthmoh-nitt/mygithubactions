# 📧 Email Notification Setup Guide

## 🎯 **Quick Setup for Gmail (Recommended for PoC)**

### **Step 1: Enable 2-Factor Authentication**
1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled

### **Step 2: Generate App Password**
1. Go to **Security** → **App passwords**
2. Select **Mail** as the app
3. Select **Other (Custom name)** as device
4. Enter a name like "GitHub Actions"
5. Click **Generate**
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### **Step 3: Add GitHub Secrets**
1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `EMAIL_SMTP_HOST` | `smtp.gmail.com` | Gmail SMTP server |
| `EMAIL_SMTP_PORT` | `587` | Gmail SMTP port |
| `EMAIL_USERNAME` | `your-email@gmail.com` | Your Gmail address |
| `EMAIL_PASSWORD` | `abcd efgh ijkl mnop` | App password (16 chars) |
| `EMAIL_RECIPIENTS` | `your-email@gmail.com` | Where to send reports |

### **Step 4: Test the Setup**
1. Push a commit to trigger the workflow
2. Check the **email-notification** job in GitHub Actions
3. You should receive an email with test results

---

## 🔧 **Alternative Options**

### **Option 2: SendGrid (Production Ready)**
- Free tier: 100 emails/day
- Better for production use
- More reliable delivery

### **Option 3: AWS SES (Enterprise)**
- Very cost-effective for high volume
- Requires AWS account setup
- Best for production environments

---

## 🚨 **Security Best Practices**

### **For Production:**
- ✅ Use dedicated email service (SendGrid, AWS SES)
- ✅ Use environment-specific email addresses
- ✅ Implement email templates
- ✅ Add email filtering and routing

### **For PoC/Testing:**
- ✅ Use Gmail App Password (not regular password)
- ✅ Keep secrets secure
- ✅ Test with personal email first

---

## 📋 **Troubleshooting**

### **Common Issues:**
1. **"Authentication failed"** - Check app password
2. **"Connection timeout"** - Verify SMTP settings
3. **"Email not received"** - Check spam folder
4. **"Workflow failed"** - Check GitHub Actions logs

### **Debug Steps:**
1. Check the **email-notification** job logs
2. Verify all secrets are set correctly
3. Test SMTP connection manually
4. Check email provider settings

---

## 🎯 **Next Steps After Setup**

1. **Test with your Gmail** ✅
2. **Customize email template** (optional)
3. **Add multiple recipients** (optional)
4. **Set up production email service** (when ready)
5. **Configure email filtering** (optional)

---

## 📞 **Need Help?**

If you encounter issues:
1. Check the GitHub Actions logs
2. Verify your Gmail app password
3. Ensure all secrets are correctly set
4. Test with a simple email first
