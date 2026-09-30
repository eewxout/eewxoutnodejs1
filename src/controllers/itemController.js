const service = require('../services/itemService');

exports.getAll = (req, res) => {
  res.json(service.getAll(req.query));
};

exports.getById = (req, res) => {
  res.json(service.getById(Number(req.params.id)));
};

exports.create = (req, res) => {
  res.status(201).json(service.create(req.body));
};

exports.update = (req, res) => {
  res.json(service.update(Number(req.params.id), req.body));
};

exports.patch = (req, res) => {
  res.json(service.patch(Number(req.params.id), req.body));
};

exports.remove = (req, res) => {
  service.remove(Number(req.params.id));
  res.status(204).send();
};
