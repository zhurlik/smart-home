/opt/arduino-1.8.7/arduino-builder -dump-prefs -logger=machine -hardware /opt/arduino-1.8.7/hardware -tools /opt/arduino-1.8.7/tools-builder -tools /opt/arduino-1.8.7/hardware/tools/avr -built-in-libraries /opt/arduino-1.8.7/libraries -libraries /home/zhurlik/Arduino/libraries -fqbn=arduino:avr:nano:cpu=atmega328old -ide-version=10807 -build-path /tmp/arduino_build_921969 -warnings=all -build-cache /tmp/arduino_cache_294101 -prefs=build.warn_data_percentage=75 -prefs=runtime.tools.avrdude.path=/opt/arduino-1.8.7/hardware/tools/avr -prefs=runtime.tools.avrdude-6.3.0-arduino14.path=/opt/arduino-1.8.7/hardware/tools/avr -prefs=runtime.tools.arduinoOTA.path=/opt/arduino-1.8.7/hardware/tools/avr -prefs=runtime.tools.arduinoOTA-1.2.1.path=/opt/arduino-1.8.7/hardware/tools/avr -prefs=runtime.tools.avr-gcc.path=/opt/arduino-1.8.7/hardware/tools/avr -prefs=runtime.tools.avr-gcc-5.4.0-atmel3.6.1-arduino2.path=/opt/arduino-1.8.7/hardware/tools/avr -verbose /github/smart-home/arduino/prototype/src/arduino/main/main.ino
/opt/arduino-1.8.7/arduino-builder -compile -logger=machine -hardware /opt/arduino-1.8.7/hardware -tools /opt/arduino-1.8.7/tools-builder -tools /opt/arduino-1.8.7/hardware/tools/avr -built-in-libraries /opt/arduino-1.8.7/libraries -libraries /home/zhurlik/Arduino/libraries -fqbn=arduino:avr:nano:cpu=atmega328old -ide-version=10807 -build-path /tmp/arduino_build_921969 -warnings=all -build-cache /tmp/arduino_cache_294101 -prefs=build.warn_data_percentage=75 -prefs=runtime.tools.avrdude.path=/opt/arduino-1.8.7/hardware/tools/avr -prefs=runtime.tools.avrdude-6.3.0-arduino14.path=/opt/arduino-1.8.7/hardware/tools/avr -prefs=runtime.tools.arduinoOTA.path=/opt/arduino-1.8.7/hardware/tools/avr -prefs=runtime.tools.arduinoOTA-1.2.1.path=/opt/arduino-1.8.7/hardware/tools/avr -prefs=runtime.tools.avr-gcc.path=/opt/arduino-1.8.7/hardware/tools/avr -prefs=runtime.tools.avr-gcc-5.4.0-atmel3.6.1-arduino2.path=/opt/arduino-1.8.7/hardware/tools/avr -verbose /github/smart-home/arduino/prototype/src/arduino/main/main.ino
Using board 'nano' from platform in folder: /opt/arduino-1.8.7/hardware/arduino/avr
Using core 'arduino' from platform in folder: /opt/arduino-1.8.7/hardware/arduino/avr
Detecting libraries used...
/opt/arduino-1.8.7/hardware/tools/avr/bin/avr-g++ -c -g -Os -w -std=gnu++11 -fpermissive -fno-exceptions -ffunction-sections -fdata-sections -fno-threadsafe-statics -Wno-error=narrowing -flto -w -x c++ -E -CC -mmcu=atmega328p -DF_CPU=16000000L -DARDUINO=10807 -DARDUINO_AVR_NANO -DARDUINO_ARCH_AVR -I/opt/arduino-1.8.7/hardware/arduino/avr/cores/arduino -I/opt/arduino-1.8.7/hardware/arduino/avr/variants/eightanaloginputs /tmp/arduino_build_921969/sketch/main.ino.cpp -o /dev/null
/opt/arduino-1.8.7/hardware/tools/avr/bin/avr-g++ -c -g -Os -w -std=gnu++11 -fpermissive -fno-exceptions -ffunction-sections -fdata-sections -fno-threadsafe-statics -Wno-error=narrowing -flto -w -x c++ -E -CC -mmcu=atmega328p -DF_CPU=16000000L -DARDUINO=10807 -DARDUINO_AVR_NANO -DARDUINO_ARCH_AVR -I/opt/arduino-1.8.7/hardware/arduino/avr/cores/arduino -I/opt/arduino-1.8.7/hardware/arduino/avr/variants/eightanaloginputs -I/home/zhurlik/Arduino/libraries/EtherCard/src /tmp/arduino_build_921969/sketch/main.ino.cpp -o /dev/null
Using cached library dependencies for file: /home/zhurlik/Arduino/libraries/EtherCard/src/EtherCard.cpp
Using cached library dependencies for file: /home/zhurlik/Arduino/libraries/EtherCard/src/bufferfiller.cpp
Using cached library dependencies for file: /home/zhurlik/Arduino/libraries/EtherCard/src/dhcp.cpp
Using cached library dependencies for file: /home/zhurlik/Arduino/libraries/EtherCard/src/dns.cpp
Using cached library dependencies for file: /home/zhurlik/Arduino/libraries/EtherCard/src/enc28j60.cpp
Using cached library dependencies for file: /home/zhurlik/Arduino/libraries/EtherCard/src/stash.cpp
Using cached library dependencies for file: /home/zhurlik/Arduino/libraries/EtherCard/src/tcpip.cpp
Using cached library dependencies for file: /home/zhurlik/Arduino/libraries/EtherCard/src/udpserver.cpp
Using cached library dependencies for file: /home/zhurlik/Arduino/libraries/EtherCard/src/webutil.cpp
Generating function prototypes...
/opt/arduino-1.8.7/hardware/tools/avr/bin/avr-g++ -c -g -Os -w -std=gnu++11 -fpermissive -fno-exceptions -ffunction-sections -fdata-sections -fno-threadsafe-statics -Wno-error=narrowing -flto -w -x c++ -E -CC -mmcu=atmega328p -DF_CPU=16000000L -DARDUINO=10807 -DARDUINO_AVR_NANO -DARDUINO_ARCH_AVR -I/opt/arduino-1.8.7/hardware/arduino/avr/cores/arduino -I/opt/arduino-1.8.7/hardware/arduino/avr/variants/eightanaloginputs -I/home/zhurlik/Arduino/libraries/EtherCard/src /tmp/arduino_build_921969/sketch/main.ino.cpp -o /tmp/arduino_build_921969/preproc/ctags_target_for_gcc_minus_e.cpp
/opt/arduino-1.8.7/tools-builder/ctags/5.8-arduino11/ctags -u --language-force=c++ -f - --c++-kinds=svpf --fields=KSTtzns --line-directives /tmp/arduino_build_921969/preproc/ctags_target_for_gcc_minus_e.cpp
Compiling sketch...
/opt/arduino-1.8.7/hardware/tools/avr/bin/avr-g++ -c -g -Os -Wall -Wextra -std=gnu++11 -fpermissive -fno-exceptions -ffunction-sections -fdata-sections -fno-threadsafe-statics -Wno-error=narrowing -MMD -flto -mmcu=atmega328p -DF_CPU=16000000L -DARDUINO=10807 -DARDUINO_AVR_NANO -DARDUINO_ARCH_AVR -I/opt/arduino-1.8.7/hardware/arduino/avr/cores/arduino -I/opt/arduino-1.8.7/hardware/arduino/avr/variants/eightanaloginputs -I/home/zhurlik/Arduino/libraries/EtherCard/src /tmp/arduino_build_921969/sketch/main.ino.cpp -o /tmp/arduino_build_921969/sketch/main.ino.cpp.o
/github/smart-home/arduino/prototype/src/arduino/main/main.ino: In function 'void setup()':
/github/smart-home/arduino/prototype/src/arduino/main/main.ino:25:56: warning: ISO C++ forbids converting a string constant to 'char*' [-Wwrite-strings]
   ether.parseIp(ipDestinationAddress, "192.168.100.255");
                                                        ^
