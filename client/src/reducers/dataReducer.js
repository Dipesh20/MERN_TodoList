import { GET_DATA, DELETE_DATA, ADD_DATA } from '../actions/types';


const initialState = {
    items: [],
    loading: true,
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA:
            const data = action.payload;
            let newArr = [];
            data.forEach((element, index) => {
                newArr[index] = {
                    id: element._id,
                    name: element.name
                }
            });
            return {
                ...state,
                items: [
                    ...state.items,
                    ...newArr
                ],
                loading: false,
            }
        case ADD_DATA:
            let item = action.payload;
            return {
                ...state,
                items: [
                    ...state.items,
                    item,
                ]
            }
        case DELETE_DATA:
            let id = action.payload;
            let newArr2 = state.items.filter(item => (item.id !== id));
            return {
                ...state,
                items: newArr2,
            }
        default:
            return state;
    }
}