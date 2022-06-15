import classes from './BookList.module.css';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useState, useEffect } from 'react';
import {update, get} from "../../BooksAPI";
import{useLocation} from "react-router-dom";
let readstates = [
    {
      label: "want to read",
      value: "wantToRead",
      
    },
    {
      label: "read",
      value: "read",
      
    },
    {
      label: "current raeding",
      value: "currentlyReading",
      
    },
    {
      label: "none",
      value: "none",
      
    },
  ];


const BookList = (props) => {
  const[selected,setSelected] = useState(props.Book.shelf);
  const [open,setOpen]=useState(false);
  const location = useLocation();
 

  const upBook =async(book , shelf)=>{
    await update(book , shelf);
    setOpen(!open)
    if(location.pathname!=='/search'){
      props.setReBook()
    }
    
    
  };

  useEffect(()=>{
    const getBook = async(book)=>{
      const data = await get(book);
      setSelected(data.shelf)
    }
    getBook(props.Book.id)
  },[props.Book])
  


 
  const ListHandle = ()=>{
    setOpen(!open);
  }
  
  
  const handleChange = (event)=> {
    setSelected(event.target.value)
    upBook(props.Book,event.target.value)

    
    
  }

 
  return (
        <div>
            {!open&&<button className={classes.but} onClick={ListHandle}><IoMdArrowDropdown size="20px" color='white' /></button>}
            {open&&<div className={classes.list}>
            <label onClick={ListHandle}>Move to..</label>
            {readstates.map((op,i)=><div className={classes.itemlist} key={i}>
            <label htmlFor={`${props.Book.title}${i}`}>{op.label}</label>
            <input
                    type="checkbox"
                    id={`${props.Book.title}${i}`}
                    value={op.value}
                    checked={(op.value===selected)}
                    onChange={handleChange}
                />
            </div>)}
            </div>}
        </div>
  );
};

export default BookList;