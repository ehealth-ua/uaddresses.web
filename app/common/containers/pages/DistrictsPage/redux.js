import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromDistricts from 'redux/districts';

export const getDistricts = createAction('districtsPage/GET_REGIONS');
export const pagingDistricts = createAction('districtsPage/ADD_PAGING');

export const fetchDistricts = options => dispatch =>
  Object.keys(options).length && dispatch(fromDistricts.fetchDistricts(options))
    .then((action) => {
      if (action.error) return action;

      dispatch(getDistricts(action.payload.result));
      dispatch(pagingDistricts(action.meta));

      return action;
    });

const districts = handleAction(getDistricts, (state, action) => action.payload, []);
const paging = handleAction(pagingDistricts, (state, action) => action.payload, {});

export default combineReducers({
  districts,
  paging,
});
