Feature('Users')

Scenario('管理者が「ユーザー一覧」をクリックしてユーザー一覧に遷移できるか', (I, login) =>{
  login('admin')
  I.click('ユーザー一覧')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/admin/users')
  I.see('ユーザー一覧')
})

Scenario('一般ユーザーは「ユーザー一覧」をクリックしてユーザー一覧に遷移できない', (I, login) =>{
  login('user')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/admin/users')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/')
  I.see('管理者権限が必要です')
  I.see('タスク一覧')
})
