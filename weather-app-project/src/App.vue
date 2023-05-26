<script lang="ts">
import { getLongLat} from './assets/get-longiyude-latitude'
import {initializeSearchHistory} from './assets/search-history'

export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  mounted() {
    window.addEventListener('load', () => {
      const arrayString: string | null = localStorage.getItem('myArray');
      const existingArray: string[] = arrayString ? JSON.parse(arrayString) : [];

      const latestSearch: string | undefined = existingArray[existingArray.length - 1];

      if (latestSearch) {
        getLongLat(latestSearch);
      }
      initializeSearchHistory();
    });
    
    const input: HTMLInputElement | null = document.querySelector('.search-field form input');
    if(!input){
      console.error('input not found')
      return;
    }
    let timeoutId: number | undefined;
    
    input.addEventListener('keydown', (event: KeyboardEvent) => {
      clearTimeout(timeoutId);
      
      if (event.key === 'Enter' && this.searchQuery !== '') {
        event.preventDefault();
        getLongLat(this.searchQuery);
        this.searchQuery = '';
      }
    });

    input.addEventListener('blur', () => {
      if (this.searchQuery !== '') {
        getLongLat(this.searchQuery);
        this.searchQuery = '';
        clearTimeout(timeoutId)
      }
    });

    input.addEventListener('input', () => {
      clearTimeout(timeoutId);
      
      if (this.searchQuery !== '') {
        timeoutId = setTimeout(() => {
          getLongLat(this.searchQuery);
          this.searchQuery = '';
        }, 2000);
      }
    });
  }
}
</script>
<template>
  <link rel="stylesheet" href="../src/app-style.css">
  <body>
    <header>
      <h1>The <br>Weather <br>App </h1>
      <img src="./assets/sun-waving-from-rightside.png" alt="waving-sun">
    </header>

    <section class="search-history">
  
    </section>

    <section class="search-field">
      <form>
        <input v-model="searchQuery" placeholder="Enter location here...">
      </form>
    </section>

    <section class="weather-information">
      <img class="weather-icon" id="main-icon" src="" alt="">
      <div class="temperature-celsius" id="main-temp"></div>
      <div class="weather-description"></div>
    </section>

    <section class="hourly-forecast">
      <h1>Hourly forecast</h1>
      <div class="forecast">
 
      </div>
    </section>
  </body>
</template>