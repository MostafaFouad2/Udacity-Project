import { Route, Switch } from 'react-router-dom';
import SearchBooks from './componants/allBooks/SearchBooks';
import MyBooks from './componants/allBooks/MyBooks';
import Header from './componants/allBooks/Header';
import NotFound from './componants/NotFound';







const App = () => {

 
  return (
    <div>
      <Switch>
        <Route path='/' exact>
          <Header/>
          <MyBooks/>
        </Route>
        <Route path='/search'>
          <SearchBooks/>
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
      
      
    </div>
  );
};

export default App;