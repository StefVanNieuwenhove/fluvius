/** @format */

import { axios } from '..';

export const getAll = async () => {
  const { data } = await axios.get('mvodoelstelling');
  return data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`mvodoelstelling/${id}`);
  return data;
};

export const getBySubSDG = async (subSDG) => {
  const { data } = await axios.get(`mvodoelstelling/subsdg/${subSDG}`);
  return data.data;
};
