/** @format */

import { axios } from '.';

export const getGebruikerByID = async (id) => {
  const { data } = await axios.get(`gebruiker/id/${id}`);
  return data;
};

export const login = async ({ naam, wachtwoord }) => {
  const { data } = await axios.post('gebruiker/login', {
    naam,
    wachtwoord,
  });
  return data;
};
