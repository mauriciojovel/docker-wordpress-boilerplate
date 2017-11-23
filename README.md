# Run steps
1. Install docker.
2. Clone the project:
```bash
$ git clone --recursive git@github.com:mauriciojovel/docker-wordpress-boilerplate.git your-awesome-site
```
> If you already has the project and you need to download the submodules execute the command *git submodule update --init --recursive*

3. Run:
```bash
$ docker-compose up -d
```
> If you are in windows change the ${PWD} for %cd%

4. If you need execute the gulp in development to check your changes in live execute the follow command:
```bash
$ docker-compose run npm-cli gulp
```

5. Change your hosts file (in linux /etc/hosts) and add the line
```
127.0.0.1 your-awesome-site.com
```

## Stop the project
To stop the project you can execute the follow command
```bash
$ docker-compose stop
```
Also if you like destroy the instance you can execute the follow command
```bash
$ docker-compose down
```

## Dump the data.
To create a backup to our database execute the follow command:
```bash
$ docker-compose exec dbmysql sh -c 'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD";exec mysqldump -uroot site | gzip -9 -c > /docker-entrypoint-initdb.d/database.sql.gz'
```

## Using an existent mysqldb
Execute the follow commands to create a new database an user:
```bash
$ docker-compose exec dbmysql sh -c 'export MYSQL_PWD="$MYSQL_ROOT_PASSWORD"; mysql'
```
after execute the follow comands:
```sql
mysql> CREATE DATABASE IF NOT EXISTS YOUR_DATABASE;
mysql> GRANT ALL ON `YOUR_DATABASE`.* TO 'YOUR_USER'@'localhost' IDENTIFIED BY 'YOUR_PASSWORD';
mysql> FLUSH PRIVILEGES ;
```

## Recomended plugings
1. [Loco Translate](https://wordpress.org/plugins/loco-translate/)
2. [MailChimp for Wordpress](https://wordpress.org/plugins/mailchimp-for-wp/)
3. [Woocommerce](https://woocommerce.com/)
4. [Woocommerce pdf invoice](https://wordpress.org/plugins/woocommerce-pdf-invoices/)
5. [Image Optimization](https://wordpress.org/plugins/wp-smushit/)
6. [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/)
7. [Members](https://wordpress.org/plugins/members/)
8. [Unconfirmed](https://wordpress.org/plugins/unconfirmed/)

# Customize your theme.
Of course the most important part is customize the theme to you can use it, so follow the next step to start your changes.
1. Choose your theme name and rename the folder client-bootstrap for your name.
2. Change in the docker-compose.yml the name of your theme in the npm-cli service.
3. Use [Plugin activation generator](http://tgmpluginactivation.com/download/) to create your own pluging activation and put all your required plugins there.
4. Rename all the references to the *ClientBootstrap* or *client_bootstrap* or *client-boostrap* for your new theme name.

# Folder Structure.
```
project
└───docker
│   └───mysql
│   │   Dockerfile
│   └───ngnix
│   │   default.conf
│   │   docker-entrypoint.sh
│   │   Dockerfile
│   │   LICENSE
│   │   proxy.conf
│   │   README.md
│   │   restrictions.conf
│   │   wordpress.conf
│   └───node
│   │   Dockerfile
│   │   init.sh
└───scripts
└───src
│   └───plugins
│   └───themes
│   └───uploads
│   docker-compose.yml
│   README.md
```

## Changing url
If you need change the url of the project you can execute the follow command (only valid for linux):
```bash
$ sed -i 's/localhost:8080/your-awesome-site.com/g' database.sql
```