Compiling libraries...
Compiling library "EtherCard"
Using previously compiled file: /tmp/arduino_build_921969/libraries/EtherCard/EtherCard.cpp.o
Using previously compiled file: /tmp/arduino_build_921969/libraries/EtherCard/tcpip.cpp.o
Using previously compiled file: /tmp/arduino_build_921969/libraries/EtherCard/bufferfiller.cpp.o
Using previously compiled file: /tmp/arduino_build_921969/libraries/EtherCard/udpserver.cpp.o
Using previously compiled file: /tmp/arduino_build_921969/libraries/EtherCard/stash.cpp.o
Using previously compiled file: /tmp/arduino_build_921969/libraries/EtherCard/webutil.cpp.o
Using previously compiled file: /tmp/arduino_build_921969/libraries/EtherCard/enc28j60.cpp.o
Using previously compiled file: /tmp/arduino_build_921969/libraries/EtherCard/dns.cpp.o
Using previously compiled file: /tmp/arduino_build_921969/libraries/EtherCard/dhcp.cpp.o
Compiling core...
Using precompiled core: /tmp/arduino_cache_294101/core/core_arduino_avr_nano_cpu_atmega328old_8bcbb10bb0e7a5b614c24d1e9ac07d80.a
Linking everything together...
/opt/arduino-1.8.7/hardware/tools/avr/bin/avr-gcc -Wall -Wextra -Os -g -flto -fuse-linker-plugin -Wl,--gc-sections -mmcu=atmega328p -o /tmp/arduino_build_921969/main.ino.elf /tmp/arduino_build_921969/sketch/main.ino.cpp.o /tmp/arduino_build_921969/libraries/EtherCard/EtherCard.cpp.o /tmp/arduino_build_921969/libraries/EtherCard/bufferfiller.cpp.o /tmp/arduino_build_921969/libraries/EtherCard/dhcp.cpp.o /tmp/arduino_build_921969/libraries/EtherCard/dns.cpp.o /tmp/arduino_build_921969/libraries/EtherCard/enc28j60.cpp.o /tmp/arduino_build_921969/libraries/EtherCard/stash.cpp.o /tmp/arduino_build_921969/libraries/EtherCard/tcpip.cpp.o /tmp/arduino_build_921969/libraries/EtherCard/udpserver.cpp.o /tmp/arduino_build_921969/libraries/EtherCard/webutil.cpp.o /tmp/arduino_build_921969/../arduino_cache_294101/core/core_arduino_avr_nano_cpu_atmega328old_8bcbb10bb0e7a5b614c24d1e9ac07d80.a -L/tmp/arduino_build_921969 -lm
/opt/arduino-1.8.7/hardware/tools/avr/bin/avr-objcopy -O ihex -j .eeprom --set-section-flags=.eeprom=alloc,load --no-change-warnings --change-section-lma .eeprom=0 /tmp/arduino_build_921969/main.ino.elf /tmp/arduino_build_921969/main.ino.eep
/opt/arduino-1.8.7/hardware/tools/avr/bin/avr-objcopy -O ihex -R .eeprom /tmp/arduino_build_921969/main.ino.elf /tmp/arduino_build_921969/main.ino.hex
Multiple libraries were found for "EtherCard.h"
 Used: /home/zhurlik/Arduino/libraries/EtherCard
 Not used: /home/zhurlik/Arduino/libraries/ethercard-master
