# Allure Reporting Guide

This guide provides step-by-step instructions for generating and viewing Allure reports for individual projects and consolidated reports across all projects.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Individual Project Reports](#individual-project-reports)
- [Consolidated Reports](#consolidated-reports)
- [Available NPM Scripts](#available-npm-scripts)
- [GitHub Actions Integration](#github-actions-integration)
- [Manual Commands](#manual-commands)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

### 1. Java Installation
Ensure Java is properly installed and `JAVA_HOME` is set:

```bash
# Check Java installation
java -version

# Set JAVA_HOME (add to ~/.zshrc for permanent setting)
export JAVA_HOME=/opt/homebrew/Cellar/openjdk/24.0.2/libexec/openjdk.jdk/Contents/Home
```

### 2. Required Dependencies
All dependencies should already be installed via `package.json`:
- `@playwright/test`
- `allure-playwright`
- `allure-commandline`

## 📁 Project Structure

```
mygithubactions/
├── tests/
│   ├── example.spec.ts      # Project-1 tests
│   ├── example-2.spec.ts    # Project-2 tests
│   └── example-3.spec.ts    # Project-3 tests
├── allure-results/
│   ├── project-1/           # Project-1 test results
│   ├── project-2/           # Project-2 test results
│   └── project-3/           # Project-3 test results
└── allure-report/
    ├── project-1/           # Project-1 HTML report
    ├── project-2/           # Project-2 HTML report
    ├── project-3/           # Project-3 HTML report
    └── consolidated/        # Combined HTML report
```

## 🎯 Individual Project Reports

### Option 1: Using NPM Scripts (Recommended)

#### Step 1: Run Tests for Individual Projects
```bash
# Run tests for Project-1
npm run test:project1

# Run tests for Project-2
npm run test:project2

# Run tests for Project-3
npm run test:project3
```

#### Step 2: Generate and View Individual Reports
```bash
# Generate and open Project-1 report
npm run allure:project1

# Generate and open Project-2 report
npm run allure:project2

# Generate and open Project-3 report
npm run allure:project3
```

### Option 2: Manual Commands

#### Step 1: Run Individual Project Tests
```bash
# Project-1
npx playwright test --project="project-1-example"
mv allure-results/*.json allure-results/project-1/ 2>/dev/null || true

# Project-2
npx playwright test --project="project-2-example-2"
mv allure-results/*.json allure-results/project-2/ 2>/dev/null || true

# Project-3
npx playwright test --project="project-3-example-3"
mv allure-results/*.json allure-results/project-3/ 2>/dev/null || true
```

#### Step 2: Generate Individual Reports
```bash
# Project-1
JAVA_HOME=/opt/homebrew/Cellar/openjdk/24.0.2/libexec/openjdk.jdk/Contents/Home \
npx allure generate allure-results/project-1 --clean -o allure-report/project-1

# Project-2
JAVA_HOME=/opt/homebrew/Cellar/openjdk/24.0.2/libexec/openjdk.jdk/Contents/Home \
npx allure generate allure-results/project-2 --clean -o allure-report/project-2

# Project-3
JAVA_HOME=/opt/homebrew/Cellar/openjdk/24.0.2/libexec/openjdk.jdk/Contents/Home \
npx allure generate allure-results/project-3 --clean -o allure-report/project-3
```

#### Step 3: Serve Individual Reports
```bash
# Serve Project-1 report
JAVA_HOME=/opt/homebrew/Cellar/openjdk/24.0.2/libexec/openjdk.jdk/Contents/Home \
npx allure open allure-report/project-1

# Serve Project-2 report
JAVA_HOME=/opt/homebrew/Cellar/openjdk/24.0.2/libexec/openjdk.jdk/Contents/Home \
npx allure open allure-report/project-2

# Serve Project-3 report
JAVA_HOME=/opt/homebrew/Cellar/openjdk/24.0.2/libexec/openjdk.jdk/Contents/Home \
npx allure open allure-report/project-3
```

## 📊 Consolidated Reports

### Option 1: Using NPM Scripts (Recommended)

#### Run All Tests and Generate Consolidated Report
```bash
# Run all tests and generate consolidated report
npm run test:all-with-report
```

#### Generate Consolidated Report Only (if tests already run)
```bash
npm run allure:consolidated
```

### Option 2: Manual Commands

#### Step 1: Run All Project Tests
```bash
# Run all projects
npm run test:all-projects

# OR run individually and move results
npx playwright test --project="project-1-example"
mv allure-results/*.json allure-results/project-1/

npx playwright test --project="project-2-example-2"
mv allure-results/*.json allure-results/project-2/

npx playwright test --project="project-3-example-3"
mv allure-results/*.json allure-results/project-3/
```

#### Step 2: Generate Consolidated Report
```bash
JAVA_HOME=/opt/homebrew/Cellar/openjdk/24.0.2/libexec/openjdk.jdk/Contents/Home \
npx allure generate allure-results/project-1 allure-results/project-2 allure-results/project-3 \
--clean -o allure-report/consolidated
```

#### Step 3: Serve Consolidated Report
```bash
JAVA_HOME=/opt/homebrew/Cellar/openjdk/24.0.2/libexec/openjdk.jdk/Contents/Home \
npx allure open allure-report/consolidated
```

## 🚀 Available NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run test:project1` | Run Project-1 tests and organize results |
| `npm run test:project2` | Run Project-2 tests and organize results |
| `npm run test:project3` | Run Project-3 tests and organize results |
| `npm run test:all-projects` | Run all project tests sequentially |
| `npm run test:all-with-report` | Run all tests + generate consolidated report |
| `npm run allure:project1` | Generate and serve Project-1 Allure report |
| `npm run allure:project2` | Generate and serve Project-2 Allure report |
| `npm run allure:project3` | Generate and serve Project-3 Allure report |
| `npm run allure:consolidated` | Generate and serve consolidated Allure report |

## 🚀 GitHub Actions Integration

### Available Workflows

This project includes two GitHub Actions workflows for automated testing and reporting:

#### 1. Multi-Job Workflow (`playwright-allure-consolidated.yml`)
**Best for: Parallel execution and detailed artifact management**

```yaml
# Triggers
- Push to main/master branches
- Pull requests to main/master
- Scheduled daily runs (5:00 AM UTC)
- Manual workflow dispatch
```

**Features:**
- ✅ Parallel test execution across projects
- ✅ Individual project artifact uploads
- ✅ Consolidated report generation
- ✅ GitHub Pages deployment (main branch only)
- ✅ Automatic artifact cleanup
- ✅ Fail-safe execution (continues even if some tests fail)

#### 2. Single-Job Workflow (`playwright-allure-single-job.yml`)
**Best for: Faster execution and simpler setup**

```yaml
# Triggers
- Push to main/master branches  
- Pull requests to main/master
- Scheduled daily runs (5:00 AM UTC)
- Manual workflow dispatch
```

**Features:**
- ✅ Sequential test execution in single job
- ✅ Faster overall execution time
- ✅ Consolidated and individual reports
- ✅ GitHub Pages deployment (main branch only)
- ✅ PR comments with test results
- ✅ Comprehensive artifact uploads

### Setting Up GitHub Actions

#### Step 1: Enable GitHub Pages (Optional)
To view reports directly in your browser via GitHub Pages:

1. Go to your repository **Settings**
2. Navigate to **Pages** section
3. Select **Source**: GitHub Actions
4. Save the settings

#### Step 2: Repository Permissions
Ensure your repository has the correct permissions in **Settings > Actions > General**:

- ✅ **Workflow permissions**: Read and write permissions
- ✅ **Allow GitHub Actions to create and approve pull requests** (if needed)

#### Step 3: Workflow Selection
Choose one of the available workflows based on your needs:

```bash
# For parallel execution (recommended for larger test suites)
.github/workflows/playwright-allure-consolidated.yml

# For simpler, faster execution
.github/workflows/playwright-allure-single-job.yml
```

### Workflow Outputs

#### 📊 **GitHub Pages Deployment** (Main branch only)
When pushed to the main branch, reports are automatically deployed to:
```
https://[username].github.io/[repository-name]/
```

#### 📁 **Artifacts** (All branches)
Each workflow run produces downloadable artifacts:

| Artifact Name | Contents | Retention |
|---------------|----------|-----------|
| `allure-reports` | All Allure reports (individual + consolidated) | 30 days |
| `playwright-reports` | Standard Playwright HTML reports | 30 days |
| `playwright-report-project-*` | Individual project Playwright reports | 30 days |

#### 💬 **PR Comments** (Pull Requests)
The single-job workflow automatically comments on PRs with:
- ✅ Test execution status per project
- 📁 Links to downloadable artifacts
- 🔗 Direct link to workflow run

### Manual Workflow Execution

You can manually trigger workflows from the GitHub UI:

1. Go to **Actions** tab in your repository
2. Select the desired workflow
3. Click **Run workflow**
4. Choose the branch and click **Run workflow**

### Viewing Reports

#### 🌐 **Via GitHub Pages** (Main branch)
```
https://[username].github.io/[repository-name]/
├── index.html              # Landing page with links
├── consolidated/           # Consolidated Allure report
├── project-1/             # Project 1 Allure report
├── project-2/             # Project 2 Allure report
└── project-3/             # Project 3 Allure report
```

#### 📁 **Via Artifacts** (All branches)
1. Go to the completed workflow run
2. Scroll down to **Artifacts** section
3. Download `allure-reports.zip`
4. Extract and open `index.html` in your browser

### Workflow Configuration

#### Environment Variables
Both workflows use these default settings:

```yaml
# Node.js version
node-version: lts/*

# Java version (for Allure)
java-version: '17'

# Browser installation
browsers: chromium --with-deps

# Timeout
timeout: 60 minutes (single-job) / 30 minutes (multi-job)
```

#### Customization Options

You can customize the workflows by modifying:

```yaml
# Test execution projects
matrix:
  include:
    - project-name: "Your Project Name"
      project-id: "your-project-id"
      folder-name: "your-folder"

# Schedule (cron format)
schedule:
  - cron: '00 05 * * *'  # Daily at 5 AM UTC

# Artifact retention
retention-days: 30
```

### Troubleshooting GitHub Actions

#### Common Issues

**1. Permission Denied for Pages Deployment**
```yaml
# Add to workflow
permissions:
  contents: read
  pages: write
  id-token: write
```

**2. Java Not Found**
```yaml
# Ensure Java setup step
- name: Setup Java for Allure
  uses: actions/setup-java@v4
  with:
    distribution: 'temurin'
    java-version: '17'
```

**3. Artifacts Not Found**
- Check if test execution completed successfully
- Verify artifact upload paths match your project structure
- Review workflow logs for error messages

**4. Reports Not Generated**
- Ensure Allure results exist in expected directories
- Check if `allure-playwright` dependency is installed
- Verify test execution produces JSON result files

#### Debugging Tips

```bash
# Add debug steps to workflows
- name: Debug - List test results
  run: |
    echo "=== Allure Results Structure ==="
    find allure-results -type f -name "*.json" || echo "No JSON files found"
    echo "=== Directory Contents ==="
    ls -la allure-results/*/
```

## 🔍 Manual Commands Reference

### Test Execution
```bash
# Run specific project
npx playwright test --project="project-name"

# Run all projects
npx playwright test

# Run with UI mode
npx playwright test --ui

# Run in headed mode
npx playwright test --headed
```

### Allure Report Generation
```bash
# Generate report from single directory
npx allure generate <results-dir> --clean -o <output-dir>

# Generate report from multiple directories (consolidated)
npx allure generate <results-dir-1> <results-dir-2> <results-dir-3> --clean -o <output-dir>

# Serve existing report
npx allure open <report-dir>
```

### Result Organization
```bash
# Move JSON results to project directory
mv allure-results/*.json allure-results/project-name/

# Clean all results
rm -rf allure-results/*

# Create project directories
mkdir -p allure-results/project-1 allure-results/project-2 allure-results/project-3
```

## ❗ Troubleshooting

### Common Issues and Solutions

#### 1. Java Home Error
```
ERROR: JAVA_HOME is set to an invalid directory
```
**Solution:**
```bash
# Find correct Java path
/usr/libexec/java_home -V

# Set correct JAVA_HOME
export JAVA_HOME=/opt/homebrew/Cellar/openjdk/24.0.2/libexec/openjdk.jdk/Contents/Home

# Add to ~/.zshrc for permanent setting
echo 'export JAVA_HOME=/opt/homebrew/Cellar/openjdk/24.0.2/libexec/openjdk.jdk/Contents/Home' >> ~/.zshrc
```

#### 2. 404 Not Found in Allure Report
**Cause:** Trying to serve raw results instead of generated HTML report

**Solution:**
```bash
# Always generate first, then serve
npx allure generate allure-results/project-name --clean -o allure-report/project-name
npx allure open allure-report/project-name
```

#### 3. Empty or Missing Results
**Cause:** Results not properly moved to project directories

**Solution:**
```bash
# Check if results exist
ls -la allure-results/

# Manually move results
mv allure-results/*.json allure-results/project-name/
```

#### 4. Port Already in Use
**Solution:**
```bash
# Kill existing Allure servers
pkill -f "allure"

# Or use different port (Allure will auto-assign)
npx allure open allure-report/project-name
```

## 📈 Report Features

### Individual Project Reports
- ✅ Project-specific test results
- ✅ Test execution timeline
- ✅ Pass/Fail statistics
- ✅ Test step details
- ✅ Browser-specific results

### Consolidated Reports
- ✅ Cross-project comparison
- ✅ Overall test suite statistics
- ✅ Combined timeline view
- ✅ Aggregated metrics
- ✅ Environment comparison

## 🎯 Quick Reference

### Complete Workflow Example
```bash
# 1. Run all tests
npm run test:all-projects

# 2. Generate individual reports (optional)
npm run allure:project1  # Opens at http://127.0.0.1:PORT
npm run allure:project2  # Opens at http://127.0.0.1:PORT
npm run allure:project3  # Opens at http://127.0.0.1:PORT

# 3. Generate consolidated report
npm run allure:consolidated  # Opens at http://127.0.0.1:PORT
```

### One-Command Solution
```bash
# Run everything and get consolidated report
npm run test:all-with-report
```

---

**Note:** Each Allure server will start on a different port (auto-assigned). The exact URL will be displayed in the terminal output when the server starts.
