import { GET_DATA, DELETE_DATA, ADD_DATA } from '../actions/types';
import axios from 'axios';
export const getData = () => dispatch => {
    axios.get('api/items')
        .then(res => {
            console.log(res.data)
            return dispatch({
                type: GET_DATA,
                payload: res.data
            })
        })

}
export const deleteData = (id) => dispatch => {
    axios.delete('api/items/' + id)
        .then(res => {
            return dispatch({
                type: DELETE_DATA,
                payload: id
            })
        })
}
export const addData = (name) => dispatch => {
    axios.post('api/items/?name=' + name)
        .then(res => {
            console.log(res.data);
            return dispatch({
                type: ADD_DATA,
                payload: {
                    name: res.data.name,
                    id: res.data._id,
                }
            })
        })
}