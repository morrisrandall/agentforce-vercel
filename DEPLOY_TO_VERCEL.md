# 🚀 Deploy to Vercel - Step by Step

## What You Have

I've created a complete, production-ready project with all the files Vercel needs:

```
agentforce-decision-tree/
├── src/
│   ├── App.jsx           (Your decision tree - 1,600 lines)
│   └── main.jsx          (React entry point)
├── index.html            (HTML template)
├── package.json          (Dependencies)
├── vite.config.js        (Build configuration)
├── README.md             (Documentation)
└── .gitignore            (Git ignore rules)
```

---

## Step 1: Upload to GitHub (3 minutes)

### Option A: Using GitHub Website (Easiest)

1. **Go to:** https://github.com/new

2. **Create repository:**
   - Repository name: `agentforce-decision-tree`
   - Description: "Interactive Agentforce 360 decision tree tool"
   - ✓ Public
   - ✓ Add a README file
   - Click "Create repository"

3. **Upload files:**
   - Click "Add file" → "Upload files"
   - Drag and drop ALL the files from the `agentforce-decision-tree` folder
   - **Important:** Make sure to upload the FOLDER STRUCTURE, not just individual files
   - Commit message: "Initial commit"
   - Click "Commit changes"

### Option B: Using GitHub Desktop (If you have it)

1. Open GitHub Desktop
2. File → New Repository
3. Name: `agentforce-decision-tree`
4. Create repository
5. Copy all files from your folder into the repository folder
6. Commit and push

---

## Step 2: Deploy to Vercel (2 minutes)

1. **Go to:** https://vercel.com

2. **Sign up/Login:**
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel to access your repositories

3. **Import your project:**
   - Click "Add New..." → "Project"
   - You'll see your `agentforce-decision-tree` repository
   - Click "Import"

4. **Configure (Vercel auto-detects everything!):**
   - Framework Preset: **Vite** (auto-detected ✓)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist` (auto-filled)
   - Click "Deploy"

5. **Wait 1-2 minutes...**
   - Vercel will install dependencies
   - Build your project
   - Deploy it

6. **🎉 DONE!**
   - You'll see: "Congratulations! Your project has been deployed"
   - Your link: `https://agentforce-decision-tree.vercel.app`
   - Click "Visit" to see it live!

---

## Step 3: Share with Your Team

Your permanent link will be:
```
https://agentforce-decision-tree-RANDOM.vercel.app
```

Or if the name is available:
```
https://agentforce-decision-tree.vercel.app
```

### Customize the URL (Optional):

1. In Vercel dashboard → Settings → Domains
2. Add custom domain like: `agentforce.yourcompany.com`
3. Follow DNS setup instructions

---

## Update the Tool Later

### Method 1: Edit on GitHub (Easy)
1. Go to your GitHub repository
2. Navigate to `src/App.jsx`
3. Click the pencil icon to edit
4. Make your changes
5. Commit changes
6. **Vercel auto-deploys in 1 minute!** 🚀

### Method 2: Edit locally (Advanced)
1. Clone the repository
2. Make changes
3. Push to GitHub
4. Vercel auto-deploys

---

## Troubleshooting

**Problem:** Build fails
**Solution:** Check the Vercel build logs. Usually it's a missing dependency.

**Problem:** Page shows 404
**Solution:** Make sure you uploaded ALL files including `index.html`

**Problem:** Icons not showing
**Solution:** Wait 30 seconds for CDN to load (first load only)

**Problem:** Want to test locally first?
**Solution:** 
```bash
cd agentforce-decision-tree
npm install
npm run dev
```
Open http://localhost:5173

---

## What Happens After Deployment

✅ **Automatic HTTPS** - Vercel provides SSL certificate
✅ **Global CDN** - Fast loading worldwide  
✅ **Auto-deploy** - Every GitHub push = new deployment
✅ **Preview URLs** - Test changes before going live
✅ **Analytics** - See page views (Vercel dashboard)

---

## Your URLs

After deployment, you'll have:

1. **Production:** `https://agentforce-decision-tree.vercel.app`
2. **GitHub repo:** `https://github.com/YOUR-USERNAME/agentforce-decision-tree`
3. **Vercel dashboard:** `https://vercel.com/YOUR-USERNAME/agentforce-decision-tree`

---

## 📧 Email Template for Your Team

```
Subject: New Agentforce 360 Decision Tree Tool

Team,

I've built an interactive decision tree to help qualify Agentforce 
360 opportunities. It generates personalized roadmaps in 5 minutes.

🔗 Try it here: https://agentforce-decision-tree.vercel.app

Features:
• 12 strategic discovery questions
• ROI calculator
• Customer success stories
• Personalized recommendations
• Mobile-friendly

Use it on your next discovery call. Let me know your feedback!

[Your name]
```

---

## Next Steps

1. ✅ Upload to GitHub
2. ✅ Deploy to Vercel  
3. ✅ Share with team
4. 🎯 Get feedback
5. 🚀 Use it to close deals!

---

**Need help?** The Vercel dashboard has great docs and support.

**Questions?** Check Vercel's deployment docs: https://vercel.com/docs
