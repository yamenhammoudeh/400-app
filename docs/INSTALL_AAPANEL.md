## Installing 400 Card Game on aaPanel

### Prerequisites
- aaPanel installed on your server
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Nginx or Apache web server

### Step 1: Create Website in aaPanel

1. Log in to aaPanel
2. Go to "Website" section
3. Click "Add Website"
4. Fill in the following:
   - Domain: Your domain name (e.g., game.yourdomain.com)
   - Database: Check "Create Database"
   - PHP Version: Select PHP 8.0 or higher
5. Click "Submit" to create the website

### Step 2: Upload Files

1. In aaPanel, go to "Files" section
2. Navigate to your website's root directory (usually `/www/wwwroot/yourdomain.com/`)
3. Upload all application files to this directory
4. Set proper permissions:
   ```bash
   chmod -R 755 /www/wwwroot/yourdomain.com
   chmod -R 777 /www/wwwroot/yourdomain.com/config
   ```

### Step 3: Configure Database

1. Go to "Database" section in aaPanel
2. Note down the following information:
   - Database Name
   - Database Username
   - Database Password
   - Database Host (usually 'localhost')

### Step 4: Run Installation

1. Open your browser and navigate to:
   ```
   https://yourdomain.com/install
   ```

2. Fill in the installation form:
   - App Name: Your game name
   - Domain Name: Your full domain
   - Database Host: From step 3 (usually 'localhost')
   - Database Name: From step 3
   - Database Username: From step 3
   - Database Password: From step 3
   - Admin Username: Choose an admin username
   - Admin Password: Choose a secure password

3. Click "Install Application"

### Step 5: Configure Nginx/Apache

#### For Nginx:
Add the following to your site's Nginx configuration:

```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}

location /api {
    try_files $uri $uri/ /api/index.php?$query_string;
}

# PHP-FPM Configuration
location ~ \.php$ {
    fastcgi_pass unix:/tmp/php-cgi-74.sock;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
}
```

#### For Apache:
The .htaccess file is already included in the installation.

### Step 6: Security Measures

1. Remove the install directory after installation:
   ```bash
   rm -rf /www/wwwroot/yourdomain.com/install
   ```

2. Set secure permissions:
   ```bash
   find /www/wwwroot/yourdomain.com -type f -exec chmod 644 {} \;
   find /www/wwwroot/yourdomain.com -type d -exec chmod 755 {} \;
   chmod -R 777 /www/wwwroot/yourdomain.com/config
   ```

### Step 7: Verify Installation

1. Visit your domain to check if the game works
2. Try accessing the admin panel:
   ```
   https://yourdomain.com/admin
   ```
3. Log in with your admin credentials

### Troubleshooting

#### Common Issues:

1. **Database Connection Error**
   - Verify database credentials in config/config.php
   - Check if MySQL service is running
   - Ensure database user has proper permissions

2. **Permission Issues**
   - Check folder permissions, especially for config directory
   - Ensure web server user has write access to required directories

3. **404 Errors**
   - Verify Nginx/Apache configuration
   - Check if mod_rewrite is enabled (Apache)
   - Ensure .htaccess file is present and readable

4. **White Screen**
   - Check PHP error logs in aaPanel
   - Enable error reporting temporarily
   - Verify PHP version compatibility

### Support

If you encounter any issues:

1. Check aaPanel logs:
   - Error logs: `/www/wwwlogs/yourdomain.com.error.log`
   - Access logs: `/www/wwwlogs/yourdomain.com.access.log`

2. Check PHP error log:
   - Location varies based on configuration
   - Usually in `/www/wwwlogs/php-error.log`

3. Contact support:
   - Email: mr.yamen@gmail.com
   - Include error logs and detailed problem description

### Security Recommendations

1. **SSL Certificate**
   - Install SSL certificate through aaPanel
   - Force HTTPS using web server configuration

2. **Firewall Settings**
   - Configure aaPanel firewall
   - Allow only necessary ports (80, 443)
   - Restrict admin panel access by IP if possible

3. **Regular Updates**
   - Keep PHP version updated
   - Regularly update aaPanel
   - Monitor security announcements

### Maintenance

1. **Regular Backups**
   - Use aaPanel backup feature
   - Schedule daily database backups
   - Keep backup copies off-server

2. **Performance Optimization**
   - Enable PHP OPcache
   - Configure MySQL caching
   - Enable Nginx/Apache caching

3. **Monitoring**
   - Set up resource monitoring in aaPanel
   - Monitor disk space usage
   - Check error logs regularly