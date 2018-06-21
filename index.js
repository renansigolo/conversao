// Importando dependências
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const http = require('request');

// Gerar a aplicação
const app = express();

// Configurar o handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Middleware
app.use(express.static('assets'));
app.use(bodyParser.urlencoded());

//Rotas
app.get('/', (request, response) => {

  http.get('http://api.fixer.io/latest?base=BRL', (err, apiRequest, body) => {
  let object = JSON.parse(body);

    response.render('index', {taxa: object.rates.USD});

  })
});

app.post('/conversao', (request, response) => {
  http.get('http://api.fixer.io/latest?base=BRL', (err, apiRequest, body) => {
  let object = JSON.parse(body);
  let dollarRate = object.rates.USD;

  let dados = request.body.valorUser;

  let resultado = dados * dollarRate;


  console.log(dados);
  console.log(dollarRate);
  console.log(`O resultado é: ${resultado}`);

    response.render('resposta', {valor: resultado});
  });
});

//Inicializar o servidor
app.listen(3000, () => {
    console.log('Server Initialized at http://localhost:3000');
});
