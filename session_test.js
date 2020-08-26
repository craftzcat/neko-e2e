Feature('Session')

Scenario('ログインできるかどうか', (I, login) =>{
  login('user')
  I.see('ログインしました')
})

Scenario('ログアウトできるか', (I, login) =>{
  login('admin')
  I.click('ログアウト')
  I.see('ログアウトしました')
})

Scenario('間違った情報の入力時、ログアウトに失敗するかどうか', (I) =>{
  I.amOnPage('https://craftzcat-neko.herokuapp.com/login')
  I.fillField('Email', 'ThisIsWrong@Email.com')
  I.fillField('Password', 'ThisPasswordIsIncorrect')
  I.click('ログイン')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/login')
  I.see('ログインに失敗しました')
})
