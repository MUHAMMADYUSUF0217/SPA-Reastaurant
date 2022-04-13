import { useLocation, useHistory } from "react-router-dom";
import {useState, useEffect} from "react";
import {getAllCategories} from '../api';
import CategoryList from "../Components/CategoryList";
import {Loader} from "../Components/Loader";
import Search from "../Components/Search";
import ErrorMeals from "./ErrorMeals";


export default function Home() {
    const [catalog, setCatalog] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState([]);

    const {pathname, search} = useLocation(); 
    const {push} = useHistory();

    const handleSearch = (str) => {
      setFilteredCatalog(catalog.filter(item => item.strCategory.toLowerCase().includes(str.toLowerCase())) ) 
        push({
            pathname,
            search: `?search=${str}`
        })
    }


    useEffect(() => {
        getAllCategories().then(data => {
          setCatalog(data.categories);
          setFilteredCatalog(search ?
            data.categories.filter(item =>
              item.strCategory
                .toLowerCase()
                .includes(search.split("=")[1].toLowerCase())
              ) : data.categories
          )
        })
      }, [search]); 

    

    return(
        <>

        <Search cb={handleSearch} />
        { !filteredCatalog.length ? <ErrorMeals/> : null} 
        {!catalog.length ? (
        <Loader/>
        ) : (
            <CategoryList catalog={filteredCatalog} />
        )}
        
        </>
        
    )
}