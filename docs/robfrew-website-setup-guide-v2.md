# Rob Frew Website: Development Environment Setup Guide

**Goal:** Set up Claude Code on your MiniPC, connected to GitHub and Vercel, ready to build robfrew.com

**Time Required:** ~45-60 minutes for initial setup

**Prerequisites:** SSH access to your MiniPC (which you have)

---

## Your MiniPC Setup Reference

| Item | Value |
|------|-------|
| **SSH Command** | `ssh rfrew@192.168.68.91` |
| **Code Directory** | `/home/rfrew/code` (dedicated 120GB SSD) |
| **Project Location** | `/home/rfrew/code/websites/robfrew-website` |
| **Dev Server URL** | `http://192.168.68.91:3000` |

---

## Part 1: Verify & Install Prerequisites on MiniPC

SSH into your MiniPC:
```bash
ssh rfrew@192.168.68.91
```

### Step 1.1: Check if Node.js is Installed

```bash
node --version
npm --version
```

**If Node.js is NOT installed (or version is below 18):**

```bash
# Install Node.js 20 LTS (recommended for Next.js)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version   # Should show v20.x.x
npm --version    # Should show 10.x.x
```

### Step 1.2: Check if Git is Installed

```bash
git --version
```

**If Git is NOT installed:**
```bash
sudo apt-get install -y git
```

### Step 1.3: Configure Git Identity

```bash
git config --global user.name "Rob Frew"
git config --global user.email "rob@robfrew.com"
```

### Step 1.4: Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

**Verify installation:**
```bash
claude --version
```

---

## Part 2: Set Up GitHub

### Step 2.1: Create GitHub Account (if needed)

1. Go to https://github.com
2. Sign up with rob@robfrew.com (or your preferred email)
3. Verify your email address

### Step 2.2: Generate SSH Key for GitHub

On your MiniPC:
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "rob@robfrew.com"

# Press Enter to accept default location (~/.ssh/id_ed25519)
# Enter a passphrase (optional but recommended)

# Start the SSH agent
eval "$(ssh-agent -s)"

# Add your key to the agent
ssh-add ~/.ssh/id_ed25519

# Display your public key (you'll need to copy this)
cat ~/.ssh/id_ed25519.pub
```

### Step 2.3: Add SSH Key to GitHub

1. Go to https://github.com/settings/keys
2. Click "New SSH key"
3. Title: "MiniPC Ubuntu Server"
4. Key: Paste the output from the `cat` command above
5. Click "Add SSH key"

### Step 2.4: Test GitHub Connection

```bash
ssh -T git@github.com
```

You should see: "Hi [username]! You've successfully authenticated..."

### Step 2.5: Create the Repository

1. Go to https://github.com/new
2. Repository name: `robfrew-website`
3. Description: "Personal branding website - robfrew.com"
4. Keep it **Public** (required for free Vercel hosting) or Private if you have Pro
5. **DO NOT** initialize with README, .gitignore, or license (we'll create these locally)
6. Click "Create repository"

**Save the repository URL** - it will look like: `git@github.com:YOUR_USERNAME/robfrew-website.git`

---

## Part 3: Create the Next.js Project

### Step 3.1: Navigate to Your Code Directory

```bash
# Go to your dedicated code SSD
cd ~/code

