#!/bin/bash
# Deployment steps to run on the VM after uploading dist folder

# Step 1: Set permissions
sudo chown -R www-data:www-data /var/www/news-explorer
sudo chmod -R 755 /var/www/news-explorer

# Step 2: Restart nginx to serve the new files
sudo systemctl restart nginx

# Step 3: Verify nginx is running
sudo systemctl status nginx

# Step 4: Check nginx configuration
sudo nginx -t

echo "Deployment complete! Your app should now be live."

