import { useEffect, useState } from 'react';
import SearchLayout from '@/\bcomponents/search-layout';
import TodoContents from '@/\bcomponents/todo-contents';
import { getItems, createItem, updateItem, Item } from '@/api/items';

export default function Home() {
  const [todoItems, setTodoItems] = useState<Item[]>([]);
  const [doneItems, setDoneItems] = useState<Item[]>([]);
  const tenantId = 'example55555';

  // 아이템을 가져오기
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getItems(tenantId);

        const todos = items.filter((item) => !item.isCompleted);
        const dones = items.filter((item) => item.isCompleted);

        setTodoItems(todos);
        setDoneItems(dones);
      } catch (error) {
        console.error('아이템 목록을 가져오는 데 실패했습니다', error);
      }
    };

    fetchItems();
  }, [tenantId]);

  // 할 일 추가 처리
  const handleAddItem = async (name: string) => {
    try {
      const newItem = await createItem(tenantId, name);
      setTodoItems([...todoItems, newItem]);
    } catch (error) {
      console.error('추가실패', error);
    }
  };

  // 할 일 완료 상태 토글 처리
  const toggleItemStatus = async (itemId: number, currentStatus: boolean) => {
    try {
      const updatedItem = await updateItem(tenantId, itemId, {
        isCompleted: !currentStatus,
      });

      setTodoItems((prevTodoItems) => {
        const updatedTodoItems = prevTodoItems.filter(
          (item) => item.id !== itemId,
        );
        if (!updatedItem.isCompleted) {
          return [...updatedTodoItems, updatedItem];
        }
        return updatedTodoItems;
      });

      setDoneItems((prevDoneItems) => {
        const updatedDoneItems = prevDoneItems.filter(
          (item) => item.id !== itemId,
        );
        if (updatedItem.isCompleted) {
          return [...updatedDoneItems, updatedItem];
        }
        return updatedDoneItems;
      });
    } catch (error) {
      console.error('투두 항목 상태 변경 실패:', error);
    }
  };

  return (
    <div>
      <SearchLayout onAddItem={handleAddItem} />
      <TodoContents
        todoItems={todoItems}
        doneItems={doneItems}
        toggleItemStatus={toggleItemStatus}
      />
    </div>
  );
}
