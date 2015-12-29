echo ""
echo "------------------------------------------------"
echo "UPDATING SOURCE LISTS"
echo "------------------------------------------------"

sudo apt-get update -y



echo ""
echo ""
echo "------------------------------------------------"
echo "UPGRATING PROGRAMS"
echo "------------------------------------------------"

sudo apt-get upgrade -y




echo ""
echo ""
echo "------------------------------------------------"
echo "SETUP TIMEZONE"
echo "------------------------------------------------"

echo "America/Sao_Paulo" > /etc/timezone
sudo dpkg-reconfigure noninteractive tzdata -f
sudo apt-get install language-pack-pt-base -y




echo ""
echo ""
echo "------------------------------------------------"
echo "INSTALL IOJS ARM6l"
echo "------------------------------------------------"
sudo wget -O - https://nodejs.org/dist/v4.2.4/node-v4.2.4-linux-armv6l.tar.gz | sudo tar -C /usr/local/ --strip-components=1 -zxv




echo ""
echo ""
echo "------------------------------------------------"
echo "INSTALL NPM PACKAGE \"FOREVER\" GLOBALLY"
echo "------------------------------------------------"
sudo npm install forever -g



# echo ""
# echo ""
# echo "------------------------------------------------"
# echo "INSTALL THE WIRINGPI LIBRARY TO CONTROL THE GPIO"
# echo "------------------------------------------------"
# git clone git://git.drogon.net/wiringPi
# cd wiringPi
# ./build

# sed -e 's/a/A/' -e 's/b/B/' < file
