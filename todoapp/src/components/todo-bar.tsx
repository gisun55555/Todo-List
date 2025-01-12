import Image from 'next/image';
import style from './todo-bar.module.css';

interface TodoBarProps {
  type: 'todo' | 'done';
  children: React.ReactNode;
}

export default function TodoBar({ type, children }: TodoBarProps) {
  const isTodo = type === 'todo';

  return (
    <div className={`${style.container} ${type === 'done' ? style.done : ''}`}>
      <div className={style.icon}>
        <Image
          src={
            type === 'todo'
              ? '/images/todo_circle_green.svg'
              : '/images/done_check_purple.svg'
          }
          alt={type === 'todo' ? 'Todo Icon' : 'Done Icon'}
          width={32}
          height={32}
        />
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
}
