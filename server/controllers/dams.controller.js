const fetch = require('node-fetch');
const moment = require('moment');
const { filter } = require('lodash');

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

const damsLocations = [
  {
    id: 0,
    name: 'Cantareira',
    location: {
      lat: -23.1566035,
      lng: -46.3984796,
    },
  },
  {
    id: 1,
    name: 'Alto Tietê',
    location: {
      lat: -23.4456417,
      lng: -46.3388959,
    },
  },
  {
    id: 2,
    name: 'Guarapiranga',
    location: {
      lat: -23.6878731,
      lng: -46.7244247,
    },
  },
  {
    id: 3,
    name: 'Cotia',
    location: {
      lat: -23.7112341,
      lng: -46.9700857,
    },
  },
  {
    id: 4,
    name: 'Rio Grande',
    location: {
      lat: -23.7631571,
      lng: -46.6366037,
    },
  },
  {
    id: 5,
    name: 'Rio Claro',
    location: {
      lat: -23.5572303,
      lng: -45.9311983,
    },
  },
  {
    id: 17,
    name: 'São Lourenço',
    location: {
      lat: -23.916974,
      lng: -47.2005764,
    },
  },
];

const getLocationById = (id) => {
  const filtered = damsLocations.filter((item) => item.id === id);
  return filtered && filtered[0] && filtered[0].location;
};

const toDam = (sistema) => {
  const id = parseInt(sistema.SistemaId);
  return {
    id: id,
    name: sistema.Nome,
    volume: sistema.VolumePorcentagem,
    location: getLocationById(id),
  };
};
