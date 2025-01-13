import Image from 'next/image';
import style from './detail-todo-bar.module.css';

interface TodoBarProps {
  isCompleted: true | false;
  children: React.ReactNode;
}

export default function DetailTodoBar({ children, isCompleted }: TodoBarProps) {
  return (
    <div
      className={`${style.container} ${isCompleted === true ? style.true : ''}`}
    >
      <Image
        src={
          isCompleted === true
            ? '/images/done_check_purple.svg'
            : '/images/todo_circle_green.svg'
        }
        alt={isCompleted === true ? 'Todo Icon' : 'Done Icon'}
        width={32}
        height={32}
      />
      <div>{children}</div>
    </div>
  );
}
