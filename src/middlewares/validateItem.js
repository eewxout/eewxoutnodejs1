const SERIAL_REGEX = /^[A-Za-z]{2}-\d{4}$/;

function check(body, requireAll) {
  if (!body || typeof body !== 'object') return 'Тело запроса должно быть JSON-объектом';

  const { name, serialNumber, quantity } = body;

  if (requireAll || name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) return 'name — обязательная непустая строка';
  }
  if (requireAll || serialNumber !== undefined) {
    if (typeof serialNumber !== 'string' || !SERIAL_REGEX.test(serialNumber)) {
      return 'serialNumber должен быть в формате XX-0000 (2 буквы, дефис, 4 цифры)';
    }
  }
  if (requireAll || quantity !== undefined) {
    if (!Number.isInteger(quantity) || quantity < 0) {
      return 'quantity — обязательное целое число >= 0';
    }
  }
  return null;
}

const make = (requireAll) => (req, res, next) => {
  const error = check(req.body, requireAll);
  if (error) return res.status(400).json({ error });
  next();
};

exports.validateFull = make(true); // POST, PUT
exports.validateItemial = make(false); // PATCH
