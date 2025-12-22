# Google Cloud Deployment Guide

This guide will help you deploy the News Explorer frontend to your existing Google Cloud VM instance.

## Prerequisites

- Google Cloud VM instance running (you have "wtwr" instance)
- SSH access to your VM
- External IP address configured
- Basic knowledge of Linux commands

## Step 1: Build the Project Locally

First, build the production version of your app:

```bash
npm run build
```

This creates a `dist` folder with all the production files.

## Step 2: Connect to Your VM

1. In Google Cloud Console, go to your VM instance "wtwr"
2. Click the "SSH" button to open a terminal connection
3. Or use SSH from your local terminal:
   ```bash
   gcloud compute ssh wtwr --zone=YOUR_ZONE
   ```

## Step 3: Install Nginx on VM

Once connected to your VM, install nginx:

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Step 4: Configure Nginx

Create a configuration file for your app:

```bash
sudo nano /etc/nginx/sites-available/news-explorer
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name YOUR_EXTERNAL_IP_OR_DOMAIN;

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

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/news-explorer /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl reload nginx
```

## Step 5: Create Directory and Upload Files

On your VM, create the directory:

```bash
sudo mkdir -p /var/www/news-explorer
sudo chown -R $USER:$USER /var/www/news-explorer
```

From your local machine, upload the dist folder:

**Option A: Using gcloud (if you have gcloud CLI installed):**
```bash
gcloud compute scp --recurse ./dist wtwr:/var/www/news-explorer/ --zone=YOUR_ZONE
```

**Option B: Using SCP:**
```bash
scp -r ./dist/* YOUR_VM_USER@YOUR_EXTERNAL_IP:/var/www/news-explorer/dist/
```

**Option C: Using SFTP client** (like FileZilla or WinSCP)

## Step 6: Set Permissions

On your VM:

```bash
sudo chown -R www-data:www-data /var/www/news-explorer
sudo chmod -R 755 /var/www/news-explorer
```

## Step 7: Configure Environment Variables

Since environment variables need to be available at build time for Vite, you have two options:

**Option A: Build on the VM (Recommended)**

1. Upload your entire project to the VM:
   ```bash
   gcloud compute scp --recurse . wtwr:~/news-explorer --zone=YOUR_ZONE
   ```

2. SSH into VM and build:
   ```bash
   cd ~/news-explorer
   npm install
   # Create .env file with your API key
   echo "VITE_NEWS_API_KEY=your_api_key_here" > .env
   npm run build
   sudo cp -r dist/* /var/www/news-explorer/dist/
   ```

**Option B: Use build-time environment variables**

If you built locally, the API key is already baked into the build. Just make sure you used the correct API key when building.

## Step 8: Restart Nginx

```bash
sudo systemctl restart nginx
```

## Step 9: Configure Firewall

Make sure port 80 (HTTP) is open:

1. In Google Cloud Console, go to VPC Network → Firewall
2. Create a firewall rule:
   - Name: `allow-http`
   - Direction: Ingress
   - Action: Allow
   - Targets: All instances in the network
   - Source IP ranges: `0.0.0.0/0`
   - Protocols and ports: TCP: 80

Or use gcloud CLI:
```bash
gcloud compute firewall-rules create allow-http \
    --allow tcp:80 \
    --source-ranges 0.0.0.0/0 \
    --description "Allow HTTP traffic"
```

## Step 10: Get Your Public IP

1. In Google Cloud Console, go to your VM instance
2. Find the "External IP" address
3. Your app will be available at: `http://YOUR_EXTERNAL_IP`

## Step 11: Update README

Update the README.md with your deployment URL:

```markdown
**Deployed Site:** http://YOUR_EXTERNAL_IP
```

## Troubleshooting

### Check nginx status:
```bash
sudo systemctl status nginx
```

### Check nginx logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

### Test nginx configuration:
```bash
sudo nginx -t
```

### If you need to update the app:
1. Build locally: `npm run build`
2. Upload dist folder again
3. Restart nginx: `sudo systemctl restart nginx`

## Optional: Set Up HTTPS with Let's Encrypt

If you have a domain name, you can set up HTTPS:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com
```

## Notes

- The app uses the production API endpoint: `https://nomoreparties.co/news/v2/everything`
- Make sure your API key is set correctly before building
- For updates, rebuild and re-upload the dist folder

