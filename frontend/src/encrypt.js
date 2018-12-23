import JSEncrypt from 'jsencrypt'
const MD5 = require('js-md5')

export function RSAEncode (text) {
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(`MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvGxnz84hKI2D4VqAxr6elUH7RmFZxiqrF9UFWrecAsIQbihovwr8GklMfyQ6v0VWROPWMHyDjxse9EBiKxW0R1+iU2EEN9+OJYS+J64kyZjBvlSaPyIY3+Mpun2VFKc4KrUKyWZQiAg/A5a7cHDSZRqrp6Qaba3vgnswpAhWNsDfroRTkijttRJTpdY/O2soNkK4TJ6hE1plpbeZ+V22Wf9jFhFRIviLXZqCJIL62F0Md6u5JhL2mWqcjB/4BWXtGDakSGgNG0TIthuk4NtYvqRd3SBPU8HNbZbG+HnQ9VhjWQLkEwgY3R9ZsgSQ1LKhxKc6D5D7tatt4vYJqr0f+kdheaNr6PzDi/ooXvoBRnCZb4zzGCDOREt9P79hU5WGQ7rVHIStNq4DR10oUVDKR5OGXk3WKdTUTatXd+SVqXYdKjQzsXDKIM5cSVTsFRTz45Hz7qp8BFA5cK53C7e8WyknShYqLPrXpWces7Mjl/INdEuXGhc1S5D2Lyw03vula4wR6IWDF0MDhP1oUnujf3QsRR7EOzwxmBrxgk6VwAOplUwn8WRGZurAnkNBW3f5LzwXXV9gLBS3FIHyfME9QHoJcFJ9SfArYmwjOoSiI7mk89nAgF7qoz2MmESURqYQiELKju1hx7pdkUqRaxNaBJKMWF+TO63YHPIL34MEbrkCAwEAAQ==`)
  var encrypted = encrypt.encrypt(text)
  return encrypted
}

export function MD5Encode (test) {
  let hmd = MD5.hex(test)
  return hmd
}

export function getValue (id) {
  let element = document.getElementById(id)
  let result = ''
  element.childNodes.forEach((child) => {
    result += child.value
  })
  return result
}
