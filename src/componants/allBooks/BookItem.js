import classes from './BookItem.module.css';
import BookList from './BookList';



const BookItem = (props) => {
   
  
  
  return (
      <div className={classes.item}>
          <div className={classes.itemImg}>
              <img src={props.Img} alt=''/>
              <BookList setReBook={props.setReBook} Book={props.Book}/>
          </div>
          <div>
              <p>{props.Title}</p>
              <span>{props.Authors.join(" , ")}</span>
          </div>
      </div>
  );
};

export default BookItem;