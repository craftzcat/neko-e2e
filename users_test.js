require('dotenv').config()

Feature('Users')

Scenario('管理者が「ユーザー一覧」をクリックしてユーザー一覧に遷移できるか', (I, login) =>{
  login('admin')
  I.click('ユーザー一覧')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/admin/users')
  I.see('ユーザー一覧', 'h2')
})

Scenario('一般ユーザーは「ユーザー一覧」をクリックしてユーザー一覧に遷移できない', (I, login) =>{
  login('user')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/admin/users')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/')
  I.see('タスク一覧', 'h2')
})

Scenario('名前を入力しないとユーザーを作成できない', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/admin/users/new')
  I.fillField('名前', '')
  I.fillField('メールアドレス', 'name@not.fill')
  I.fillField('パスワード', 'password')
  I.fillField('パスワード（確認用）', 'password')
  I.click('登録する')
  I.dontSee('ユーザー一覧', 'h2')
})

Scenario('名前が重複している場合、ユーザーを作成できない', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/admin/users/new')
  I.fillField('名前', 'general-user')
  I.fillField('メールアドレス', 'name@is.dupulicate')
  I.fillField('パスワード', 'password')
  I.fillField('パスワード（確認用）', 'password')
  I.click('登録する')
  I.dontSee('ユーザー一覧', 'h2')
})

Scenario('メールアドレスを入力しないとユーザーを作成できない', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/admin/users/new')
  I.fillField('名前', 'Email_not_filled')
  I.fillField('メールアドレス', '')
  I.fillField('パスワード', 'password')
  I.fillField('パスワード（確認用）', 'password')
  I.click('登録する')
  I.dontSee('ユーザー一覧', 'h2')
})

Scenario('メールアドレスが重複している場合、ユーザーを作成できない', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/admin/users/new')
  I.fillField('名前', 'user')
  I.fillField('メールアドレス', process.env.USER_EMAIL)
  I.fillField('パスワード', 'password')
  I.fillField('パスワード（確認用）', 'password')
  I.click('登録する')
  I.dontSee('ユーザー一覧', 'h2')
})

Scenario('パスワードを入力しないとユーザーを作成できない', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/admin/users/new')
  I.fillField('名前', 'Passwords_not_filles')
  I.fillField('メールアドレス', 'password@not.filled')
  I.fillField('パスワード', '')
  I.fillField('パスワード（確認用）', '')
  I.click('登録する')

  I.dontSee('ユーザー一覧', 'h2')
})

Scenario('名前を入力しないと更新できない', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/admin/users/1/edit')
  I.fillField('名前', '')
  I.fillField('パスワード', process.env.ADMIN_PASSWORD)
  I.fillField('パスワード（確認用）', process.env.ADMIN_PASSWORD)
  I.click('更新する')
  I.dontSee('ユーザー一覧', 'h2')
})

Scenario('メールアドレスを入力しないと更新できない', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/admin/users/1/edit')
  I.fillField('メールアドレス', '')
  I.fillField('パスワード', process.env.ADMIN_PASSWORD)
  I.fillField('パスワード（確認用）', process.env.ADMIN_PASSWORD)
  I.click('更新する')
  I.dontSee('ユーザー一覧', 'h2')
})

Scenario('パスワードを入力しないと更新できない', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/admin/users/1/edit')
  I.fillField('パスワード', '')
  I.fillField('パスワード（確認用）', '')
  I.click('更新する')
  I.dontSee('ユーザー一覧', 'h2')
})

Scenario('管理ユーザーが一人の場合、それを一般ユーザーに変更できない', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/admin/users/1/edit')
  I.selectOption('ロール', '一般ユーザー')
  I.fillField('パスワード', process.env.ADMIN_PASSWORD)
  I.fillField('パスワード（確認用）', process.env.ADMIN_PASSWORD)
  I.click('更新する')
  I.dontSee('ユーザー一覧', 'h2')
})
