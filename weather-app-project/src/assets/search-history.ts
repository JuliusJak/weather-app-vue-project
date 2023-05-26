import { getLongLat } from "./get-longiyude-latitude";

export function createSearchHistoryButton(name: string) {
    const searchHistorySection: HTMLElement | null = document.querySelector('.search-history');
    if(!searchHistorySection){
      console.error('searchHistorySection not found')
      return;
    }
    const buttons: HTMLCollectionOf<HTMLButtonElement>  = searchHistorySection.getElementsByTagName('button');


    if (buttons.length >= 3) {
      searchHistorySection.removeChild(buttons[0]);
    }
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = name;
    button.classList.add('search-history-button');
    button.style.opacity = '0';
    
    button.addEventListener('click', () => {
      getLongLat(name);
    });
    
    searchHistorySection.appendChild(button);

    button.getBoundingClientRect();

    button.style.opacity = '1';
}

export function updateSearchHistory(query: string) {
    const arrayString: string | null = localStorage.getItem('myArray');

    let existingArray: string[] = arrayString ? JSON.parse(arrayString) : [];

    const matchingIndex: number = existingArray.findIndex((search: string) => search === query);


    if (matchingIndex !== -1) {
      existingArray.splice(matchingIndex, 1);
    }

    existingArray.push(query);

    if (existingArray.length > 3) {
        existingArray = existingArray.slice(1);
    }
    const updatedArrayString: string = JSON.stringify(existingArray);
  
    localStorage.setItem('myArray', updatedArrayString);
    initializeSearchHistory();
}

export function initializeSearchHistory(){
    const arrayString: string | null = localStorage.getItem('myArray');
    const existingArray: string[] = arrayString ? JSON.parse(arrayString) : [];

    const latestStrings: string[] = existingArray.slice(-3);

    latestStrings.forEach((string: string) => {
        createSearchHistoryButton(string);
    });
}