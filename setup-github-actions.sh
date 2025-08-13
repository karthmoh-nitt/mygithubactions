#!/bin/bash

# GitHub Actions Allure Setup Script
# This script helps set up the repository for automated Allure reporting

set -e

echo "🎭 Setting up GitHub Actions with Allure Reporting..."
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository. Please run this script from your project root."
    exit 1
fi

# Check if GitHub workflows directory exists
if [ ! -d ".github/workflows" ]; then
    echo "📁 Creating .github/workflows directory..."
    mkdir -p .github/workflows
fi

# Check if package.json exists and has required dependencies
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this from your project root."
    exit 1
fi

echo "✅ Validating dependencies..."

# Check for required dependencies
REQUIRED_DEPS=("@playwright/test" "allure-playwright" "allure-commandline")
MISSING_DEPS=()

for dep in "${REQUIRED_DEPS[@]}"; do
    if ! npm list "$dep" >/dev/null 2>&1; then
        MISSING_DEPS+=("$dep")
    fi
done

if [ ${#MISSING_DEPS[@]} -gt 0 ]; then
    echo "⚠️  Missing dependencies detected: ${MISSING_DEPS[*]}"
    echo "🔧 Installing missing dependencies..."
    npm install --save-dev "${MISSING_DEPS[@]}"
    echo "✅ Dependencies installed!"
fi

# Validate workflow files exist
WORKFLOWS=("playwright-allure-consolidated.yml" "playwright-allure-single-job.yml")
EXISTING_WORKFLOWS=()

for workflow in "${WORKFLOWS[@]}"; do
    if [ -f ".github/workflows/$workflow" ]; then
        EXISTING_WORKFLOWS+=("$workflow")
    fi
done

if [ ${#EXISTING_WORKFLOWS[@]} -eq 0 ]; then
    echo "❌ Error: No Allure workflow files found in .github/workflows/"
    echo "Please ensure the workflow files are present:"
    for workflow in "${WORKFLOWS[@]}"; do
        echo "  - .github/workflows/$workflow"
    done
    exit 1
fi

echo "✅ Found workflow files: ${EXISTING_WORKFLOWS[*]}"

# Check Playwright configuration
if [ ! -f "playwright.config.ts" ] && [ ! -f "playwright.config.js" ]; then
    echo "❌ Error: Playwright configuration file not found."
    exit 1
fi

echo "✅ Playwright configuration found"

# Validate test files
if [ ! -d "tests" ]; then
    echo "❌ Error: tests directory not found."
    exit 1
fi

TEST_FILES=($(find tests -name "*.spec.ts" -o -name "*.spec.js" | head -5))
if [ ${#TEST_FILES[@]} -eq 0 ]; then
    echo "❌ Error: No test files found in tests directory."
    exit 1
fi

echo "✅ Found test files: ${TEST_FILES[*]}"

# Create .gitignore entries if needed
if [ -f ".gitignore" ]; then
    echo "📝 Updating .gitignore..."
    
    # Add Allure and Playwright ignores if not present
    IGNORE_ENTRIES=(
        "# Allure Results"
        "allure-results/"
        "allure-report/"
        ""
        "# Playwright"
        "test-results/"
        "playwright-report/"
        "playwright/.cache/"
    )
    
    for entry in "${IGNORE_ENTRIES[@]}"; do
        if ! grep -Fxq "$entry" .gitignore 2>/dev/null; then
            echo "$entry" >> .gitignore
        fi
    done
    
    echo "✅ Updated .gitignore"
else
    echo "⚠️  No .gitignore found, creating one..."
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Allure Results
allure-results/
allure-report/

# Playwright
test-results/
playwright-report/
playwright/.cache/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
EOF
    echo "✅ Created .gitignore"
fi

# Show repository status
echo ""
echo "📊 Repository Status:"
echo "===================="
echo "📁 Project structure:"
echo "  ✅ .github/workflows/ (${#EXISTING_WORKFLOWS[@]} workflow files)"
echo "  ✅ tests/ (${#TEST_FILES[@]} test files found)"
echo "  ✅ package.json with required dependencies"
echo "  ✅ Playwright configuration"
echo ""

# Show next steps
echo "🚀 Next Steps:"
echo "=============="
echo "1. 📤 Commit and push your changes:"
echo "   git add ."
echo "   git commit -m \"Add GitHub Actions with Allure reporting\""
echo "   git push origin main"
echo ""
echo "2. 🌐 Enable GitHub Pages (optional):"
echo "   - Go to repository Settings > Pages"
echo "   - Set Source to 'GitHub Actions'"
echo "   - Save settings"
echo ""
echo "3. ▶️ Trigger a workflow run:"
echo "   - Go to Actions tab in GitHub"
echo "   - Select a workflow and click 'Run workflow'"
echo "   - Or push a commit to trigger automatically"
echo ""
echo "4. 📋 View reports:"
echo "   - GitHub Pages: https://[username].github.io/[repo-name]/"
echo "   - Or download artifacts from completed workflow runs"
echo ""

# Show available commands
echo "💡 Available Commands:"
echo "====================="
echo "Local development:"
echo "  npm run test:all-with-report    # Run all tests + consolidated report"
echo "  npm run allure:consolidated     # Generate consolidated report"
echo ""
echo "Individual projects:"
echo "  npm run test:project1           # Run project 1 tests"
echo "  npm run allure:project1         # Generate project 1 report"
echo ""

echo "✅ Setup complete! Your repository is ready for automated Allure reporting with GitHub Actions."
echo ""
echo "📚 For detailed documentation, see: ALLURE_REPORTING_GUIDE.md"
