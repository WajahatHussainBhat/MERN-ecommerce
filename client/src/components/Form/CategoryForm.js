import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return ( <
        >
        <
        form onSubmit = { handleSubmit } >
        <
        div className = "register_field" >
        <
        input type = "text"
        className = "register_field_form"
        placeholder = "Enter new category"
        value = { value }
        onChange = {
            (e) => setValue(e.target.value) }
        />{" "} <
        /div>{" "} <
        button type = "submit"
        className = "category-form_btn" > { " " }
        Submit { " " } <
        /button>{" "} <
        /form>{" "} <
        />
    );
};

export default CategoryForm;