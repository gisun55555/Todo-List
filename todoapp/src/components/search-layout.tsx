import { useState } from 'react';
import style from './search-layout.module.css';

interface SearchLayoutProps {
  onAddItem: (name: string) => void;
}

export default function SearchLayout({ onAddItem }: SearchLayoutProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAddItem(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="새로운 할 일을 입력하세요"
      />
      <button onClick={handleAdd}>추가</button>
    </div>
  );
}