# Create a websites subdirectory
mkdir -p websites
cd websites
```

### Step 3.2: Create Next.js App

```bash
npx create-next-app@latest robfrew-website
```

**When prompted, select these options:**
- TypeScript? â†’ **Yes**
- ESLint? â†’ **Yes**
- Tailwind CSS? â†’ **Yes**
- `src/` directory? â†’ **Yes**
- App Router? â†’ **Yes**
- Turbopack? â†’ **No** (stable choice)
- Customize import alias? â†’ **Yes** (keep default `@/*`)

### Step 3.3: Navigate to Project

```bash
cd robfrew-website
```

Your project is now at: `/home/rfrew/code/websites/robfrew-website`

### Step 3.4: Connect to GitHub

```bash
# Initialize git (should already be done by create-next-app)
git init

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin git@github.com:YOUR_USERNAME/robfrew-website.git

# Push initial commit
git branch -M main
git push -u origin main
```

---

## Part 4: Set Up Vercel

### Step 4.1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### Step 4.2: Import Your Project

1. From Vercel dashboard, click "Add New..." â†’ "Project"
2. Find `robfrew-website` in your repository list
3. Click "Import"
4. Framework Preset should auto-detect "Next.js"
5. Leave all settings as default
6. Click "Deploy"

**Wait ~1-2 minutes for the build to complete.**

You'll get a URL like: `robfrew-website-xxxxx.vercel.app`

### Step 4.3: Configure Custom Domain

1. In Vercel, go to your project â†’ "Settings" â†’ "Domains"
2. Add `robfrew.com`
3. Vercel will show you DNS records to add

### Step 4.4: Update DNS in AWS Route53

1. Log into AWS Console â†’ Route53
2. Go to Hosted Zones â†’ robfrew.com
3. Add/update these records:

**For apex domain (robfrew.com):**
```
Type: A
Name: (leave blank or @)
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Wait for DNS propagation (usually 5-30 minutes, can take up to 48 hours)

### Step 4.5: Verify Domain

Back in Vercel, click "Refresh" next to your domain. Once DNS propagates, it will show a green checkmark and automatically provision SSL.

---

## Part 5: Test the Full Workflow

### Step 5.1: Start Local Development Server

On your MiniPC:
```bash
cd ~/code/websites/robfrew-website
npm run dev
```

You should see:
```
â–² Next.js 15.x.x
- Local:        http://localhost:3000
- Network:      http://192.168.68.91:3000
```

### Step 5.2: Preview in Browser

On your MacBook, open a browser and go to:
```
http://192.168.68.91:3000
```

You should see the default Next.js welcome page.

### Step 5.3: Make a Test Change

Open a new SSH session to your MiniPC (keep the dev server running):

```bash
ssh rfrew@192.168.68.91
cd ~/code/websites/robfrew-website
```

Edit the home page:
```bash
nano src/app/page.tsx
```

Find the line that says something like "Get started by editing" and change it to:
```
Rob Frew - Coming Soon
```

Save (Ctrl+O, Enter, Ctrl+X)

**Check your browser** - the page should auto-refresh with your change!

### Step 5.4: Deploy to Production

```bash
git add .
git commit -m "Test change - site coming soon"
git push
```

**Check Vercel** - within 30-60 seconds, your site will automatically rebuild.

Once complete, visit your Vercel URL (or robfrew.com once DNS propagates) to see your change live!

---

## Part 6: Authenticate Claude Code

### Step 6.1: Start Claude Code

```bash
cd ~/code/websites/robfrew-website
claude
```

### Step 6.2: Authenticate

The first time you run Claude Code, it will prompt you to authenticate:

1. It will display a URL - copy this
2. Open the URL in a browser on your MacBook
3. Log in with your Anthropic account (or create one at console.anthropic.com)
4. Authorize Claude Code
5. Return to your terminal - it should now be authenticated

### Step 6.3: Test Claude Code

Once authenticated, try a simple command:

```
> Show me the current project structure
```

Claude Code should analyze your Next.js project and describe the file structure.

---

## Part 7: Your First Claude Code Session

Now let's use Claude Code to start building your actual site!

```bash
cd ~/code/websites/robfrew-website
claude
```

Try this prompt:

```
I'm building a personal branding website. The design system uses:
- Black (#000000) and white (#FFFFFF) color palette
- Inter font from Google Fonts
- Clean, bold aesthetic

Please update tailwind.config.ts to include the Inter font family and ensure the color palette is configured. Then update src/app/layout.tsx to use the Inter font.
```

Claude Code will make the changes. Review them, then:

```bash
# Test locally
npm run dev

# If it looks good, deploy
git add .
git commit -m "Configure design system - Inter font and color palette"
git push
```

---

## Quick Reference Commands

### Start Development
```bash
ssh rfrew@192.168.68.91
cd ~/code/websites/robfrew-website
npm run dev
```
Preview at: http://192.168.68.91:3000

### Start Claude Code
```bash
cd ~/code/websites/robfrew-website
claude
```

### Deploy Changes
```bash
git add .
git commit -m "Your commit message"
git push
```

### Check Disk Space on Code Drive
```bash
df -h /home/rfrew/code
```

### Check Running Services
```bash
# See what's using ports
sudo lsof -i -P -n | grep LISTEN

# Check system resources
htop
```

---

## Troubleshooting

### "Permission denied" when pushing to GitHub
```bash
# Check SSH key is loaded
ssh-add -l

# If empty, add your key
ssh-add ~/.ssh/id_ed25519
```

### Port 3000 already in use
```bash
# Find what's using it
sudo lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
npm run dev -- -p 3001
```

### Claude Code not found
```bash
# Check if npm global bin is in PATH
echo $PATH

# Add to PATH if needed (add to ~/.bashrc)
export PATH="$PATH:$(npm config get prefix)/bin"
source ~/.bashrc
```

### Vercel build fails
- Check the build logs in Vercel dashboard
- Most common issue: TypeScript errors
- Run `npm run build` locally first to catch errors

---

## Directory Structure Summary

```
/home/rfrew/code/                    # Your dedicated 120GB SSD
â””â”€â”€ websites/                        # Web projects
    â””â”€â”€ robfrew-website/             # This project
        â”œâ”€â”€ src/
        â”‚   â”œâ”€â”€ app/                 # Next.js pages
        â”‚   â””â”€â”€ components/          # React components
        â”œâ”€â”€ public/                  # Static assets
        â”œâ”€â”€ package.json
        â””â”€â”€ tailwind.config.ts
```

---

## What's Next?

Once this setup is complete, you're ready to start building! Return to your action plan and begin with:

1. **Phase 1, Step 2:** Build Header and Footer components
2. **Phase 1, Step 3:** Build the Home page

Use Claude Code to help you write components. Commit frequently. Watch your site go live automatically!

---

## Checklist

- [ ] Node.js 20 installed on MiniPC
- [ ] Git installed and configured
- [ ] Claude Code installed
- [ ] GitHub account created
- [ ] SSH key added to GitHub
- [ ] Repository created: robfrew-website
- [ ] Next.js project created at `~/code/websites/robfrew-website`
- [ ] Project pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Custom domain configured (robfrew.com)
- [ ] DNS records updated in Route53
- [ ] Claude Code authenticated
- [ ] Test deployment successful

**You're all set! ðŸš€**
