/** @format */

import { axios } from '..';

export const createReport = async ({ datasource, msg }) => {
  const { data } = await axios.post('rapportds/', { datasource, msg });
  return data;
};

export const getAll = async () => {
  const { data } = await axios.get('rapportds/');
  return data;
};

export const deleteReport = async (id) => {
  await axios.delete(`rapportds/${id}`);
};