Using library EtherCard at version 1.1.0 in folder: /home/zhurlik/Arduino/libraries/EtherCard
/opt/arduino-1.8.7/hardware/tools/avr/bin/avr-size -A /tmp/arduino_build_921969/main.ino.elf
Sketch uses 6114 bytes (19%) of program storage space. Maximum is 30720 bytes.
Global variables use 1166 bytes (56%) of dynamic memory, leaving 882 bytes for local variables. Maximum is 2048 bytes.
/opt/arduino-1.8.7/hardware/tools/avr/bin/avrdude -C/opt/arduino-1.8.7/hardware/tools/avr/etc/avrdude.conf -v -patmega328p -carduino -P/dev/ttyUSB0 -b57600 -D -Uflash:w:/tmp/arduino_build_921969/main.ino.hex:i

avrdude: Version 6.3-20171130
         Copyright (c) 2000-2005 Brian Dean, http://www.bdmicro.com/
         Copyright (c) 2007-2014 Joerg Wunsch

         System wide configuration file is "/opt/arduino-1.8.7/hardware/tools/avr/etc/avrdude.conf"
         User configuration file is "/home/zhurlik/.avrduderc"

         Using Port                    : /dev/ttyUSB0
         Using Programmer              : arduino
         Overriding Baud Rate          : 57600
         AVR Part                      : ATmega328P
         Chip Erase delay              : 9000 us
         PAGEL                         : PD7
         BS2                           : PC2
         RESET disposition             : dedicated
         RETRY pulse                   : SCK
         serial program mode           : yes
         parallel program mode         : yes
         Timeout                       : 200
         StabDelay                     : 100
         CmdexeDelay                   : 25
         SyncLoops                     : 32
         ByteDelay                     : 0
         PollIndex                     : 3
         PollValue                     : 0x53
         Memory Detail                 :

                                  Block Poll               Page                       Polled
           Memory Type Mode Delay Size  Indx Paged  Size   Size #Pages MinW  MaxW   ReadBack
           ----------- ---- ----- ----- ---- ------ ------ ---- ------ ----- ----- ---------
           eeprom        65    20     4    0 no       1024    4      0  3600  3600 0xff 0xff
           flash         65     6   128    0 yes     32768  128    256  4500  4500 0xff 0xff
           lfuse          0     0     0    0 no          1    0      0  4500  4500 0x00 0x00
           hfuse          0     0     0    0 no          1    0      0  4500  4500 0x00 0x00
           efuse          0     0     0    0 no          1    0      0  4500  4500 0x00 0x00
           lock           0     0     0    0 no          1    0      0  4500  4500 0x00 0x00
           calibration    0     0     0    0 no          1    0      0     0     0 0x00 0x00
           signature      0     0     0    0 no          3    0      0     0     0 0x00 0x00

         Programmer Type : Arduino
         Description     : Arduino
         Hardware Version: 2
         Firmware Version: 1.16
         Vtarget         : 0.0 V
         Varef           : 0.0 V
         Oscillator      : Off
         SCK period      : 0.1 us

avrdude: AVR device initialized and ready to accept instructions

Reading | ################################################## | 100% 0.00s

avrdude: Device signature = 0x1e950f (probably m328p)
avrdude: reading input file "/tmp/arduino_build_921969/main.ino.hex"
avrdude: writing flash (6114 bytes):

Writing | ################################################## | 100% 1.80s

avrdude: 6114 bytes of flash written
avrdude: verifying flash memory against /tmp/arduino_build_921969/main.ino.hex:
avrdude: load data flash data from input file /tmp/arduino_build_921969/main.ino.hex:
avrdude: input file /tmp/arduino_build_921969/main.ino.hex contains 6114 bytes
avrdude: reading on-chip flash data:

Reading | ################################################## | 100% 1.37s

avrdude: verifying ...
avrdude: 6114 bytes of flash verified

avrdude done.  Thank you.