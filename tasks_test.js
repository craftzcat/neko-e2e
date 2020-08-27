Feature('Task')

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

Scenario('タスクを名前検索できるか', (I, login) =>{
  login('admin')
  I.fillField('form input[name=name]', 'task50')
  I.forceClick('検索')
  I.see('task50')
  I.dontSee('task49', '.task-status')
  I.dontSee('タスク', '.task-name')
})

Scenario('タスクをステータス検索できるか', (I, login) =>{
  login('admin')
  I.selectOption('form select[name=status]', '着手中')
  I.forceClick('検索')
  I.see('着手中', '.task-status')
  I.dontSee('未完了', '.task-status')
  I.dontSee('完了', '.task-status')
})

Scenario('タスクをステータスと名前で検索できるか', (I, login) =>{
  login('admin')
  I.fillField('form input[name=name]', 'task')
  I.selectOption('form select[name=status]', '完了')
  I.forceClick('検索')
  I.see('task41')
  I.see('完了')
  I.dontSee('タスク', '.task-name')
  I.dontSee('未完了', '.task-status')
  I.dontSee('着手中', '.task-status')
})

Scenario('タスクを作成できるか', (I, login) =>{
  login('admin')
  I.click('タスク作成')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/tasks/new')
  I.fillField('名前', 'タスク')
  I.click('登録する')
  I.waitUrlEquals('https://craftzcat-neko.herokuapp.com/tasks')
  I.see('タスク')
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
  I.click('タスク')
  I.see('タスク')
  I.see('説明：')
})

Scenario('タスクを編集できるか', (I, login) =>{
  login('admin')
  I.click('タスク')
  I.click('編集')
  I.fillField('説明', 'This task was edited')
  I.click('更新する')
  I.see('This task was edited')
})

Scenario('タスクを削除できるか', (I, login) =>{
  login('admin')
  I.click('タスク')
  I.click('削除')
  I.acceptPopup
})
