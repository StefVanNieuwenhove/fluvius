/** @format */

import { axios } from '..';

export const getAll = async () => {
  const { data } = await axios.get('mvodoelstelling/sub');
  return data;
};

export const getById = async (id) => {
  const { data } = await axios.get(`mvodoelstelling/subsdg/${id}`);
  return data;
};

export const getByMVO = async (mvo) => {
  const { data } = await axios.get(`mvodoelstelling/sub/mvo/${mvo}`);
  return data.data;
};
