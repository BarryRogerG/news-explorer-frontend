# Google Cloud Deployment Guide - Multiple Projects

This guide helps you deploy the News Explorer frontend alongside your existing project on the same VM.

## Prerequisites

- Google Cloud VM instance "wtwr" is running
- Previous project is already deployed
- SSH access to your VM

## Step 1: Build the Project Locally

On your local machine:

```bash
npm run build
```

This creates a `dist` folder with all the production files.

## Step 2: Connect to Your VM

1. In Google Cloud Console, go to your VM instance "wtwr"
2. Click the "SSH" button to open a terminal connection

## Step 3: Check Current Setup

First, let's see what's already running:

```bash
# Check existing nginx configurations
sudo nginx -T | grep -A 10 "server_name\|listen"

# Check existing web directories
ls -la /var/www/

# Check what ports are in use
sudo netstat -tlnp | grep :80
```

## Step 4: Create Directory for New Project

```bash
sudo mkdir -p /var/www/news-explorer/dist
sudo chown -R $USER:$USER /var/www/news-explorer
```

## Step 5: Upload Files from Local Machine

**Option A: Using gcloud CLI (if installed locally):**

First, find your VM's zone:
- In Google Cloud Console → VM Instances → Check the "Zone" column

Then upload:
```bash
gcloud compute scp --recurse ./dist wtwr:/var/www/news-explorer/ --zone=YOUR_ZONE
```

**Option B: Using the SSH file browser:**

1. Click the "SSH" button in Google Cloud Console
2. Click the gear icon (⚙️) → "Upload file"
3. Select all files from your local `dist` folder
4. Upload to `/var/www/news-explorer/dist/`

**Option C: Using SCP from local terminal:**

```bash
scp -r ./dist/* YOUR_VM_USER@YOUR_EXTERNAL_IP:/var/www/news-explorer/dist/
```

## Step 6: Configure Nginx for New Project

Create a new nginx configuration file (this won't affect your existing project):

```bash
sudo nano /etc/nginx/sites-available/news-explorer
```

Add this configuration (using port 8080):

```nginx
server {
    listen 8080;
    server_name _;

    root /var/www/news-explorer/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

Save and exit (Ctrl+X, then Y, then Enter).

Enable the new site:

```bash
sudo ln -s /etc/nginx/sites-available/news-explorer /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration (should show OK)
sudo systemctl reload nginx
```

## Step 7: Set Permissions

```bash
sudo chown -R www-data:www-data /var/www/news-explorer
sudo chmod -R 755 /var/www/news-explorer
```

## Step 8: Configure Firewall for Port 8080

**In Google Cloud Console:**

1. Go to **VPC Network** → **Firewall**
2. Click **"Create Firewall Rule"**
3. Configure:
   - **Name**: `allow-http-8080`
   - **Direction**: Ingress
   - **Action**: Allow
   - **Targets**: All instances in the network
   - **Source IP ranges**: `0.0.0.0/0`
   - **Protocols and ports**: TCP: `8080`
4. Click **"Create"**

**Or using gcloud CLI:**
```bash
gcloud compute firewall-rules create allow-http-8080 \
    --allow tcp:8080 \
    --source-ranges 0.0.0.0/0 \
    --description "Allow HTTP traffic on port 8080"
```

## Step 9: Access Your Apps

- **Old project**: `http://YOUR_EXTERNAL_IP` (port 80)
- **New project**: `http://YOUR_EXTERNAL_IP:8080` (port 8080)

## Step 10: Update README

Update the README.md with your deployment URL:

```markdown
**Deployed Site:** http://YOUR_EXTERNAL_IP:8080
```

## Troubleshooting

### Check if nginx is running:
```bash
sudo systemctl status nginx
```

### Check nginx configuration:
```bash
sudo nginx -t
```

### View nginx error logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

### Check if port 8080 is listening:
```bash
sudo netstat -tlnp | grep :8080
```

### Restart nginx if needed:
```bash
sudo systemctl restart nginx
```

## Updating the App

When you need to update the News Explorer app:

1. Build locally: `npm run build`
2. Upload the new `dist` folder to `/var/www/news-explorer/dist/`
3. Restart nginx: `sudo systemctl restart nginx`

## Alternative: Use Different Path Instead of Port

If you prefer to use the same port but different path:

**Nginx config:**
```nginx
server {
    listen 80;
    server_name _;

    # Your old project
    location / {
        root /var/www/old-project;
        # ... existing config
    }

    # New project
    location /news-explorer {
        alias /var/www/news-explorer/dist;
        index index.html;
        try_files $uri $uri/ /news-explorer/index.html;
    }
}
```

Then access at: `http://YOUR_EXTERNAL_IP/news-explorer`

## Notes

- Both projects will run independently
- The old project remains accessible on port 80
- The new project is accessible on port 8080
- You can change the port number if 8080 conflicts with something else

