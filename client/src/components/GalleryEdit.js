import React,{useState} from "react";
import { Button, Container, Row, Col, Form, Card ,Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {FcDeleteRow } from "react-icons/fc";
import moment from 'moment';

const GalleryEdit = props =>{
    // const [imageSource,setImageSource] = useState(props.row.imageSource);
    // const [imageDesc,setImageDesc] = useState(props.row.imageDesc);

    const [rowItemGallary,setRowItemGallary] = useState({
        imageSource:props.row.imageSource,
        imageDesc:props.row.imageDesc,
        iid:0
    }); 

    const {imageSource,imageDesc} = rowItemGallary;

    const onItemChange = (e) =>{
        props.updateGalleryList(props.row.iid,e);
        setRowItemGallary((prev) =>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return(
        <>
            <tr>
                <td>{props.row.iid}</td>
                <td>
                    <Form.Control name="imageSource" value={imageSource} onChange={(e) =>{onItemChange(e)}} type="text"/>
                </td>
                <td>
                     <Form.Control name="imageDesc" value={imageDesc} onChange={(e) =>{onItemChange(e)}} type="text"/>   
                </td>
                <td><Button onClick={()=>{props.delete(props.row.iid)}} variant="outline-danger"> <FcDeleteRow size={28}/></Button></td>
            </tr>
        </>
    )
}

export default GalleryEdit;