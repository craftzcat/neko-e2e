Feature('Session')

Scenario('ログインできるかどうか', (I, login) =>{
  login('user')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/')
  I.see('タスク一覧')
})

Scenario('ログイン状態でログインページに行くとrootページにリダイレクトする', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/login')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/')
  I.see('タスク一覧')
})

Scenario('間違った情報の入力時、ログインに失敗するかどうか', (I) =>{
  I.amOnPage('https://craftzcat-neko.herokuapp.com/login')
  I.fillField('Email', 'ThisIsWrong@Email.com')
  I.fillField('Password', 'ThisPasswordIsIncorrect')
  I.click('ログイン')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/login')
  I.see('ログインに失敗しました')
})
