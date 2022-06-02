import axios from '../../utils/axios';
import { herokuConfig } from '../../config';

let user = localStorage.getItem('user');
user = user === null ? '...' : user;
const _user = JSON.parse(user);

const LerPessoa = (idPessoa: string) => {
  return new Promise(async function (resolve, reject) {
    const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas&filter=id=${idPessoa}`;

    await axios
      .get(heroku)
      .then(({ data }: any) => {
        resolve({ pessoa: data.body.rows[0] });
      })
      .catch((error) => {
        console.log(2, error);
        reject(error);
      });
  });
};

export const adicionarPessoa = (info: any) => {
  return new Promise(async function (resolve, reject) {
    const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas`;
    axios
      .post(heroku, info)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

export const atualizarPessoa = (info: any, id: number) => {
  return new Promise(async function (resolve, reject) {
    const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas`;
    axios
      .put(heroku + '&id=' + id, info)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

export const apagarPessoa = (id: number) => {
  return new Promise(async function (resolve, reject) {
    const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas`;
    axios
      .delete(heroku + '&id=' + id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};

export default LerPessoa;
