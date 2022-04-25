import axios from '../../utils/axios';
import { herokuConfig } from '../../config';

const  LerPessoa =  (idPessoa: string) => {
  return new Promise(async function (resolve, reject) {
  let user = localStorage.getItem('user');
  user = user === null ? '...' : user;
  console.log(user)
  //const _user = JSON.parse(user);

//  const heroku = `${herokuConfig}genericCRUD?id_usuario=${_user?.id}&token=${_user?.token}&table=pessoas&filter=id=${idPessoa}`;
 
  await axios
    .get(heroku)
    .then(({ data }: any) => {
      resolve ( {pessoa: data.body.rows[0]} ) 
    })
    .catch((error) => {
      console.log(2, error);
      reject (error);
    });
})};

export default LerPessoa