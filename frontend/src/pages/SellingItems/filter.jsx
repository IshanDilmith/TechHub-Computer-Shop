import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Filter = ({onCategoryChange}) => {

    const [categories, setCategories] = useState([]);

    const fetchCategory = async () => {
        try {
            const response = await axios.get('http://localhost:3000/itemCategory/');
            setCategories(response.data);
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        fetchCategory();
    }, []);

    return (

        <div>
            {categories.map((category) => (
                <label key={category._id}>{category.categoryName}
                <input type='checkbox' value={category.categoryName} onChange={(e) => {
                    onCategoryChange(category.categoryName, e.target.checked);
                }} />
                </label>

            ))}

        </div>

    );

}

export default Filter;