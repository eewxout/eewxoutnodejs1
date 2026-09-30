const parts = require('./store');

let nextId = 1;

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function checkUniqueSerial(serialNumber, exceptId) {
  const duplicate = parts.find(
    (p) => p.serialNumber === serialNumber && p.id !== exceptId
  );
  if (duplicate) throw httpError(400, 'Запчасть с таким serialNumber уже существует');
}

function getAll(filter = {}) {
  if (filter.name) {
    return parts.filter((p) => p.name.toLowerCase().includes(filter.name.toLowerCase()));
  }
  return parts;
}

function getById(id) {
  const part = parts.find((p) => p.id === id);
  if (!part) throw httpError(404, 'Запчасть не найдена');
  return part;
}

function create(data) {
  checkUniqueSerial(data.serialNumber);
  const part = {
    id: nextId++,
    name: data.name,
    serialNumber: data.serialNumber,
    quantity: data.quantity,
  };
  parts.push(part);
  return part;
}

function update(id, data) {
  const part = getById(id);
  checkUniqueSerial(data.serialNumber, id);
  part.name = data.name;
  part.serialNumber = data.serialNumber;
  part.quantity = data.quantity;
  return part;
}

function patch(id, data) {
  const part = getById(id);
  if (data.serialNumber !== undefined) checkUniqueSerial(data.serialNumber, id);
  if (data.name !== undefined) part.name = data.name;
  if (data.serialNumber !== undefined) part.serialNumber = data.serialNumber;
  if (data.quantity !== undefined) part.quantity = data.quantity;
  return part;
}

function remove(id) {
  const part = getById(id);
  parts.splice(parts.indexOf(part), 1);
}

module.exports = { getAll, getById, create, update, patch, remove };
