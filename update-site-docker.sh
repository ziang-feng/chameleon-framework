echo "Copying website files to Docker volume..."
docker cp ./css/. chameleon-site:/usr/local/apache2/htdocs/css
docker cp ./img/. chameleon-site:/usr/local/apache2/htdocs/img
docker cp ./site/. chameleon-site:/usr/local/apache2/htdocs/site
docker cp ./file/. chameleon-site:/usr/local/apache2/htdocs/file
docker cp ./index.html chameleon-site:/usr/local/apache2/htdocs/index.html
docker cp ./js/. chameleon-site:/usr/local/apache2/htdocs/js
echo "Website files copied successfully."