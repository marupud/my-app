import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { GET_FILMS, GET_PEOPLE_LIST } from './actions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },  
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));  

const App = ({ loading, list, films, getTotalPeopleList, getFilms }) => {
  const classes = useStyles();
  const [filterText, setFilterText] = useState('');
  const [filmsList, setFilmsList] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState(null)
  const [filmSelect, setFilmSelect] = useState('')
  const [filmName, setFilmName] = useState('')
  const filteredList = list.filter(item =>
    ~item.name.toLowerCase().indexOf(filterText.toLowerCase())
  );
  useEffect(() => {
    getTotalPeopleList();
    getFilms()
  }, []);
  const handleChange = (val) => {
    setFilmSelect(val.currentTarget.innerText)
    const unique = filteredList.filter((item) => item.name == val.currentTarget.innerText);
    const filmsData = films.filter((value) => unique[0].films.find((ele) => ele == value.url));
    setFilmsList(filmsData)
  }
  const onFilmSelect = (e) => {
    setFilmName(e.target.value)
    const selectedFilms = films.filter((ele) => ele.title === e.target.value)
    setSelectedFilm(selectedFilms)

  }
  return (
    <div>
      {filteredList.length >0 &&
      <div>  

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value = {filmSelect}
          onChange={(e) => handleChange(e)}
        >
        {filteredList.map(item => (
          <MenuItem key={item.value} value={item.name}> {item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
        {/* <select onChange={handleChange} >
          {filteredList.map(item => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select> */}
      </div>
}
      {filmsList &&
        <div>

        <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="select-multiple-native">
              Films
            </InputLabel>
            <Select
              multiple
              native
              value={filmName}
              onChange={onFilmSelect}
            >
              {filmsList.map((item) => (
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
              ))}
            </Select>
        </FormControl>

          {/* <select onChange={onFilmSelect}  >
            {filmsList.map(item => (
              <option key={item.title} value={item.title}>
                {item.title}
              </option>
            ))}
          </select> */}
        </div>
      }

      <div>
        {selectedFilm && selectedFilm.map((val) =>
          <p>{val.title} - {val.release_date.split('-')[0]}</p>
        )

        }

      </div>
    </div>

  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    list: state.list,
    films: state.films
  }
};

const mapDispatchToProps = {
  getTotalPeopleList: GET_PEOPLE_LIST,
  getFilms: GET_FILMS
};

export { App };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
