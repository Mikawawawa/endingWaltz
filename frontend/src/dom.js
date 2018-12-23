import _ from 'lodash'
import { format } from 'upath'

export function setRoot (element) {
  // let element = document.getElementById(id)
  // element.style.backgroundImage = 'url(src/bg.jpg)'
  element.style.margin = 'auto'
  element.className = 'container'
  element.style.position = 'relative'
  element.style.zIndex = 1000
  element.style.width = '100vw'
  element.style.padding = '5%'
  element.display = 'flex'

  return element
}

export function addSection (id, title, describe, ...childs) {
  let element = addTitle(title, describe)
  element.id = id
  // console.log(element.childNodes)

  childs.forEach(child => {
    element.childNodes[1].appendChild(child)
  })

  return element
}

export function setContainer (element) {
  element.style.width = '80vw'
  element.style.height = '80vw'
  element.style.padding = '5%'
  element.style.overflow = 'auto'
}

function addInput (id) {
  let element = document.createElement('input')
  element.type = 'text'
  element.id = id
  element.autofocus = false
  element.style.width = '70px'
  element.style.height = '70px'
  element.style.textAlign = 'center'
  return element
}

export function addForm (id, length) {
  let element = document.createElement('form')
  element.id = id
  element.className = 'form-group'
  for (let i = 0; i < length; i++) {
    element.appendChild(addInput(`${id}${i}`))
  }

  let key = 0
  // console.log(element.childNodes)
  element.childNodes.forEach((child) => {
    let index = ++key
    let length = child.parentElement.childElementCount
    child.addEventListener('keyup', function () {
      if (index === length) {
        // console.log('final')
        child.blur()
      } else {
        child.parentElement.childNodes[index].focus()
      }
    })
  })

  return element
}

export function addTitle (title, content = '') {
  let element = document.createElement('div')
  element.className = 'jumbotron box-shadow-2'
  element.innerHTML = `
  <div class="container">
    <h1 class="display-4">${title}</h1>
    <p class="lead">${content}</p>
  </div>`
  return element
}

export function addText (text = '') {
  let element = document.createElement('p')
  element.className = 'lead'
  element.innerText = text
  return element
}

export function addProcess (process, max = 100) {
  let element = document.createElement('div')
  element.className = 'progress'
  // console.log(process / max * 100)
  element.innerHTML = `<div class="progress-bar bg-danger" role="progressbar" style="width: ${parseInt(process / max * 100)}%" aria-valuenow="${process}" aria-valuemin="0" aria-valuemax="${max}">${parseInt(process / max * 100)}%</div>`
  return element
}

export function addAlert (position, type = 'success', text = '我就是个提示') {
  let element = document.createElement('div')
  element.className = (type === 'success') ? 'alert alert-success' : 'alert alert-danger'
  element.role = 'alert'
  element.style.margin = '1.5%'
  element.innerText = text
  element.innerHTML += `<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>`
  position.appendChild(element)
}

export function addTextView (text = '不可复制') {
  let element = document.createElement('input')
  element.type = 'text'
  element.className = 'form-control'
  element.name = 'bigtext'
  element.autofocus = false
  // element.style = 'height:200px;width:80%;'
  element.value = text
  element.readOnly = true
  document.oncontextmenu = function () {
    return false
  }
  element.onkeydown = function (event) {
    if (event.ctrlKey && window.event.keyCode == 67) {
      return false
    }
  }
  element.oncopy = function () {
    return false
  }
  element.onselectstart = function () {
    return false
  }
  element.ondragstart = function () {
    return false
  }

  element.onbeforecopy = function () {
    return false
  }
  element.onselect = 'document.selection.empty()'
  element.oncopy = 'document.selection.empty()'
  element.onmouseup = 'document.selection.empty()'
  return element
}

export function addButton (text, callback = (event) => {}) {
  let element = document.createElement('button')
  element.innerText = text
  element.className = 'btn btn-danger'
  element.addEventListener('click', callback)
  return element
}

export function addInfo (id = 'info_input', callback = () => {}) {
  let element = addTitle('提交个人信息', '恭喜你通过了考验，我们将及时联系你<br>每个通过考验的lucky code仅能提交一次<br>如提交信息有误请联系微信公众号')
  element.id = id
  element.innerHTML +=
`<div class="input-group mb-4">
  <input type="text" id="input_name" class="form-control" placeholder="姓名" aria-label="Username" aria-describedby="basic-addon1">
</div>
<div class="input-group mb-3">
  <input type="text" id="input_tele" class="form-control" placeholder="电话" aria-label="Username" aria-describedby="basic-addon1">
</div>`

  element.append(addButton('提交', callback))
  return element
}
