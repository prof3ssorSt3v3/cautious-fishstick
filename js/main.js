import { NetworkError } from './errors.js';
import DATA from './datasource.js';

(() => {
  //page has loaded...
  addGlobalListeners();
  pageSpecificStuff();
})();

function addGlobalListeners() {
  //any listeners that are used on every page
}

function pageSpecificStuff() {
  let url = new URL(location.href);
  let page = url.pathname;
  let params = new URLSearchParams(url.search);
  if (page.endsWith('/') || page.endsWith('index.html')) {
    //home page
  } else if (page.endsWith('list.html')) {
    //list page
    // list.html?type=users || list.html?type=beers || list.html
    //fetch data, save it somewhere, and display it
    let type = params.has('type') ? params.get('type') : 'users';
    getData(type);
    //add click listener
    document.getElementById('list').addEventListener('click', navToDetails);
  } else if (page.endsWith('details.html')) {
    //details page
    // details.html?uid=abcd-1234-asdf
    //retrieve the data and display it
    let uid = params.has('uid') ? params.get('uid') : '';
    getDetails(uid);
  } else {
    //404???
  }
}

async function getData(type) {
  //fetch the appropriate kind of data
  let href = 'https://random-data-api.com/api/v2/' + type + '?size=6';
  let req = new Request(href, { method: 'GET' });
  fetch(req)
    .then((resp) => {
      if (!resp.ok) throw new NetworkError(req, resp);
      return resp.json();
    })
    .then((data) => {
      DATA.replaceAll(data); //save data for later
      let html = buildList(data);
      document.getElementById('list').innerHTML = html;
    })
    .catch((err) => {
      console.warn(err.name);
      console.warn(err.request);
      console.warn(err.response);
    });
}

function getDetails(uid) {
  //when the details page has loaded
  let item = DATA.readOne(uid);
  document.getElementById('details').innerText = JSON.stringify(item);
}

function buildList(data) {
  return data
    .map((item) => {
      return `<li class="card" data-ref="${item.uid}">
      <h2>${item.name || item.first_name + ' ' + item.last_name}</h2>
      <p>${item.brand || item.email}</p>
    </li>`;
    })
    .join('');
}

function navToDetails(ev) {
  let target = ev.target;
  let li = target.closest('.card');
  let uid = li.getAttribute('data-ref');
  location.assign(`./details.html?uid=${uid}`);
}
