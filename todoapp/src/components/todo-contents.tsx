import { useState } from 'react';
import style from './todo-contents.module.css';
import Image from 'next/image';
import TodoBar from './todo-bar';

export default function TodoContents() {
  const [todoItems, setTodoItems] = useState([1, 2, 3]);
  const [doneItems, setDoneItems] = useState([]);

  return (
    <div className={style.container}>
      <div className={style.todoContainer}>
        <div className={style.header}>TO DO</div>
        {todoItems.length === 0 ? (
          <div className={style.emptyState}>
            <Image
              src="/images/todo_empty.svg"
              alt="empty image"
              width={240}
              height={240}
            />
            <p>
              할 일이 없어요.
              <br />
              TODO를 새롭게 추가해주세요!
            </p>
          </div>
        ) : (
          todoItems.map((item, index) => <TodoBar type="todo">{item}</TodoBar>)
        )}
      </div>
      <div className={style.doneContainer}>
        <div className={style.header}>DONE</div>
        {doneItems.length === 0 ? (
          <div className={style.emptyState}>
            <Image
              src="/images/done_empty.svg"
              alt="empty image"
              width={240}
              height={240}
            />
            <p>
              아직 다 한 일이 없어요.
              <br />
              해야 할 일을 체크해보세요!
            </p>
            =
          </div>
        ) : (
          todoItems.map((item, index) => <TodoBar type="done">{item}</TodoBar>)
        )}
      </div>
    </div>
  );
}
