/** @format */

import { axios } from '..';

export const getTemplateById = async (id, type) => {
  const { data } = await axios.get(`templatebyuser/${id}`);
  if (type === 'CATEGORIEEN') {
    return data.data.CATEGORIEEN;
  }
  return data.data.SDGS;
};

/* export const updateCatViewById = async (id, categorieen) => {
  let method = "put";
  let url = `templatebyuser/cat/${id}`;
  const template = await axios.put({
    method,
    url,
    data: { categorieen },
  });
  return template;
}; */

export const updateCatViewById = async (id, categorieen) => {
  const { data } = await axios.put(`templatebyuser/cat/${id}`, { categorieen });
  return data;
};

export const updateSdgViewById = async (id, sdgs) => {
  let method = 'put';
  let url = `templatebyuser/sdg/${id}`;
  const template = await axios.put({
    method,
    url,
    data: { sdgs },
  });
  return template;
};
