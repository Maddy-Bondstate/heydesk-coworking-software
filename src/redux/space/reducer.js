import {
  SPACE_GET_LOCATION_LIST,
  SPACE_GET_LOCATION_LIST_SUCCESS,
  SPACE_GET_LOCATION_LIST_ERROR,

  ADD_FLOOR,
  ADD_FLOOR_SUCCESS,
  ADD_FLOOR_ERROR,

  ADD_LOCATION,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,

  UPDATE_LOCATION,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_ERROR,

  SINGLE_SPACE,
  SINGLE_SPACE_SUCCESS,
  SINGLE_SPACE_ERROR,

  SINGLE_FLOOR,
  SINGLE_FLOOR_SUCCESS,
  SINGLE_FLOOR_ERROR,

} from '../actions';

const INIT_STATE = {
  location: null,
  add_floor : null,
  add_location : null,
  update_location:null,
  single_space:null,
  single_floor:null,
  loading: true,
  error : null,
  loading : true,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SPACE_GET_LOCATION_LIST:
      return { ...state, loading: true, error: '' };

    case SPACE_GET_LOCATION_LIST_SUCCESS:
      return { ...state, loading: false, location: action.payload };

    case SPACE_GET_LOCATION_LIST_ERROR:
      return { ...state, loading: false, error: action.payload.message };

    /* Add floor - Starts */  
    case ADD_FLOOR:
      return { ...state, loading:true, error: ''};
      
    case ADD_FLOOR_SUCCESS:
      return { ...state, loading:false, add_floor : action.payload }
      
    case ADD_FLOOR_ERROR:
      return { ...state, loading: false, error: action.payload.message}

    /* Add floor - Ends */

    /* Add location - Start */
    case ADD_LOCATION:
      return { ...state, loading:true, error: '' };
      
    case ADD_LOCATION_SUCCESS:  
      return { ...state, loading:false, add_location: action.payload }

    case ADD_LOCATION_ERROR:
      return { ...state, loading: false, error: action.payload.message} 

    /* Add location - Ends */

    /* Update location - Starts */

    case UPDATE_LOCATION:
      return { ...state, loading:true, error: '' };
      
    case UPDATE_LOCATION_SUCCESS:  
      return { ...state, loading:false, update_location: action.payload }

    case UPDATE_LOCATION_ERROR:
      return { ...state, loading: false, error: action.payload.message} 

    /* Update Location - Ends */

    /* Single space details - Start */
    case SINGLE_SPACE:
      return { ...state, loading:true, error: '' };
      
    case SINGLE_SPACE_SUCCESS:  
      return { ...state, loading:false, single_space: action.payload }

    case SINGLE_SPACE_ERROR:
      return { ...state, loading: false, error: action.payload.message} 

    /* Single space details - Ends */

    /* Single Floor details - Start */
    case SINGLE_FLOOR:
      return { ...state, loading:true, error: '' };
      
    case SINGLE_FLOOR_SUCCESS:  
      return { ...state, loading:false, single_floor: action.payload }

    case SINGLE_FLOOR_ERROR:
      return { ...state, loading: false, error: action.payload.message} 

    /* Single Floor details - Ends */


    default:
      return { ...state };
  }
};

export default reducer;
