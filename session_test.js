const { dataTable } = require("codeceptjs")

Feature('Session')

let pathes = new DataTable(['path', 'title'])
pathes.add(['/tasks', 'タスク一覧'] )
pathes.add(['/labels', 'ラベル一覧'])
pathes.add(['/admin/users', 'ユーザー一覧'])

Data(pathes).Scenario('ログインせずには管理画面にアクセスできない', (I, current) => {
  I.amOnPage('https://craftzcat-neko.herokuapp.com' + current.path)
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/login')
  I.dontSee(current.title)
})

Scenario('ログインできるかどうか', (I, login) =>{
  login('user')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/')
  I.see('タスク一覧')
})

Scenario('ログアウトできるかどうか', (I, login) =>{
  login('user')
  I.forceClick('ログアウト', '.logout')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/login')
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
