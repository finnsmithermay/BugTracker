import react from 'react';

const SearchBox = (props) => {
    return(
        <input type='search'
        className='search'
       
        onChange = {props.handleChange}
        />
    )
}

export default SearchBox;