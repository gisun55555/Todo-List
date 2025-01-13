import Image from 'next/image';
import style from './todo-bar.module.css';
import Link from 'next/link';

interface TodoBarProps {
  type: 'todo' | 'done';
  children: React.ReactNode;
  onIconClick: () => void;
  onClick: () => void;
  itemId: number;
}

export default function TodoBar({
  type,
  children,
  onIconClick,
  onClick,
  itemId,
}: TodoBarProps) {
  const isTodo = type === 'todo';
  console.log(itemId);

  return (
    <Link
      href={`/items/${itemId}`}
      className={`${style.container} ${type === 'done' ? style.done : ''}`}
      onClick={onClick}
    >
      <div
        className={style.icon}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onIconClick();
        }}
      >
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
    </Link>
  );
}
