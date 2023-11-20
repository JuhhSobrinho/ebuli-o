export function obterDadosClima(apiKey, cidade) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error('Erro ao obter dados do clima:', error);
        throw error; // Lançar o erro para que possa ser tratado no controlador, se necessário
      });
  }
  