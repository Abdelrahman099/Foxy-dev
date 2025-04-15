# Foxy Dev Website - Deployment Guide

This guide will help you deploy the Foxy Dev Website to your GitHub repository and set it up with GitHub Pages.

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository (e.g., "foxy-dev-website")
4. Choose whether to make it public or private
5. Click "Create repository"

## Step 2: Configure Git and Push Your Code

Run the following commands in your terminal:

```bash
# Navigate to your project directory
cd /path/to/foxy-dev-website

# Configure Git with your information
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files to Git
git add .

# Commit the changes
git commit -m "Initial commit"

# Add your GitHub repository as a remote
git remote add origin https://github.com/yourusername/foxy-dev-website.git

# Push your code to GitHub
git push -u origin master
```

## Step 3: Deploy to GitHub Pages

### Option 1: Deploy the Frontend Only

If you want to deploy just the frontend (static site):

1. Create a new branch called `gh-pages`:
```bash
git checkout -b gh-pages
```

2. Copy the frontend build files to the root:
```bash
cp -r frontend/dist/* .
```

3. Create a `.nojekyll` file to tell GitHub Pages not to use Jekyll:
```bash
touch .nojekyll
```

4. Commit and push the changes:
```bash
git add .
git commit -m "Add build files for GitHub Pages"
git push origin gh-pages
```

5. Go to your GitHub repository settings:
   - Navigate to "Settings" > "Pages"
   - Under "Source", select the `gh-pages` branch
   - Click "Save"

6. Your site will be published at `https://yourusername.github.io/foxy-dev-website/`

### Option 2: Deploy Both Frontend and Backend

For a full deployment with both frontend and backend:

1. You'll need a service that can host Node.js applications, such as:
   - [Heroku](https://www.heroku.com/)
   - [Vercel](https://vercel.com/)
   - [Netlify](https://www.netlify.com/) (with serverless functions)
   - [Railway](https://railway.app/)

2. Update the API URL in the frontend:
   - Edit `frontend/src/utils/api.js`
   - Change `const API_URL = 'http://localhost:5000/api'` to your backend URL

3. Follow the deployment instructions for your chosen hosting service

## Step 4: Customize Your Profile

After deployment, you can customize your profile by:

1. Cloning the repository to your local machine
2. Editing the `backend/data/profile.json` file with your information
3. Committing and pushing the changes
4. Redeploying if necessary

## Troubleshooting

- If your site doesn't appear after deployment, check the GitHub Pages settings to ensure the correct branch is selected
- If you see a blank page, check the browser console for errors and ensure all paths are correct
- For backend issues, check the server logs of your hosting provider

## Need Help?

If you encounter any issues during deployment, refer to:
- [GitHub Pages documentation](https://docs.github.com/en/pages)
- The documentation of your chosen backend hosting service
- Stack Overflow for specific error messages
