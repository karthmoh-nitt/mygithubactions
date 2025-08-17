# 📧 Email Notification Configuration Guide

## 🎯 **Overview**

This guide explains how to configure email notifications for your Playwright test reports. The system generates beautiful HTML emails with test summaries and direct links to reports.

## 🔧 **Email Configuration Options**

### **Option 1: Using SendGrid (Recommended)**

#### **Setup Steps:**
1. **Create SendGrid Account**
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Verify your sender email
   - Create an API key

2. **Add GitHub Secrets**
   ```bash
   # In your GitHub repository settings
   SENDGRID_API_KEY=your_sendgrid_api_key
   EMAIL_FROM=your-verified-email@domain.com
   EMAIL_TO=recipient@domain.com
   ```

3. **Update Workflow**
   ```yaml
   - name: Send Email via SendGrid
     uses: sendgrid/action-sendgrid@v1
     with:
       api-key: ${{ secrets.SENDGRID_API_KEY }}
       from: ${{ secrets.EMAIL_FROM }}
       to: ${{ secrets.EMAIL_TO }}
       subject: "Playwright Test Report - Run ${{ github.run_number }}"
       html: email-content.html
   ```

### **Option 2: Using SMTP with GitHub Actions**

#### **Setup Steps:**
1. **Add SMTP Secrets**
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   EMAIL_TO=recipient@domain.com
   ```

2. **Add SMTP Email Step**
   ```yaml
   - name: Send Email via SMTP
     run: |
       # Install mailutils
       sudo apt-get update && sudo apt-get install -y mailutils
       
       # Send email
       echo "Subject: Playwright Test Report - Run ${{ github.run_number }}" > email.txt
       echo "From: ${{ secrets.SMTP_USER }}" >> email.txt
       echo "To: ${{ secrets.EMAIL_TO }}" >> email.txt
       echo "Content-Type: text/html" >> email.txt
       echo "" >> email.txt
       cat email-content.html >> email.txt
       
       # Send via SMTP
       cat email.txt | sendmail -t
   ```

### **Option 3: Using External Email Service (AWS SES, Mailgun, etc.)**

#### **AWS SES Example:**
```yaml
- name: Send Email via AWS SES
  run: |
    # Install AWS CLI
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
    
    # Send email via AWS SES
    aws ses send-email \
      --from "${{ secrets.EMAIL_FROM }}" \
      --destination "ToAddresses=${{ secrets.EMAIL_TO }}" \
      --message "Subject={Data='Playwright Test Report - Run ${{ github.run_number }}'},Body={Html={Data='$(cat email-content.html)'}}"
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    AWS_DEFAULT_REGION: us-east-1
```

## 📧 **Email Content Customization**

### **Current Email Features:**
- ✅ **Test Summary** with pass/fail counts
- ✅ **Workflow Information** (run number, commit, branch)
- ✅ **Direct Links** to Allure report and GitHub Actions
- ✅ **Professional Styling** with CSS
- ✅ **Responsive Design** for mobile devices

### **Customization Options:**

#### **1. Add Custom Fields**
```html
<div class="summary">
    <h2>📊 Test Summary</h2>
    <p><strong>Environment:</strong> ${{ github.ref_name }}</p>
    <p><strong>Triggered by:</strong> ${{ github.actor }}</p>
    <p><strong>Duration:</strong> ${{ steps.test-duration.outputs.duration }}</p>
</div>
```

#### **2. Add Test Details**
```html
<div class="test-details">
    <h3>🔍 Test Details</h3>
    <p><strong>Project 1:</strong> ${{ steps.project1-summary.outputs.status }}</p>
    <p><strong>Project 2:</strong> ${{ steps.project2-summary.outputs.status }}</p>
    <p><strong>Project 3:</strong> ${{ steps.project3-summary.outputs.status }}</p>
</div>
```

#### **3. Add Failure Details**
```html
<div class="failures">
    <h3>❌ Failed Tests</h3>
    <ul>
    ${{ steps.failure-details.outputs.failed-tests }}
    </ul>
</div>
```

## 🎛️ **Configuration Examples**

### **Basic Configuration**
```yaml
# In your workflow
env:
  EMAIL_RECIPIENTS: "team@company.com,qa@company.com"
  EMAIL_SUBJECT: "Playwright Test Report - ${{ github.repository }}"
```

### **Advanced Configuration**
```yaml
# Conditional email sending
- name: Send Email Notification
  if: |
    always() && 
    github.ref == 'refs/heads/main' && 
    (contains(github.event.head_commit.message, '[email]') || 
     contains(github.event.head_commit.message, 'test-failure'))
  run: |
    # Send email only on specific conditions
