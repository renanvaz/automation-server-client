# HOMEZ

É composto por 3 partes:

- Home
- Server
- App

A Home fica enviando a todo momento os dados de estado e consumo para o Server.
O Server grava os dados em banco de dados (período a ser armazenado a definir).
O Server ao reconhecer alguma alteração de estado, emite um evento para o APP que por sua vez irá atualizar sua lista de estado.
Qualquer outro evento derá ser uma requisição no momento em que for requerido a visualização do dado, não será automático como a mudança de estado.
