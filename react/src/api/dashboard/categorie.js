/** @format */

import { axios } from '..';

export const getAll = async () => {
  const { data } = await axios.get('categorie');
  return data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`categorie/id/${id}`);
  return data;
};

export const getByName = async (naam) => {
  const { data } = await axios.get(`categorie/id/${naam}`);
  return data;
};
