import axios from 'axios';
import {FETCH_USER} from './types';
//export const FETCH_USER ='fetch_user';


export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
//res near the payload is the output of axios's ajax request output from the backend

export const handleToken = (token) => async dispatch =>{
const res = await axios.post('/api/stripe',token);

dispatch({type:FETCH_USER,payload:res.data});
};






// export const fetchUser =()=>{
//     return function (dispatch){
//         axios.get('/api/current_user')
//         .then(res=>dispatch({type:FETCH_USER,payload:res}));
//     };
// }; METHOD 1