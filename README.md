# HOMEZ

É composto por 3 partes:

- Home
- Server
- App

## Funcionamento
- A Home fica enviando a todo momento os dados de estado e consumo para o Server.
- O Server grava os dados em banco de dados (período a ser armazenado a definir).
- O Server ao reconhecer alguma alteração de estado, emite um evento para o APP que por sua vez irá atualizar sua lista de estado.
- Qualquer outro evento derá ser uma requisição no momento em que for requerido a visualização do dado, não será automático como a mudança de estado.

## Observações
- É necessário que se o sistema esteja fora do ar ou caído, que a casa possa funcionar normalmente e estar com todas as tomadas liberadas.
- Ver se é possível deixar todos os GNDs fora do raspberry, pois o raspberry pode não conseguir fornecer a conrrente necessária para todos os eletrônicos.
- REF do sensor de corrente: `https://dutraleo.wordpress.com/2013/01/29/sensor-de-corrente-acs712-30a/` ``
