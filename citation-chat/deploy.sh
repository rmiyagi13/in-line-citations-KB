#!/bin/bash

# Citation Chat Deployment Script
# This script helps deploy the Citation Chat application to GitHub Pages

# Step 1: Display start message
echo "Starting deployment to GitHub Pages..."

# Step 2: Create temporary branch for deployment
echo "Creating temporary deployment branch..."
git checkout -b deployment-temp

# Step 3: Make sure we're at the root of the project
cd "$(dirname "$0")" || exit

# Step 4: Add all files to git
echo "Adding files to git..."
git add .

# Step 5: Commit changes
echo "Committing changes..."
git commit -m "Deployment: $(date)"

# Step 6: Push to gh-pages branch
echo "Pushing to gh-pages branch..."
git push -f origin deployment-temp:gh-pages

# Step 7: Clean up - return to original branch
echo "Cleaning up..."
git checkout -
git branch -D deployment-temp

echo "Deployment complete! Your site should be available at: https://rmiyagi13.github.io/in-line-citations-KB/" 