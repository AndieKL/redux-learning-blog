import  { FETCH_POSTS, CREATE_POST, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_POSTS:
			//turn array into an object that uses the 'id' as the key
			return _.mapKeys(action.payload.data, 'id');
		case FETCH_POST:
			//add fetched post to existing state
			const post = action.payload.data;
			return { ...state, [post.id]:post };
		case DELETE_POST:
			//remove the deleted post from our current state
			return _.omit(state, action.payload);
		default:
			return state;
	}
}