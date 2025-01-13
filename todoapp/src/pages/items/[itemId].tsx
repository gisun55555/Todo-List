import style from './[itemId].module.css';
export default function ItemId() {
  return (
    <div className={style.container}>
      <div className={style.container1}>1</div>
      <div className={style.imageContainer}>2</div>
      <div className={style.momoCotainer}>3</div>
      <div className={style.buttonContainer}>
        <button>1</button>
        <button>2</button>
      </div>
    </div>
  );
}