```

### **Multiple Recipients**
```yaml
# Send to different recipients based on conditions
- name: Send to Developers
  if: contains(github.event.head_commit.message, '[dev]')
  run: |
    # Send to dev team
    
- name: Send to QA
  if: contains(github.event.head_commit.message, '[qa]')
  run: |
    # Send to QA team
    
- name: Send to Management
  if: github.ref == 'refs/heads/main'
  run: |
    # Send to management
```

## 🔔 **Notification Triggers**

### **When to Send Emails:**
- ✅ **On Test Failures** - Immediate notification
- ✅ **Daily Summary** - Scheduled reports
- ✅ **Weekly Reports** - Trend analysis
- ✅ **Release Reports** - Before deployments
- ✅ **Manual Trigger** - On-demand reports

### **Conditional Logic:**
```yaml
# Send only on failures
if: failure()

# Send only on main branch
if: github.ref == 'refs/heads/main'

# Send only if tests failed
if: contains(steps.test-summary.outputs.failed-count, '0') == false

# Send only on specific days
if: format(github.event.head_commit.timestamp, 'EEEE') == 'Friday'
```

## 📊 **Email Templates**

### **Success Template**
```html
<div class="success-notification">
    <h2>✅ All Tests Passed!</h2>
    <p>Great job! All ${{ steps.test-summary.outputs.total-tests }} tests passed successfully.</p>
    <a href="https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/" class="button">View Report</a>
</div>
```

### **Failure Template**
```html
<div class="failure-notification">
    <h2>❌ Tests Failed!</h2>
    <p>Attention required: ${{ steps.test-summary.outputs.failed-tests }} tests failed.</p>
    <a href="https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}" class="button">View Details</a>
</div>
```

### **Trend Template**
```html
<div class="trend-notification">
    <h2>📈 Test Trend Report</h2>
    <p>This week's test performance:</p>
    <ul>
        <li>Total runs: ${{ steps.trend-summary.outputs.total-runs }}</li>
        <li>Success rate: ${{ steps.trend-summary.outputs.success-rate }}%</li>
        <li>Average duration: ${{ steps.trend-summary.outputs.avg-duration }}</li>
    </ul>
</div>
```

## 🔧 **Implementation Steps**

### **Step 1: Choose Email Service**
1. **SendGrid** (Recommended for beginners)
2. **SMTP** (Good for existing email infrastructure)
3. **AWS SES** (Cost-effective for high volume)

### **Step 2: Configure Secrets**
```bash
# Add these to your GitHub repository secrets
EMAIL_SERVICE_API_KEY=your_api_key
EMAIL_FROM=your-sender@domain.com
EMAIL_TO=recipient@domain.com
```

### **Step 3: Update Workflow**
```yaml
# Add email job to your workflow
email-notification:
  name: "Send Email Notification"
  needs: [generate-allure-report]
  runs-on: ubuntu-latest
  if: always() && github.ref == 'refs/heads/main'
  steps:
    # ... email steps
```

### **Step 4: Test Configuration**
1. **Trigger workflow manually**
2. **Check email delivery**
3. **Verify content formatting**
4. **Test different scenarios**

## 🚀 **Advanced Features**

### **1. Email Attachments**
```yaml
- name: Attach Report Files
  run: |
    # Create ZIP of report files
    zip -r test-report.zip allure-report/
    
    # Attach to email
    # (Implementation depends on email service)
```

### **2. Email Scheduling**
```yaml
# Daily summary at 9 AM
on:
  schedule:
    - cron: '0 9 * * *'
```

### **3. Email Templates**
```yaml
# Use different templates based on conditions
- name: Choose Email Template
  run: |
    if [ "${{ steps.test-summary.outputs.failed-count }}" -gt 0 ]; then
      cp templates/failure-email.html email-template.html
    else
      cp templates/success-email.html email-template.html
    fi
```

## 📋 **Best Practices**

### **1. Email Frequency**
- ✅ **Don't spam** - Use conditional triggers
- ✅ **Group notifications** - Daily/weekly summaries
- ✅ **Respect time zones** - Send at appropriate times

### **2. Content Management**
- ✅ **Keep it concise** - Focus on key metrics
- ✅ **Include action items** - What needs to be done
- ✅ **Provide context** - Why tests failed

### **3. Security**
- ✅ **Use secrets** - Never hardcode credentials
- ✅ **Validate recipients** - Prevent unauthorized access
- ✅ **Monitor usage** - Track email delivery

## 🎯 **Quick Start**

1. **Choose SendGrid** (easiest option)
2. **Add secrets** to GitHub repository
3. **Update workflow** with email job
4. **Test** with manual trigger
5. **Monitor** and adjust as needed

**Your email notification system is now ready to keep your team informed about test results!** 📧
