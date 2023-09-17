import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_REACT_API_URL}/api/v1/service/search/${
                    values.keyword
                }`
            );
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='mx-auto flex-grow-1 text-center'>
            <form className='d-flex' role='search' onSubmit={handleSubmit}>
                <input
                    className='form-control rounded-0'
                    type='search'
                    placeholder='Search'
                    aria-label='Search'
                    value={values.keyword}
                    onChange={(e) =>
                        setValues({ ...values, keyword: e.target.value })
                    }
                />
                <button className='btn btn-dark rounded-0' type='submit'>
                    <i className='bi bi-search' />
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
