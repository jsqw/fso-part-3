import axios from "axios";
const url = "http://localhost:3001/api/persons";

const getAll = () => {
  const req = axios.get(url);
  return req.then((response) => response);
};

const create = (newObject) => {
  const req = axios.post(url, newObject);
  return req.then((response) => response);
};

const update = (id, newObject) => {
  //return axios.put(`${url}/${id}`, newObject);
  const req = axios.put(`${url}/${id}`, newObject);
  return req.then((response) => response);
};

const delPerson = (id) => {
  //return axios.delete(`${url}/${id}`);
  const req = axios.delete(`${url}/${id}`);
  return req.then((response) => response);
};

// eslint-disable-next-line
export default { getAll, create, update, delPerson };
