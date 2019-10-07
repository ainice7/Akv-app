import * as axios from "axios";

import {
  ADD_NEW_INVOICE,
  SET_INVOICES,
  BASE_URL,
  CHANGE_INVOICE,
  DELETE_INVOICE
} from "../constance";
import { isLoading, loadingFail, redirect } from "./loading";

export const setInvoices = invoices => ({
  type: SET_INVOICES,
  payload: invoices
});

export const getInvoices = () => {
  return dispatch => {
    dispatch(isLoading(true));
    axios
      .get(BASE_URL)
      .then(({ data }) => {
        dispatch(redirect(false));
        dispatch(setInvoices(data));
        dispatch(isLoading(false));
      })
      .catch(error => {
        dispatch(loadingFail(true));
        console.error(error);
      });
  };
};

export const setNewInvoice = invoice => ({
  type: ADD_NEW_INVOICE,
  payload: invoice
});

export const addInvoice = invoice => {
  return dispatch => {
    dispatch(isLoading(true));
    axios
      .post(BASE_URL, invoice)
      .then(({ data }) => {
        dispatch(redirect(true));
        dispatch(setNewInvoice(data));
        // dispatch(redirect(false));
        dispatch(isLoading(false));
      })
      .catch(error => {
        dispatch(loadingFail(true));
        console.error(error);
      });
  };
};

export const deleteSomeInvoice = invoice => ({
  type: DELETE_INVOICE,
  payload: invoice
});

export const deleteInvoice = invoice => {
  return dispatch => {
    axios
      .delete(BASE_URL + invoice.id)
      .then(({ data }) => {
        dispatch(deleteSomeInvoice(invoice));
      })
      .catch(error => {
        debugger;
        dispatch(loadingFail(error.message));
        console.error(error);
      });
  };
};

export const changeSomeInvoice = invoice => ({
  type: CHANGE_INVOICE,
  payload: invoice
});

export const changeInvoice = invoice => {
  return dispatch => {
    dispatch(isLoading(true));
    axios
      .put(BASE_URL + invoice.id, invoice)
      .then(({ data }) => {
        dispatch(changeSomeInvoice(invoice));
        dispatch(redirect(true));
        dispatch(isLoading(false));
      })
      .catch(error => {
        dispatch(loadingFail(error.message));
        console.error(error);
      });
  };
};
