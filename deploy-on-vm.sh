#!/bin/bash
# Run this script on the VM via SSH

# Remove old files
sudo rm -rf /var/www/news-explorer/dist/*

# Copy new files
sudo cp -r ~/dist-temp/dist/* /var/www/news-explorer/dist/

# Set permissions
sudo chown -R www-data:www-data /var/www/news-explorer
sudo chmod -R 755 /var/www/news-explorer

# Restart nginx
sudo systemctl restart nginx

# Verify
sudo systemctl status nginx --no-pager

echo "Deployment complete!"

