const service = require('./services/itemService');

const N = 0; 

function seed() {
  for (let i = 1; i <= N; i++) {
    service.create({
      name: `Запчасть ${i}`,
      serialNumber: `AB-${String(i).padStart(4, '0')}`,
      quantity: i * 10,
    });
  }
}

module.exports = seed;
