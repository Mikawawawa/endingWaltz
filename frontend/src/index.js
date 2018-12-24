import connector from './connect'

import {
  addForm,
  addTextView,
  setRoot,
  addSection,
  addButton,
  addText,
  addProcess,
  addAlert,
  addInfo,
  addMD5
} from './dom'
import { getValue, MD5Encode } from './encrypt'
import { totalmem } from 'os'
// require('bootstrap')

let root
let md5
async function main () {
  root = document.getElementById('root')
  setRoot(root.parentElement)

  connector.test()

  root.appendChild(addMD5('addMD5', () => {
    console.log('here')
    md5 = document.getElementById('input_MD5').value
    console.log(md5)
    connector.totalRequest()
  }))

  connector.router.push('total', (message) => {
    message = JSON.parse(message)
    root.appendChild(addMD5('addMD5'), () => {
      md5 = document.getElementById('input_MD5').value
      console.log(md5)
    })
    root.innerHTML = ''
    root.appendChild(addProcess(message.process, 3))

    initDom()
    connector.router.remove('push', 'total')
  })
}

function initDom () {
  root.appendChild(addSection('info', '美猴王X圣诞老人', '今年下半年开机'))
  root.appendChild(
    addSection(
      'sect_1',
      '文体开花',
      '首先欢迎各位来到第一关，在这里各位要做的第一件事情就是填满下面的小框框，然后点击提交答案，会发生神奇的事情哦（温馨提示：需要填入的字母要大写哦）',
      addText('请填写从卡片中读取到的五位密码'),
      addForm('lucky', 5),
      addText('下面是推文选择题中的答案'),
      addForm('multi', 3),
      addButton('提交答案', () => {
        let lucky = getValue('lucky').substr(0, 4)
        let multi = getValue('multi')
        let index = 1
        connector.luckyRequest(index.toString(), lucky, multi)
      })
    )
  )
}

window.onload = main
