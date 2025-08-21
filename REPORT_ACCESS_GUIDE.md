# 📊 HTML Report Access Guide

## 🚀 **GitHub Pages (Recommended)**

After each workflow run, reports are automatically deployed to GitHub Pages:

**URL**: `https://karthmoh-nitt.github.io/mygithubactions/`

### Features:
- ✅ **Consolidated view** of all test projects
- ✅ **Individual project reports** 
- ✅ **Screenshots and traces**
- ✅ **Test execution details**
- ✅ **Accurate test counts** (7 tests)

## 📥 **GitHub Actions Artifacts**

### Step-by-step:
1. Go to your repository → **Actions** tab
2. Click on the latest workflow run
3. Scroll down to **"Artifacts"** section
4. Download **`consolidated-html-report`**
5. Extract and open `index.html` in your browser

### Available Artifacts:
- `consolidated-html-report` - Main consolidated report
- `html-report-project-1` - Individual Project 1 report
- `html-report-project-2` - Individual Project 2 report  
- `html-report-project-3` - Individual Project 3 report
- `screenshots-*` - Test screenshots
- `junit-results-*` - JUnit test results

## 💻 **Local Development**

### Run tests and view reports locally:
```bash
# Run tests
npm test

# Open HTML report
npx playwright show-report
```

### Local report features:
- ✅ **Real-time updates**
- ✅ **Interactive debugging**
- ✅ **Screenshot viewing**
- ✅ **Trace analysis**

## 📧 **Email Notifications**

Email notifications are sent automatically when:
- ✅ **All required secrets are configured**
- ✅ **Workflow completes successfully**

### Required GitHub Secrets:
- `EMAIL_SMTP_HOST` - SMTP server hostname
- `EMAIL_SMTP_PORT` - SMTP port (usually 587)
- `EMAIL_SMTP_USER` - Email username
- `EMAIL_SMTP_PASS` - Email password
- `EMAIL_TO` - Recipient email address

## 🎯 **Report Features**

### Consolidated Report:
- **Test Summary**: Total tests, passed, failed, skipped
- **Project Breakdown**: Individual project results
- **Execution Time**: Test duration and performance
- **Screenshots**: Visual evidence from tests
- **Error Details**: Stack traces and failure information

### Individual Project Reports:
- **Detailed test results** for each project
- **Step-by-step execution** logs
- **Screenshot attachments**
- **Performance metrics**

## 🔧 **Troubleshooting**

### GitHub Pages not accessible:
1. Check repository Settings → Pages
2. Ensure "Source" is set to "GitHub Actions"
3. Verify workflow completed successfully

### Email not received:
1. Check GitHub Secrets are configured
2. Verify SMTP settings are correct
3. Check workflow logs for email errors

### Reports not generated:
1. Ensure tests ran successfully
2. Check workflow artifacts section
3. Verify no errors in workflow execution
