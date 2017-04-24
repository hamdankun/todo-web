import axios from 'axios';

const initHttp = () => {
  let credentails = JSON.parse(localStorage.getItem('credentails'));
  return axios.create({
    baseURL: 'http://kunapi.esy.es/api/v1',
    headers: { 'Authorization': credentails.token }
  });
}

export const http = () => {
  return initHttp();
}

export const get = (url) => {
  return initHttp().get(url);
}

export const post = (url, payload) => {
  return initHttp().post(url, payload);
}

export const patch = (url, payload) => {
  return initHttp().patch(url, payload);
}

export const destroy = (url) => {
  return initHttp().delete(url);
}
