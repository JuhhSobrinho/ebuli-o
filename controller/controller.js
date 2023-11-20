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

const horas = document.getElementById('horas');

const botao = document.getElementById('buttonPes');
const pesquiID = document.getElementById('cityID');

obterDadosClima(apiKey, cidade)
  .then(data => {
    // Processar os dados no controlador
    console.log(data);
    const descricaoTempo = data.weather[0].description;
    const mainTempo = data.weather[0].main;

    const kevin =  data.main.temp;
    const graus = parseInt(data.main.temp - 273.15) + '°';

    const umidade = 'Umidade '+(data.main.humidity)+' %';
   
    console.log('sla',data.weather[0].description);


    city.innerHTML = data.name;
    estadoDoTempo.innerHTML = descricaoTempo;
    grausDaCity.innerHTML = graus;
    tempoGeral.innerHTML = umidade


    if (mainTempo == "Clouds") {
        iconEstadoDoTempo.src = cloudImg;
    } else if(mainTempo == 'Rain') {
        iconEstadoDoTempo.src = rainImg;
    }


    botao.addEventListener('click', () => {
        console.log(pesquiID.value);

        const novaCity = pesquiID.value;
        cidade = novaCity;
    });



  })

  .catch(error => {
    // Tratar erros, se necessário
    console.error('Erro no controlador:', error);
  });


  function renderizarHoraAtual() {
    const dataAtual = new Date();
    const hora = dataAtual.getHours();
    const minutos = dataAtual.getMinutes();
    const segundos = dataAtual.getSeconds();

    horas.innerHTML = `${hora}:${minutos}:${segundos}`;

}

// Iniciar a renderização a cada segundo
const intervalId = setInterval(renderizarHoraAtual, 1000);
