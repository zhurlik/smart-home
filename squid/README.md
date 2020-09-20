# Squid Configuration
1. copy all the files and make the corresponded folders
2. update /etc/squid/squid.conf to have the following
```shell script
#  Configuration options can be included using the "include" directive.
#  Include takes a list of files to include. Quoting and wildcards are
#  supported.
#
#  For example,
#
#  include /path/to/included/file/squid.acl.config
include /home/zhurlik/.squid/*.config
```
# SquidGuard
1. see `/etc/squidguard/squidGuard.conf` and `/home/zhurlik/.squid/url-rewrite.config`
2. `sudo crontab -e`     
```shell script
@monthly /home/zhurlik/.squid/update-squidguard-db.sh
```
# Nginx
1. `sudo apt install nginx`
2. copy `/var/www/html/403-squid.html`

