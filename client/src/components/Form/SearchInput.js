import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    //handle submit
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `/api/v1/product/search/${values.keyword}`
            );
            setValues({...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    return ( <
        div >
        <
        form className = "search-form"
        onSubmit = { handleSubmit } >
        <
        input className = "search-form-input"
        type = "search"
        placeholder = "Search"
        value = { values.keyword }
        onChange = {
            (e) => setValues({...values, keyword: e.target.value }) }
        />{" "} <
        button className = "search-button"
        type = "submit" > < SearchIcon / > < /button>{" "} <
        /form>{" "} <
        /div>
    );
};

export default SearchInput;