import React, { useState, useEffect } from "react";
import { Button, Container, Alert, ToggleButtonGroup, ToggleButton, Row, Col, Form, Card, Table, Image, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillDelete } from "react-icons/ai";
import { GoCheck , GoX} from "react-icons/go";

const DeleteGame = (props) => {
    const baseURL = 'http://localhost:3001/api';

    const[isClick,setIsClick]=useState(false);
    const deleteGameById = async(gid) =>{
        
        try{
        const response = await fetch(baseURL + '/deleteGame/' + gid , {
            method:'DELETE'
        });
        const data = await response.json();
        toast.success(data.message);
        props.loadAllGames();
        setIsClick(false);
        }catch(error){
        toast.error(error.message);
        }
    }

    return (
        <>
            <tr>
                <td><Image style={{ height: 70, width: 60 }} src={props.item.gameImage} /></td>
                <td>{props.item._id}</td>
                <td>{props.item.gameName}</td>
                <td>{props.item.genreId.genreName}</td>
                <td>₪{props.item.gamePrice}</td>
                <td>
                    {
                        isClick ? (
                            <>
                                <GoX
                                    className="btn btn-light"
                                    size={34}
                                    key={"x"}
                                    onClick={() => { setIsClick(false) }}
                                    style={{ marginRight: 7 }}
                                />
                                <GoCheck
                                    className="btn btn-info"
                                    size={34}
                                    key={"check"}
                                    onClick={() => { deleteGameById(props.item._id) }}
                                />

                            </>
                        ) : (
                            <>
                                <AiFillDelete
                                    className="btn btn-danger"
                                    size={38}
                                    key={"deleteKey"}
                                    onClick={() => { setIsClick(true) }}
                                />
                            </>
                        )
                    }
                </td>
            </tr>
        </>
    )


}

export default DeleteGame;