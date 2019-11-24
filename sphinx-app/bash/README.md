# Bash Scripts
This sub-project contains a couple of bash scripts for capturing audio from microphone and for cleaning-up temporary files  
There is a systemd service that run these scripts periodically for grabbing audio and storing under mounted NFS folder  
  
## Smart Home systemd service
* **smart-home-audio-capture.service**  
For capturing audio every 2 seconds

* **smart-home-clean-up-files.service**  
Clean-up unneeded wave files after 30 seconds  

## NFS on server
[Network File System (NFS)](https://help.ubuntu.com/lts/serverguide/network-file-system.html.en)  
1. `sudo apt install nfs-kernel-server`
2. add `/srv/nfs4 home-envy(rw,sync,no_subtree_check)` in the **/etc/exports**  
