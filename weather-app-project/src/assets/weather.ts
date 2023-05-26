import axios from "axios";

const apiKey: string = '&appid=f24f5e9709bc77a5de811683e7de8f19'

interface Forecast {
    main: {
        temp: number;
        feels_like:number;
    };
    dt_txt: string;
    weather: {
        icon: string;
    }[];
    speed: string;
    deg: string;
    gust: string;
}
interface WeatherData {
    data: {
        visibility: Forecast;
         wind: Forecast;
        main: {
            humidity: number;
        };
    };
}

export function getWeather(latitude: string, longitude: string){
    const api: string = 'https://api.openweathermap.org/data/2.5/weather?';
    latitude = `&lat=${latitude}`;
    longitude = `&lon=${longitude}`;

    axios.get(api+latitude+longitude+apiKey)
    .then(response => {
        let weatherTemp = response.data.main.temp;
        weatherTemp = Math.floor(weatherTemp - 273.15);

        const tempCelsius: string = weatherTemp+'°C';
        const temp: HTMLElement | null = document.querySelector('.temperature-celsius');
        if(!temp){
            console.error('weatherIconElement not found')
            return;
        }
        temp.innerHTML = tempCelsius;

        let weatherData = response.data.weather[0].description;
        weatherData = weatherData.charAt(0).toUpperCase() + weatherData.slice(1);

        const weatherDescription: string = weatherData;
        const weatherDesc: HTMLElement | null = document.querySelector('.weather-description');
        if(!weatherDesc){
            console.error('weatherIconElement not found')
            return;
        }
        weatherDesc.innerHTML = weatherDescription;

        const weatherIcon = response.data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

        const weatherIconElement: HTMLElement | null = document.getElementById('main-icon');
        if(!weatherIconElement){
            console.error('weatherIconElement not found')
            return;
        }

        weatherIconElement.setAttribute('src', iconUrl);


        additionalWeatherInformation(response)
    })
    .catch(error => {
        console.error(error);
    });
}
export function additionalWeatherInformation(response: WeatherData){
    const visibilityData:Forecast = response.data.visibility;
    const windData:Forecast = response.data.wind;
    const humidityData:string = response.data.main.humidity+'%';

    const container: HTMLElement | null = document.querySelector('.weather-information');
    if(!container){
        console.error('weatherIconElement not found')
        return;
      }
    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach((paragraph: HTMLParagraphElement) => {
      paragraph.remove();
    });

    const visibilityDiv: HTMLParagraphElement = document.createElement('p');
    visibilityDiv.textContent = 'Visibility: ' + visibilityData;

    const windSpeedDiv: HTMLParagraphElement = document.createElement('p');
    windSpeedDiv.textContent = 'Wind Speed: ' + windData.speed + ' m/s';

    const windDirectionDiv: HTMLParagraphElement = document.createElement('p');
    windDirectionDiv.textContent = 'Wind Direction: ' + windData.deg + '°';

    const windGustDiv: HTMLParagraphElement = document.createElement('p');
    windGustDiv.textContent = 'Wind Gust: ' + windData.gust + ' m/s';

    const humidityDiv: HTMLParagraphElement = document.createElement('p');
    humidityDiv.textContent = 'Humidity: ' + humidityData;

    container.appendChild(visibilityDiv);
    container.appendChild(windSpeedDiv);
    container.appendChild(windDirectionDiv);
    container.appendChild(windGustDiv);
    container.appendChild(humidityDiv);
}
export function getForecast(latitude: string, longitude: string){
    
    const api: string = 'https://api.openweathermap.org/data/2.5/forecast?&units=metric'
    latitude = `&lat=${latitude}`;
    longitude = `&lon=${longitude}`;



    axios.get(api+latitude+longitude+apiKey)
    .then(response => {
        const forecasts:Forecast[] = response.data.list.slice(0, 12);
      
        const container: HTMLElement | null = document.querySelector('.forecast');
        if (!container) {
            console.error('Container not found');
            return;
        }
        container.innerHTML = '';
    
        forecasts.forEach(forecast => {
            const forecastTemp: number = forecast.main.temp;
            const forecastTime: string = forecast.dt_txt.slice(11, 16);
            const forecastIcon: string = forecast.weather[0].icon;

            const row: HTMLDivElement = document.createElement('div');
            row.className = 'forecast-row';

            const img: HTMLImageElement = document.createElement('img');
            img.src = `http://openweathermap.org/img/w/${forecastIcon}.png`;
            img.alt = 'Weather Icon';
            row.appendChild(img);

            const temp: HTMLDivElement = document.createElement('div');
            temp.innerHTML = forecastTemp.toString() + '°C';
            row.appendChild(temp);

            const time: HTMLDivElement = document.createElement('div');
            time.innerHTML = forecastTime;
            row.appendChild(time);

            container.appendChild(row);
        });
    })
    .catch(error => {
        console.error(error);
    });
}