import { useState , useEffect} from "react";
import classes from './SearchBooks.module.css';
import { IoArrowBack } from 'react-icons/io5';
import BookItem from "./BookItem";
import { search } from "../../BooksAPI";
import { NavLink } from "react-router-dom";
const SearchBooks = () => {
    const[searchInput,setSearchInput] = useState('');
    const[found,setfound] = useState(false);
    const [bookSearched, setbookSearched] = useState([]);
   

    
  
    useEffect(() => {

      setfound(false)

      const serBooks =async(qu)=>{
        const data = await search(qu);
        if(data.error!==undefined){
          setbookSearched([])
          setfound(true)
        }else{
          setbookSearched(data);
          setfound(false)
        }
      };

      if(searchInput !==''){
        serBooks(searchInput)
      }else{
        setbookSearched([])
      }
      
      
    }, [searchInput]);

    //const bookSearched = books.filter(book=> book.title.toLowerCase().includes(search.toLowerCase())||book.authors[0].toLowerCase().includes(search.toLowerCase()));
    const handleChange = (event)=> {
        setSearchInput(event.target.value);
      }
  return (
    <div className={classes.search}>
        <div className={classes.inp}>
          <NavLink to='/'><IoArrowBack size="25px"/></NavLink>
          <input placeholder="search by Auth or Title" onChange={handleChange}/>
          </div>
          <div className={classes.items}>
              {bookSearched.length >0 && bookSearched.map((item, i)=>  <div key={i}><BookItem Book={item} Shelf={item.shelf} Img={'imageLinks' in item ? item.imageLinks.thumbnail : "http://books.google.com/books/content?id=1yx1tgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"} Title={item.title} Authors={item.authors}/></div>)}
              {found ? <h2>Sorry This Book NOT Found</h2>:''}
          </div>
    </div>
  );
};

export default SearchBooks;