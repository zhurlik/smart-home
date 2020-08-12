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

## Test microphone from command line
First, step is to list all avaiable microphone devices. Open up your terminal window and enter the following command:    
`$ sudo  arecord -l`    
**** List of CAPTURE Hardware Devices ****    
card 0: PCH [HDA Intel PCH], device 0: ALC662 rev3 Analog [ALC662 rev3 Analog]    
  Subdevices: 1/1    
  Subdevice #0: subdevice #0    
card 0: PCH [HDA Intel PCH], device 2: ALC662 rev3 Alt Analog [ALC662 rev3 Alt Analog]    
  Subdevices: 1/1    
  Subdevice #0: subdevice #0    
card 1: Q9000 [QuickCam Pro 9000], device 0: USB Audio [USB Audio]    
  Subdevices: 1/1    
  Subdevice #0: subdevice #0    
Next record a short 10 seconds audio by using the following command:    
`$ sudo arecord -f S16_LE -d 10 -r 16000 --device="hw:1,0" /tmp/test-mic.wav`    
In the above example we have recorded audio via microphone using the QuickCam Pro 9000 as specified by `--device="hw:1,0"` as in `card 1` and `device 0` from the `arecord -l` output in the previous step.    
 Now confirm that the microphone recorded correctly your audio input by using aplay:    
`# aplay /tmp/test-mic.wav`    
