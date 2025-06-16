# PowerShell script to set up GitHub Pages with GitHub Actions

# First, make sure changes are committed
git add .
git commit -m "Set up GitHub Pages with GitHub Actions"

# Push changes to GitHub
git push origin main

# Log in to GitHub CLI if not already logged in
try {
    gh auth status
} catch {
    gh auth login
}

# Get repository name
$repoUrl = git config --get remote.origin.url
$repoName = $repoUrl -replace ".*github\.com[:/](.*)(\.git)?$", '$1'

# Enable GitHub Pages with GitHub Actions as source
gh api -X PUT "/repos/$repoName/pages" -f source='{"branch":"main","path":"/"}'
Write-Output "GitHub Pages enabled for branch: main"

# Enable GitHub Actions if not already enabled
gh api "/repos/$repoName/actions/permissions" -X PUT -f enabled=true
Write-Output "GitHub Actions enabled for repository"

# Get Pages deployment status
gh api "/repos/$repoName/pages" | ConvertFrom-Json | Format-List

Write-Output "Setup completed! It may take a few minutes for your site to be published."
Write-Output "You can check the status of your GitHub Actions workflow in the Actions tab of your repository." 