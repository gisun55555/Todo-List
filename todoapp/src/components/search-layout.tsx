import { useState } from 'react';
import style from './search-layout.module.css';

export default function SearchLayout() {
  const [search, setSearch] = useState('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  //엔더누를시 api 요청 보내기
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
    }
  };
  return (
    <div className={style.container}>
      <input
        value={search}
        onKeyDown={onKeyDown}
        onChange={onChangeSearch}
        placeholder="할 일을 입력해주세요"
      />
      <button>+ 추가하기</button>
    </div>
  );
}
