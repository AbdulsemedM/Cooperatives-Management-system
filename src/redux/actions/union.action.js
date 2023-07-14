import UnionAndPCService from "../services/union.service";
import { actionTypes } from "../types";

export const getFederationData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const federationData = await UnionAndPCService.fetchFederation();
    dispatch({
      type: actionTypes.GET_FEDERATION,
      payload: federationData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_FEDERATION_ERROR,
      payload: error,
    });
  }
};
export const getUnionData = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const unionData = await UnionAndPCService.fetchUnion();
    dispatch({
      type: actionTypes.GET_UNION,
      payload: unionData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_UNION_ERROR,
      payload: error,
    });
  }
};

export const getPCData = (unionID) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.FETCH_START,
      payload: true,
    });
    const pcData = await UnionAndPCService.fetchPC(unionID);
    dispatch({
      type: actionTypes.GET_PC,
      payload: pcData,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PC_ERROR,
      payload: error,
    });
  }
};
// export const addUnionData = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: actionTypes.FETCH_START,
//       payload: true,
//     });
//     const unionData = await UnionAndPCService.createUnion();
//     console.log(unionData);
//     dispatch({
//       type: actionTypes.ADD_UNION,
//       payload: unionData,
//     });
//   } catch (error) {
//     dispatch({
//       type: actionTypes.GET_PC_ERROR,
//       payload: error,
//     });
//   }
// };
