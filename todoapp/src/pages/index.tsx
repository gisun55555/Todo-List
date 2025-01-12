import SearchLayout from '@/\bcomponents/search-layout';
import TodoContents from '@/\bcomponents/todo-contents';

export default function Home() {
  return (
    <div>
      <SearchLayout></SearchLayout>
      <TodoContents></TodoContents>
    </div>
  );
}
