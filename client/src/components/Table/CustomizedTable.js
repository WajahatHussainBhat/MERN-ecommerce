import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Modal } from "antd";
import CategoryForm from "../Form/CategoryForm";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#0097e6",
        color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        color: "#0097e6",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#96d3f330",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const CustomButton = styled(Button)({
    textTransform: "none",
});

export default function CustomizedTables({
    categories,
    getAllCategories,
    updatedName,
    setUpdatedName,
}) {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [auth, setAuth] = useAuth();

    // Update category
    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `/api/v1/category/update-category/${selected._id}`, { name: updatedName }, {
                    headers: {
                        Authorization: auth && auth.token,
                    },
                }
            );
            if (data && data.success) {
                toast.success(`${updatedName} created successfully`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // Delete category
    const handleDelete = async(id) => {
        try {
            const { data } = await axios.delete(
                `/api/v1/category/delete-category/${id}`, {
                    headers: {
                        Authorization: auth && auth.token,
                    },
                }
            );
            if (data && data.success) {
                toast.success(`Category is deleted successfully`);
                getAllCategories();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return ( <
        >
        <
        div >
        <
        TableContainer component = { Paper } >
        <
        Table sx = {
            { minWidth: 800 } } >
        <
        TableHead >
        <
        TableRow >
        <
        StyledTableCell > Name < /StyledTableCell>{" "} <
        StyledTableCell > Actions < /StyledTableCell>{" "} <
        /TableRow>{" "} <
        /TableHead>{" "} <
        TableBody > { " " } {
            categories.map((category) => ( <
                >
                <
                StyledTableRow key = { category._id } >
                <
                StyledTableCell component = "th"
                scope = "row" > { " " } { category.name } { " " } <
                /StyledTableCell>{" "} <
                StyledTableCell component = "th"
                scope = "row" >
                <
                CustomButton className = "table-btn table-btn-edit"
                variant = "contained"
                onClick = {
                    () => {
                        setVisible(true);
                        setUpdatedName(category.name);
                        setSelected(category);
                    }
                } >
                Edit { " " } <
                /CustomButton>{" "} <
                CustomButton className = "table-btn table-btn-delete"
                variant = "contained"
                onClick = {
                    () => {
                        {
                            handleDelete(category._id);
                        }
                    }
                } >
                Delete { " " } <
                /CustomButton>{" "} <
                /StyledTableCell>{" "} <
                /StyledTableRow>{" "} <
                />
            ))
        } { " " } <
        /TableBody>{" "} <
        /Table>{" "} <
        /TableContainer>{" "} <
        /div>{" "} <
        Modal onCancel = {
            () => {
                setVisible(false);
            }
        }
        footer = { null }
        open = { visible } >
        <
        CategoryForm value = { updatedName }
        setValue = { setUpdatedName }
        handleSubmit = { handleUpdate }
        />{" "} <
        /Modal>{" "} <
        />
    );
}