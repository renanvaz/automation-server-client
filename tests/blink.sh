#!/bin/bash

if [ ! -d "/sys/class/gpio/gpio17" ]; then echo "17" > /sys/class/gpio/export; fi
echo "out" > /sys/class/gpio/gpio17/direction

for (( i=1; i <= 20; i++ ))
do
  echo "1" > /sys/class/gpio/gpio17/value
  sleep .01
  echo "0" > /sys/class/gpio/gpio17/value
  sleep .01
done
