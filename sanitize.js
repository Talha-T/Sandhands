const sanitizeObject = require('./object')
const {sanitizePrimitive} = require('./primitive')
const flattenErrorsObject = require('./flattenErrorsObject')

function sanitize(...args) {
  const errors = flattenErrorsObject(sanitizeObject(...args))
  if (errors.length > 0) throw new Error(errors[0])
}

module.exports = valid
