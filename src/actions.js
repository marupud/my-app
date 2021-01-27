import { getTotalPeopleList, getFilms } from './service';

export function GET_PEOPLE_LIST() {
  return dispatch => {
    dispatch({ type: 'LOADING', value: true });
    return getTotalPeopleList().then(res => {
      dispatch({ type: 'LIST', value: res.results });
    });
  }
}
export function GET_FILMS(){

return  dispatch=>{
 dispatch({type: 'LOADING',value:true});
 return getFilms().then(res => {
  dispatch({ type: 'SET_FILMS', value: res.results });
});
}
}


