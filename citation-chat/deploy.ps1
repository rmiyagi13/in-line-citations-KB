# Citation Chat Deployment PowerShell Script
# This script helps deploy the Citation Chat application to GitHub Pages

# Step 1: Display start message
Write-Host "Starting deployment to GitHub Pages..." -ForegroundColor Green

# Step 2: Create temporary branch for deployment
Write-Host "Creating temporary deployment branch..." -ForegroundColor Yellow
git checkout -b deployment-temp

# Step 3: Make sure we're at the root of the project
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -Path $scriptPath

# Step 4: Add all files to git
Write-Host "Adding files to git..." -ForegroundColor Yellow
git add .

# Step 5: Commit changes
Write-Host "Committing changes..." -ForegroundColor Yellow
$date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Deployment: $date"

# Step 6: Push to gh-pages branch
Write-Host "Pushing to gh-pages branch..." -ForegroundColor Yellow
git push -f origin deployment-temp:gh-pages

# Step 7: Clean up - return to original branch
Write-Host "Cleaning up..." -ForegroundColor Yellow
git checkout -
git branch -D deployment-temp

Write-Host "Deployment complete! Your site should be available at: https://rmiyagi13.github.io/in-line-citations-KB/" -ForegroundColor Green 