#!/bin/bash
exec 1> >(logger -s -t $(basename $0)) 2>&1

cd /home/zhurlik/.squid/db

echo "=============== 1. Remove ===================="
echo "sudo rm -rf *"
sudo rm -rf *

echo "=============== 2. Download ===================="
echo "sudo wget http://www.shallalist.de/Downloads/shallalist.tar.gz"
sudo wget http://www.shallalist.de/Downloads/shallalist.tar.gz

echo "sudo wget http://squidguard.mesd.k12.or.us/blacklists.tgz"
sudo wget http://squidguard.mesd.k12.or.us/blacklists.tgz

echo "=============== 3. Extract ===================="
echo "sudo tar -xzvf shallalist.tar.gz"
sudo tar -xzvf shallalist.tar.gz
echo "sudo tar -xzvf blacklists.tgz"
sudo tar -xzvf blacklists.tgz

echo "=============== 4. Remove tar.gz ===================="
echo "sudo rm shallalist.tar.gz blacklists.tgz"
sudo rm shallalist.tar.gz blacklists.tgz

echo "=============== 5. Link to /var/lib/squidguard/ ===================="
echo "sudo rm -rf /var/lib/squidguard/db"
sudo rm -rf /var/lib/squidguard/db
echo "sudo ln -s /home/zhurlik/.squid/db /var/lib/squidguard/"
sudo ln -s /home/zhurlik/.squid/db /var/lib/squidguard/

echo "=============== 6. Compile squidGuard db ===================="
echo "sudo squidGuard -C all"
sudo squidGuard -C all

echo "=============== 7. Change owner ===================="
echo "sudo chown -R proxy:proxy /var/lib/squidguard/db*"
sudo chown -R proxy:proxy /var/lib/squidguard/db
sudo chown -R proxy:proxy /var/lib/squidguard/db/

echo "=============== 8. Restart squid ===================="
echo "sudo systemctl restart squid.service"
sudo systemctl restart squid.service
echo "sudo squid -k reconfigure"
sudo squid -k reconfigure
echo "sudo systemctl status squid.service"
sudo systemctl -l --no-pager status squid.service