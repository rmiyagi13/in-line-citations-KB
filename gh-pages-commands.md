# GitHub Pages Setup Commands

## Install GitHub CLI (if not already installed)
```powershell
winget install --id GitHub.cli
```

## Login to GitHub CLI
```powershell
gh auth login
```

## Commit and Push Changes
```powershell
git add .
git commit -m "Set up GitHub Pages with GitHub Actions"
git push origin main
```

## Enable GitHub Pages with GitHub Actions
```powershell
# Get repository name (replace with your actual username/repo if this doesn't work)
$repoUrl = git config --get remote.origin.url
$repoName = $repoUrl -replace ".*github\.com[:/](.*)(\.git)?$", '$1'

# Enable GitHub Pages with GitHub Actions as source
gh api -X PUT "/repos/$repoName/pages" -f source='{"branch":"main","path":"/"}'
```

## Enable GitHub Actions (if not already enabled)
```powershell
gh api "/repos/$repoName/actions/permissions" -X PUT -f enabled=true
```

## Check GitHub Pages Status
```powershell
gh api "/repos/$repoName/pages"
```

## Alternative: Configure through GitHub Web Interface

If you prefer using the web interface instead of CLI:

1. Go to your GitHub repository
2. Click on Settings
3. Navigate to Pages in the left sidebar
4. Under "Build and deployment" > "Source", select "GitHub Actions"
5. GitHub will suggest workflow templates - choose one or use your custom workflow
6. Your workflow will be triggered whenever you push to the main branch 