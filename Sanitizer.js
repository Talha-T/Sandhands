const {sanitizePrimitive, primitives} = require('./primitive')
const sanitizeObject = require('./object')
const {validObject, validPrimitive} = require('./valid')

const standardMethods = {validObject, validPrimitive, sanitizeObject, sanitizePrimitive, valid: validObject, sanitize: sanitizeObject}

class Sanitizer {
  constructor() {
    this.interpretFormat = this.interpretFormat.bind(this)
    this.addFormat = this.addFormat.bind(this)
    this.customFormats = {}
    Object.entries(standardMethods).forEach(([prop, method]) => {
      this[prop] = (...args) => {
        if (args.length >= 2) args[1] = interpretFormat(args[1])
        return method(...args)
      }
    })
  }
  addFormat(name, value) {
    if (typeof name != 'string' || name.length < 1) throw new Error('Invalid Custom Format Name')
    if (!(primitives.includes(value) || (typeof value == 'object' && value !== null ))) throw new Error('Invalid Custom Format Value')
    this.customFormats[name] = value
  }
  interpretFormat(format) {
    if (typeof format == 'string') {
      if (this.customFormats.hasOwnProperty(format)) {
        format = this.customFormats[format]
      } else {
        throw new Error(`No Custom Format for "${format}"`)
      }
    } else if (typeof format == 'object' && object !== null && format.hasOwnProperty('_')) format._ = this.interpretFormat(format._)
    return format
  }
}

const allowedProps = Object.keys(standardMethods).concat(['addFormat'])

const proxyHandler = {
  get: (obj, prop) => {
  return allowedProps.includes(prop) ? obj : undefined
}, set: () => false,
  getPrototypeOf: ()=>Sanitizer.prototype,
  isExtensible: ()=>false,
  ownKeys: ()=>[...allowedProps],
  has: (target, prop)=>allowedProps.includes(prop),
  deleteProperty: ()=>false,
  setPrototypeOf: ()=>false
}

function createSanitizer() {
  return new Proxy(new Sanitizer(), proxyHandler)
}

module.exports = createSanitizer
