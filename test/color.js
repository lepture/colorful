var color = require('../lib/color')
var should = require('should')

describe('Color', function() {
  it('should be supported', function() {
    should.exists(color.isSupported)
    color.isSupported.should.be.ok
  })
  it('should be red hello', function() {
    color.red('hello').should.equal('\x1b[31mhello\x1b[39m')
  })
  it('should be colorful string', function() {
    should.not.exists(String.prototype.to)
    color.colorful()
    should.exists(String.prototype.to)
  })
  it('should be underline red hello', function() {
    'hello'.to.underline.red.color.should.equal('\x1b[31m\x1b[4mhello\x1b[24m\x1b[39m')
    'hello'.to.underline.red.string.should.equal('hello')
  })
})
