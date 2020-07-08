import { FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../actions/DataActions';

const initialState = {
  data: [],
  isFetching: false,
  dataFetched: false,
  error: false,
};

export default function dataReducer(state = initialState, actions) {
  const payload = actions.payload;

  switch (actions.type) {
    case FETCH_DATA:
      return {
        ...state,
        isFetching: true,
        dataFetched: false,
        error: false,
      };
    case FETCH_DATA_SUCCESS:
      return {
        data: payload.data,
        isFetching: false,
        dataFetched: true,
        error: false,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        dataFetched: false,
        error: true,
      };
    default:
      return state;
  }
}
