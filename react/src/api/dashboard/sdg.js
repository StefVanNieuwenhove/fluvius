/** @format */

import { axios } from '..';

export const getAll = async () => {
  const { data } = await axios.get('sdg');
  return data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`sdg/id/${id}`);
  return data;
};

export const getByName = async (naam) => {
  const { data } = await axios.get(`sdg/${naam}`);
  return data;
};

export const getByCat = async (cat) => {
  const { data } = await axios.get(`sdg/cat/${cat}`);
  return data;
};
