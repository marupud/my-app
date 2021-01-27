import xhr from './xhr';
const BASEURL = 'https://swapi.dev/api/';

const getTotalPeopleList = () => xhr(`${BASEURL}people/`);

const getFilms =()=>xhr(`${BASEURL}films/`)

export { getTotalPeopleList, getFilms };
