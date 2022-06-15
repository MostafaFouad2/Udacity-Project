import { useState , useEffect} from "react";
import classes from './SearchBooks.module.css';
import {TiPlus} from 'react-icons/ti'
import BookItem from "./BookItem";
import { getAll} from "../../BooksAPI";
import { NavLink } from "react-router-dom";

const MyBooks = () => {
    const[found,setfound] = useState(false);
    const [books, setbooks] = useState([]);
    const[reBook,setReBook] = useState(false);

    const handleChange=()=>{
        setReBook(!reBook)
    }
    
    
  
    useEffect(() => {

      setfound(false)

      const Books =async()=>{
        const data = await getAll();
        if(data.error!==undefined){
            setbooks([])
            setfound(true)
        }else{
            setbooks(data);
            setfound(false)
        }
      };

      
      Books();
      
    }, [reBook]);

    
    const currentBooks = books.filter(book=> book.shelf==='currentlyReading');
    const readBooks = books.filter(book=> book.shelf==='read');
    const wantBooks = books.filter(book=> book.shelf==='wantToRead');
  return (
    <div >
        {found ? <h2>Sorry There ara no Books</h2>:''}
        {!found ?<div><h2>Currently Reading</h2><hr/></div>:''}
        <div className={classes.items}>
            {currentBooks.length >0 && currentBooks.map((item, i)=>  <div key={i}><BookItem setReBook={handleChange} Book={item} Shelf={item.shelf} Img={'imageLinks' in item ? item.imageLinks.thumbnail : "http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"} Title={item.title} Authors={item.authors}/></div>)}
            {currentBooks.length ===0 &&<h3>There ara no Books</h3>}
        </div>
        {!found ?<div><h2>Read</h2><hr/></div>:''}
        <div className={classes.items}>
            {readBooks.length >0 && readBooks.map((item, i)=>  <div key={i}><BookItem setReBook={handleChange} Book={item} Shelf={item.shelf} Img={'imageLinks' in item ? item.imageLinks.thumbnail : "http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"} Title={item.title} Authors={item.authors}/></div>)}
            {readBooks.length ===0 &&<h3>There ara no Books</h3>}
        </div>
        {!found ?<div><h2>Want To Read</h2><hr/></div>:''}
        <div className={classes.items}>
            {wantBooks.length >0 && wantBooks.map((item, i)=>  <div key={i}><BookItem setReBook={handleChange} Book={item} Shelf={item.shelf} Img={'imageLinks' in item ? item.imageLinks.thumbnail : "http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"} Title={item.title} Authors={item.authors}/></div>)}
            {wantBooks.length ===0 &&<h3>There ara no Books</h3>}
        </div>
        <NavLink to='/search'><button className={classes.but}><TiPlus size="20px" color='white' /></button></NavLink>
    </div>
  );
};

export default MyBooks;