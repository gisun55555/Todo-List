import { Item } from '@/api/items';
import style from './todo-contents.module.css';
import Image from 'next/image';
import TodoBar from './todo-bar';

interface TodoContentsProps {
  todoItems: Item[];
  doneItems: Item[];
  toggleItemStatus: (itemId: number, currentStatus: boolean) => void;
}

export default function TodoContents({
  todoItems,
  doneItems,
  toggleItemStatus,
}: TodoContentsProps) {
  return (
    <div className={style.container}>
      {/* TO DO 영역 */}
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
          todoItems.map((item) => (
            <TodoBar
              key={item.id}
              type="todo"
              onClick={() => {}}
              onIconClick={() => toggleItemStatus(item.id, item.isCompleted)}
              itemId={item.id}
            >
              {item.name}
            </TodoBar>
          ))
        )}
      </div>

      {/* DONE 영역 */}
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
          </div>
        ) : (
          doneItems.map((item) => (
            <TodoBar
              key={item.id}
              type="done"
              onClick={() => {}}
              onIconClick={() => toggleItemStatus(item.id, item.isCompleted)}
              itemId={item.id}
            >
              <div>{item.name}</div>
            </TodoBar>
          ))
        )}
      </div>
    </div>
  );
}
