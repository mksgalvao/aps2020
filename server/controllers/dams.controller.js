const fetch = require('node-fetch');
const moment = require('moment');

const SABESP_API_URI =
  'http://mananciais.sabesp.com.br/api/Mananciais/ResumoSistemas';

module.exports.getDams = (req, res, next) => {
  const date = moment().format('YYYY-MM-DD');
  fetch(`${SABESP_API_URI}/${date}`)
    .then((sabespResp) => sabespResp.json())
    .then((sabespResp) => {
      const sistemas =
        sabespResp && sabespResp.ReturnObj && sabespResp.ReturnObj.sistemas;
      if (!sistemas || sistemas.length < 1) {
        res.status(404);
      } else {
        res.status(200).send(sistemas.map(toDam));
      }
    })
    .catch(next);
};

const toDam = (sistema) => {
  return {
    name: sistema.Nome,
    volume: sistema.VolumePorcentagem,
  };
};
