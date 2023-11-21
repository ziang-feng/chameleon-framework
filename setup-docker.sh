#!/bin/bash

# Build the Docker image
echo "Building Docker image..."
docker build -t chameleon-image -<<EOF
FROM httpd:2.4
RUN echo 'LoadModule rewrite_module modules/mod_rewrite.so' >> /usr/local/apache2/conf/httpd.conf
RUN echo '<Directory "/usr/local/apache2/htdocs">\n\tAllowOverride All\n</Directory>' >> /usr/local/apache2/conf/httpd.conf
EOF
echo "Docker image built successfully."

# Create Docker volume
echo "Creating Docker volume..."
docker volume create chameleon-site-volume
echo "Docker volume created successfully."

# Run the Docker container
echo "Starting Docker container..."
docker run -dit -p 8080:80 --name chameleon-site -v chameleon-site-volume:/usr/local/apache2/htdocs/ chameleon-image
echo "Docker container has started."

# Copy website files to Docker volume
echo "Copying website files to Docker volume..."
docker cp ./css chameleon-site:/usr/local/apache2/htdocs/css
docker cp ./img chameleon-site:/usr/local/apache2/htdocs/img
docker cp ./site chameleon-site:/usr/local/apache2/htdocs/site
docker cp ./file chameleon-site:/usr/local/apache2/htdocs/file
docker cp ./index.html chameleon-site:/usr/local/apache2/htdocs/index.html
docker cp ./js chameleon-site:/usr/local/apache2/htdocs/js

# Create and copy .htaccess file to Docker container
echo "Creating .htaccess file..."
echo -e "RewriteEngine On\nRewriteCond %{REQUEST_URI} !^/(css|img|site|file|js/main\.bundle\.js|index\.html)\nRewriteRule ^ /index.html [L]" > ./.htaccess
docker cp ./.htaccess chameleon-site:/usr/local/apache2/htdocs/.htaccess
rm ./.htaccess
echo ".htaccess file created and copied successfully."

echo "Setup completed successfully."