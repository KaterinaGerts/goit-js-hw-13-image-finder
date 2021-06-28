const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22269810-55457156398dac84727ab5964';
const options = {
  headers: {
    Authorization: KEY,
  },
};
const perPage = '12';
const page = 1;

function fetchImages(searchImages, options) {
  return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchImages}&page=${page}&per_page=${perPage}&key=${KEY}`)
  .then(response => {
    if(response.ok) {
    return response.json(); 
    }console.log(response.status);    
    incrementPage();
  })
}

function incrementPage() {
  return page += 1;
}

function resetPage() {
  return page = 1;
}

export default fetchImages;

