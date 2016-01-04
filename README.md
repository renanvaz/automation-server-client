# HOMEZ
É composto por 3 partes:
- Home
- Server
- App

## Funcionamento
- A Home verifica a todo o momento o estados das "tomadas". Se encontrar alguma alteração ele emite um evento para o Server que por sua vez envia para o APP. Evento "state".
- A Home fica enviando a cada segundo os dados de consumo para o Server. Evento "consumption". O Server grava os dados em banco de dados.
- Qualquer outro evento deverá ser uma requisição no momento em que for requerido a visualização do dado, não será automático como a mudança de estado.

## Observações
- É necessário que se o sistema esteja fora do ar ou caído, que a casa possa funcionar normalmente e estar com todas as tomadas liberadas.
- Ver se é possível deixar todos PIN Porwers fora do raspberry, pois o raspberry pode não conseguir fornecer a conrrente necessária para todos os eletrônicos.
- REF do sensor de corrente: [Artigo](https://dutraleo.wordpress.com/2013/01/29/sensor-de-corrente-acs712-30a/) [Produto](http://produto.mercadolivre.com.br/MLB-653250744-sensor-corrente-30a-arduino-pic-atmega-arm-modulo-_JM)
- GPIO via Shell. Verificar tensão de saída dos PINs (3v). [Artigo](http://luketopia.net/2013/07/28/raspberry-pi-gpio-via-the-shell/)
- Verificar a versão do Raspberry PI: [Artigo](http://www.raspberrypi-spy.co.uk/2012/09/checking-your-raspberry-pi-board-version/)
- GPIO PINs (Model B Rev 2) para realizar o shift out são: 17 (data), 27 (latch), 22 (clock)
- GPIO PINs (Model B Rev 2) Também são utilzadas as portas 04 (clear), 18 (count) para fazer a contagem de quantos outputs o sistema fará o gerenciamento
- Ver se vale a pena utilizar esta lib para o GPIO: http://wiringpi.com/download-and-install/

## Requirimentos
- NodeJS or IOJS ARM6l version (esta versão é para a Raspberry Model B Rev 2)
- MysqlServer database
- Static IP

## Configurar o Wifi
    $ sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

Adicionar no final do arquivo o seguinte:

    network={
        ssid="The_ESSID_from_earlier"
        psk="Your_wifi_password"
    }

Após salvar o arquivo:

    $ sudo ifdown wlan0
    $ sudo ifup wlan0

* Pode ser necessário executar `sudo ifup wlan0` 2 vezes.

## Configurar um IP fixo
    $ sudo nano /etc/network/interfaces

Procurar pelo `wlan0` e adicionar os parâmetros abaixo de acordo com o IP da sua rede:
    iface wlan0 inet manual
    address 192.168.25.207
    netmask 255.255.255.0
    gateway 192.168.25.1

## Hardware
Fonte de computador (3.3v, 5v e 12v)
Transistores/Mosfet
Optoacopladores
Relé 5v 220v 10a/30a
Diodos
Resistores
Leds
CI
    MCP3008
    74HC595 (Shift Register - Serial to paralell)
    CD4051 (Analog Multiplex)
LCD 7'
Câmera?
