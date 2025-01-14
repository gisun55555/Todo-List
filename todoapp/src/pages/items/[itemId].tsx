import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import style from './[itemId].module.css';
import {
  uploadImage,
  getItemDetails,
  updateItemDetails,
  deleteItem,
  updateItem,
} from '@/api/items';
import DetailTodoBar from '@/\bcomponents/detail-todo-bar';

interface Item {
  name: string;
  description?: string;
  imageUrl?: string;
  memo?: string;
  isCompleted?: boolean;
}

export default function ItemId() {
  const router = useRouter();
  const { itemId } = router.query;
  const tenantId = 'example55555';

  const [imageUrl, setImageUrl] = useState<string>('');
  const [itemDetails, setItemDetails] = useState<Item>({
    name: '',
    description: '',
    imageUrl: '',
    memo: '',
    isCompleted: false,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [memo, setMemo] = useState<string | null>(null);
  const [title, setTitle] = useState<string>(''); // 제목을 위한 상태 추가

  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value); // 제목 변경
  };

  useEffect(() => {
    if (!itemId || isNaN(Number(itemId))) {
      console.log('유효하지 않은 itemId');
      return;
    }

    const fetchItemDetails = async () => {
      try {
        const response = await getItemDetails(tenantId, Number(itemId));
        setItemDetails(response);
        if (response.imageUrl) {
          setImageUrl(response.imageUrl);
        }
        setTitle(response.name); // 제목을 상태로 설정
      } catch (error) {
        console.error('항목 상세 조회 실패:', error);
      }
    };

    fetchItemDetails();
  }, [itemId]);

  useEffect(() => {
    if (itemDetails && itemDetails.memo) {
      setMemo(itemDetails.memo);
    }
  }, [itemDetails]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];

    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    setSelectedImage(file);

    try {
      const uploadedImageUrl = await uploadImage(tenantId, file);
      setImageUrl(uploadedImageUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    }
  };

  const handleUpdateItem = async () => {
    if (!itemId || !itemDetails) return;

    if (!imageUrl || !memo || !title) {
      alert('제목, 이미지, 메모를 모두 입력해주세요.');
      return;
    }

    const updatedItem = {
      name: title, // 수정된 제목을 포함
      memo: memo,
      imageUrl: imageUrl,
      isCompleted: itemDetails.isCompleted ?? false,
    };

    try {
      await updateItemDetails(tenantId, Number(itemId), updatedItem);
      alert('항목 수정이 완료되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('항목 수정 실패:', error);
      alert('항목 수정에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDeleteItem = async () => {
    if (!itemId) return;

    try {
      await deleteItem(tenantId, Number(itemId));
      alert('항목이 삭제되었습니다.');
      router.push('/');
    } catch (error) {
      console.error('항목 삭제 실패:', error);
    }
  };

  const toggleCompletionStatus = async () => {
    const updatedStatus = !itemDetails.isCompleted;

    setItemDetails((prev) => ({ ...prev, isCompleted: updatedStatus }));

    try {
      await updateItem(tenantId, Number(itemId), {
        isCompleted: updatedStatus,
      });
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  return (
    <div className={style.container}>
      <DetailTodoBar
        isCompleted={itemDetails.isCompleted ?? false}
        onClick={toggleCompletionStatus}
      >
        <input
          type="text"
          value={title}
          onChange={handleTitleChange} // 제목 수정
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          style={{
            all: 'unset',
            border: 'none',
            outline: 'none',
            background: 'transparent',
          }}
        />
      </DetailTodoBar>
      <div
        className={`${style.imageContainer} ${imageUrl ? style.hasImage : ''}`}
      >
        {imageUrl ? (
          <Image
            layout="fill"
            src={imageUrl}
            alt="Uploaded Image"
            className={style.uploadedImage}
          />
        ) : (
          <Image
            src="/images/image_blink.svg"
            alt="Uploaded Image"
            width={64}
            height={64}
            className={style.image}
          />
        )}

        <div className={style.uploadButtonWrapper}>
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <label htmlFor="imageUpload" className={style.uploadButton}>
            <Image
              src="/images/image_plus.svg"
              alt="Uploaded Image"
              width={64}
              height={64}
              className={style.image}
            />
          </label>
        </div>
      </div>
      <div className={style.momoCotainer}>
        <div className={style.momoHead}>Memo</div>
        <textarea
          className={style.momoContent}
          value={memo || ''}
          onChange={handleMemoChange}
        />
      </div>
      <div className={style.buttonContainer}>
        <button onClick={handleUpdateItem} className={style.updateButton}>
          수정
        </button>
        <button onClick={handleDeleteItem} className={style.deleteButton}>
          삭제
        </button>
      </div>
    </div>
  );
}
