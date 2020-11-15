const fetch = require('node-fetch');
const moment = require('moment');
const mongoose = require('mongoose');

const Dam = mongoose.model('Dam');

const SABESP_API_URI =
  'http://mananciais.sabesp.com.br/api/Mananciais/ResumoSistemas';

module.exports.getDams = (req, res, next) => {
  const date = moment().format('YYYY-MM-DD');
  Promise.all([
    fetch(`${SABESP_API_URI}/${date}`).then((sabespResp) => sabespResp.json()),
    Dam.find(),
  ])
    .then(([sabespResp, damsLocations]) => {
      const sistemas =
        sabespResp && sabespResp.ReturnObj && sabespResp.ReturnObj.sistemas;
      if (!sistemas || sistemas.length < 1) {
        res.status(404);
      } else {
        console.log('result', sabespResp, damsLocations);
        res.status(200).send(sistemas.map((s) => toDam(damsLocations, s)));
      }
    })
    .catch(next);
};

const getLocationById = (damsLocations, id) => {
  console.log('getbyid', damsLocations);
  const filtered = damsLocations.filter((item) => item._id === id);
  return filtered && filtered[0] && filtered[0].location;
};

const toDam = (damsLocations, sistema) => {
  const id = parseInt(sistema.SistemaId);
  return {
    id: id,
    name: sistema.Nome,
    volume:
      Math.round((sistema.VolumePorcentagem + Number.EPSILON) * 100) / 100,
    location: getLocationById(damsLocations, id),
  };
};
