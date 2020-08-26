Feature('Task')

const taskName = Math.random().toString(32).substring(2)
const editedDesc = Math.random().toString(5).substring(2)

Scenario('タイトルをクリックしてタスク一覧に遷移か', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/labels')
  I.click('Neko')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/')
})

Scenario('「タスク一覧」をクリックしてタスク一覧に遷移するか', (I, login) =>{
  login('admin')
  I.amOnPage('https://craftzcat-neko.herokuapp.com/labels')
  I.click('タスク一覧')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/tasks')
})

Scenario('タスクを作成できるか', (I, login) =>{
  login('admin')
  I.click('タスク作成')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/tasks/new')
  I.fillField('名前', taskName)
  I.click('登録する')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/tasks')
  I.see(taskName)
})

Scenario('タスクに名前がない場合、作成に失敗するか', (I, login) =>{
  login('admin')
  I.click('タスク作成')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/tasks/new')
  I.fillField('名前', '')
  I.click('登録する')
  I.see('タスクの作成に失敗しました')
  I.see('タスク作成')
})

Scenario('タスクの詳細ページにアクセスできるか', (I, login) =>{
  login('admin')
  I.click('task49')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/tasks/50')
  I.see('task49')
})

Scenario('タスクを編集できるか', (I, login) =>{
  login('admin')
  I.click('task50')
  I.click('編集')
  I.fillField('説明', editedDesc)
  I.click('更新する')
  I.see(editedDesc)
})

Scenario('タスクを削除できるか', (I, login) =>{
  login('admin')
  I.click(taskName)
  I.click('削除')
  I.acceptPopup
})
