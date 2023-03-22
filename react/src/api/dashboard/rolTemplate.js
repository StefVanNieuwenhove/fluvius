/** @format */

import { axios } from '..';

export const getTemplateByRole = async (rol, type) => {
  const { data } = await axios.get(`templatebyrole/${rol}`);
  if (type === 'CATEGORIEEN') {
    return data.data.CATEGORIEEN;
  }
  return data.data.SDGS;
};

export const updateCatViewByRole = async (rol, categorieen) => {
  const { data } = await axios.put(`templatebyrole/cat/${rol}`, {
    categorieen,
  });
  return data;
};

export const updateSdgViewByRole = async (rol, sdgs) => {
  let method = 'put';
  let url = `templatebyrole/sdg/${rol}`;
  const template = await axios.put({
    method,
    url,
    data: { sdgs },
  });
  return template;
};
