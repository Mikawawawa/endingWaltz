import MRouter from './mqtt/router'
import { MD5Encode, RSAEncode, getValue } from './encrypt'
import connect from 'mqtt'
import { addInfo, addSection, addTextView, addText, addAlert, addButton, addForm } from './dom'
const client = connect('ws://101.132.116.211:1884')
let id

client.on('connect', function () {
  // console.log('okkkkkkkk')
  console.log('SERVER', 'LINK START AT', new Date().toString(), 'WITH ID', client.options.clientId)
  client.subscribe('push/#')
  client.subscribe('test')

  router.push(`luckycheck${id}`, async message => {
    message = JSON.parse(message)
    // console.log(message)
    if (message.status) {
      let root = document.getElementById('root')
      // root.appendChild(addProcess(2, 3))
      root.appendChild(
        addSection(
          'sect_2',
          '六学六学',
          '恭喜各位通过了第一关，来到这里。在这一关中，你需要从下面的题目中找到问题的答案，并且在下面的小框框中输入你寻找到的答案，点击提交答案。然后就可以结束掉这段有趣的旅程了。最后就是激动人心的抽奖环节了。在所有解出答案的小伙伴中，我们会随机抽取一位幸运群友，领取我们的终极大奖。（温馨提示：需要填入字母的地方要大写哦）',
          addTextView(message.info),
          addText('小场面，你能找到答案的'),
          addForm('ordinary', 6),
          addButton('提交答案', () => {
            let ordinary = getValue('ordinary')

            ordinaryRequest(ordinary)
          })
        )
      )
    } else {
      addAlert(document.getElementById('sect_1'), '', '提交错误')
    }
  })

  router.push(`ordinarycheck${id}`, async message => {
    message = JSON.parse(message)
    if (message.status === false) {
      addAlert(document.getElementById('sect_2'), 'danger', message.info)
    } else {
      addAlert(document.getElementById('sect_2'), 'success', '通过了')
      let root = document.getElementById('root')
      root.appendChild(addInfo(document.getElementById('info_input'), () => {
        let lucky = getValue('lucky').substr(0, 4)
        let name = document.getElementById('input_name').value
        let tele = document.getElementById('input_tele').value
        submitRequest(lucky, name, tele)
        addAlert(document.getElementById('root'), 'success', '提交成功，我们会尽快联系你')
      }))
    }
  })
})

function luckyRequest (index, lucky, choice) {
  client.publish(
    `request/lucky_check${index}`,
    RSAEncode(
      JSON.stringify({
        id,
        lucky,
        choice
      })
    )
  )
}

function ordinaryRequest (answer) {
  client.publish(
    'request/ordinary_check',
    RSAEncode(
      JSON.stringify({
        id,
        answer
      })
    )
  )
}

function totalRequest () {
  client.publish('request/total', '')
}

function submitRequest (lucky, name, tele) {
  // console.log(JSON.stringify({ lucky, name, tele }))
  client.publish('request/submit', RSAEncode(JSON.stringify({ lucky, name, tele })))
}

function test () {
  client.publish(
    'test',
    JSON.stringify({
      message: 'INIT OK'
    })
  )
}

const router = new MRouter()

client.on('message', (topic, message) => {
  // console.log(router)
  router.handler(topic, message)
})

export default {
  luckyRequest,
  ordinaryRequest,
  submitRequest,
  totalRequest,
  test,
  router,
  id: client.options.id
}
