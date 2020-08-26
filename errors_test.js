Feature('Errors')

Scenario('存在しないページにアクセスする場合、404ページを表示する', (I, login) =>{
  login('user')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/projects')
  I.see('ページが見つかりませんでした')
  I.click('ホームに戻る')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/')
  I.see('タスク一覧')
})
