Feature('Labels')

Scenario('「ラベル一覧」をクリックしてラベル一覧に遷移できるか', (I, login) =>{
  login('admin')
  I.click('ラベル一覧')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/labels')
  I.see('ラベル一覧')
})
