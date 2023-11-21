// controller.js

import { obterDadosClima } from "../model/model.js";

const apiKey = 'e722177d9a851c123d83b6fa7b0a97d9';
var cidade = 'Pindamonhangaba';

const city = document.getElementById('cidadeClima');
const estadoDoTempo = document.getElementById('estadoTempo');

const grausDaCity = document.getElementById('graus');

const iconEstadoDoTempo = document.getElementById('tempoImg');
const cloudImg = '../view/assets/cloud.svg';
const rainImg = '../view/assets/rain.svg';

const tempoGeral = document.getElementById('tempo');
const tempMax = document.getElementById('maxTemp');
const tempMin = document.getElementById('minTemp');
const sensacao = document.getElementById('sensacaoTempo');

const vento = document.getElementById('vento');

const horas = document.getElementById('horas');

const botao = document.getElementById('buttonPes');
const pesquiID = document.getElementById('cityID');


botao.addEventListener('click', () => {
  console.log(pesquiID.value);

  const novaCity = pesquiID.value;
  cidade = novaCity;

  main();
});

function main() {

  obterDadosClima(apiKey, cidade)
    .then(data => {
      // Processar os dados no controlador
      console.log(data);
      const descricaoTempo = data.weather[0].description;
      const mainTempo = data.weather[0].main;

      const kevin = data.main.temp;
      const graus = parseInt(data.main.temp - 273.15) + '°';

      const maxTemp =  parseInt(data.main.temp_max - 273.15) + '°';
      const minTemp = '/'+ parseInt(data.main.temp_min - 273.15) + '°';
      const sensacaoTemp = 'Sensação térmica de '+ parseInt(data.main.feels_like - 273.15) + '°';

      const speedVento = 'Vento ' + parseInt(data.wind.speed * 3,6) + ' km/h';

      const umidade = 'Umidade ' + (data.main.humidity) + '%';

      console.log('sla', data.weather[0].description);


      city.innerHTML = data.name;
      estadoDoTempo.innerHTML = descricaoTempo;
      grausDaCity.innerHTML = graus;
      tempoGeral.innerHTML = umidade;
      tempMax.innerHTML = maxTemp;
      tempMin.innerHTML = minTemp;
      sensacao.innerHTML = sensacaoTemp;
      vento.innerHTML = speedVento;



      if (mainTempo == "Clouds") {
        iconEstadoDoTempo.src = cloudImg;
      } else if (mainTempo == 'Rain') {
        iconEstadoDoTempo.src = rainImg;
      }

    })

    .catch(error => {
      // Tratar erros, se necessário
      console.error('Erro no controlador:', error);
    });

}

function renderizarHoraAtual() {
  const dataAtual = new Date();
  const hora = dataAtual.getHours();
  const minutos = dataAtual.getMinutes();
  const segundos = dataAtual.getSeconds();

  horas.innerHTML = `${hora}:${minutos}:${segundos}`;

}

// Iniciar a renderização a cada segundo
const intervalId = setInterval(renderizarHoraAtual, 1000);
const intervalIdTempo = setInterval(main(), 1000);


