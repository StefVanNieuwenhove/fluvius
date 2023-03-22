/** @format */

import { axios } from '..';

export const getAll = async () => {
  const { data } = await axios.get('subsdg');
  return data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`subsdg/id/${id}`);
  return data;
};

export const getBySdg = async (sdg) => {
  const { data } = await axios.get(`subsdg/sdg/${sdg}`);
  return data;
};
