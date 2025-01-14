import Image from 'next/image';
import style from './detail-todo-bar.module.css';

interface TodoBarProps {
  isCompleted: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export default function DetailTodoBar({
  children,
  isCompleted,
  onClick,
}: TodoBarProps) {
  return (
    <div
      className={`${style.container} ${isCompleted ? style.true : ''}`}
      onClick={onClick}
    >
      <Image
        src={
          isCompleted
            ? '/images/done_check_purple.svg'
            : '/images/todo_circle_green.svg'
        }
        alt={isCompleted ? 'Done Icon' : 'Todo Icon'}
        width={32}
        height={32}
      />
      <div>{children}</div>
    </div>
  );
}
