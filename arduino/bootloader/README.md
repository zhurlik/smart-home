# BootLoader
This project uses `kiloboot.asm` from [kiloboot](https://github.com/mitxela/kiloboot) for building 
1kB TFTP Ethernet bootloader for **ATmega328P** and **ENC28J60**  
Arduino devices will get a sketch via network.
# Wine & avrasm2.exe to compile a ASM file to HEX code
`wine bin/avrasm2.exe -fI -I <folder_with_inc_files> <your_asm_file> -o <your_hex_file>`
# Avrdude
`gradlew :arduino:ide:burn -Phex=192-168-100-202.hex`
# Settings
`kiloboot.asm` has a few lines with placeholders to be able to setup **Arduino device** in the intranet
* **file.bin** - sketch file name that bootloader will download from **TFTP server**
* **device.ip** - IP address of Arduino device
* **server.ip** - **TFTP server** where will be stored all sketches
* **gateway.ip** - gateway in your network
* **subnetmask** - subnetmask for devices
* **mac.number.0** - 1st octet
* **mac.number.1** - 2nd octet
* **mac.number.2** - 3rd octet
* **mac.number.3** - 4th octet
* **mac.number.4** - 5th octet
* **mac.number.5** - 6th octet  

```
#define FILENAME "@file.bin@"
#define myIP        @device.ip@
#define serverIP    @server.ip@
#define gatewayIP   @gateway.ip@
#define subnetMask  @subnetmask@
.equ myMAC0 = @mac.number.0@
.equ myMAC1 = @mac.number.1@
.equ myMAC2 = @mac.number.2@
.equ myMAC3 = @mac.number.3@
.equ myMAC4 = @mac.number.4@
.equ myMAC5 = @mac.number.5@
```