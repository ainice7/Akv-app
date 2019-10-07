export const ADD_NEW_INVOICE = 'ADD_NEW_INVOICE';
export const SET_INVOICES = 'SET_INVOICES';
export const CHANGE_INVOICE = 'CHANGE_INVOICE';
export const DELETE_INVOICE = 'DELETE_INVOICE';
export const BASE_URL = 'http://localhost:3000/invoices/';
export const IS_LOADING = 'IS_LOADING';
export const LOADING_FAIL = 'LOADING_FAIL';
export const REDIRECT = 'REDIRECT';
export const formatDate = (date) => {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    var yy = date.getFullYear();
  
    return dd + '-' + mm + '-' + yy;
}