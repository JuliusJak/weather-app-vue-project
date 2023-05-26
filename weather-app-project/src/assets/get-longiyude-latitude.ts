import axios from "axios";
import {createSearchHistoryButton} from './search-history';
import {updateSearchHistory} from './search-history';
import { getWeather } from "./weather";
import { getForecast } from "./weather";
const apiKey: string = '&appid=f24f5e9709bc77a5de811683e7de8f19'

export function getLongLat(destination: string) {
    const api: string = 'http://api.openweathermap.org/geo/1.0/direct?';

    const location: string = `&q=${destination}`;
    axios.get(api+apiKey+location)
    .then(response => {
        const { lon, lat, name } = response.data[0];
        //console.log('Latitude:', lat);
        //console.log('Longitude:', lon);
        //console.log('city:', name);
        createSearchHistoryButton(name);
        updateSearchHistory(name);

        getWeather(lat,lon);
        getForecast(lat,lon);
    })
    .catch(error => {
        console.error(error);
    });
} 