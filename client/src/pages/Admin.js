import React, { useState, useEffect } from "react";
import { Button, Container, Stack, ToggleButtonGroup, ToggleButton, Row, Col, Form, Card, Table, Image, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameItem from "../components/GameItem";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import {RiAccountCircleFill } from "react-icons/ri";


import DeleteGame from "../components/DeleteGame";
import Header from "../components/Header";

const Admin = () => {

    const navigate = useNavigate();

    const Logout = () => {
        localStorage.removeItem("tokenAdmin");
        navigate('/');
    }


    const baseURL = 'http://localhost:3001/api';
    const user = JSON.parse(localStorage.getItem('token'));
    const [games, setAllGames] = useState([]);
    const [ganres, setAllGanres] = useState([]);

    const [selectedGenre, setselectedGenre] = useState("");
    const [selectedGameName, setselectedGameName] = useState("");
    const [selectedGamePrice, setselectedGamePrice] = useState("");
    const [selectedGameDescription, setselectedGameDescription] = useState("");
    const [selectedGameImage, setselectedGameImage] = useState("");
    const [selectedGameBackgroundImage, setselectedGameBackgroundImage] = useState("");
    const [genreName, setGenreName] = useState("");
    const [genreDescription, setGenreDescription] = useState("");

    const [gmaeByGenre, setGameByGenre] = useState([]);

    const [authView, setAuthView] = useState("createNewGame");


    const loadAllGames = async () => {
        const response = await fetch(baseURL + '/readAllGames', {
            method: 'GET'
        });
        const data = await response.json();
        setAllGames(data.message);
    }

    const loadGenres = async () => {
        const response = await fetch(baseURL + '/readAllGenres', {
            method: 'GET'
        });
        const data = await response.json();
        setAllGanres(data.message);

    }

    const addNewGame = async () => {
        if (selectedGameName !== "" && selectedGamePrice !== "") {
            const response = await fetch(baseURL + '/createGame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    genreId: selectedGenre,
                    gameName: selectedGameName,
                    gamePrice: selectedGamePrice,
                    gameDescription: selectedGameDescription,
                    gameImage: selectedGameImage,
                    gameBackgroundImage:selectedGameBackgroundImage
                })
            });


            const data = await response.json();
            toast.success(`${data.message.gameName} was created `)
            loadAllGames();
            setselectedGameName('');
            setselectedGamePrice('');
            setselectedGameDescription('');
            setselectedGameImage('');
        } else {
            toast.error("Game name and price is require !!")
        }
    }

    const addNewGenre = async () => {
        if (genreName !== "") {
            const response = await fetch(baseURL + '/createGenre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    genreName: genreName,
                    genreDescription: genreDescription,
                })
            });
            const data = await response.json();
            loadGenres();
            toast.success(`Genre ${data.message.genreName} was created `)
            setGenreName('');
            setGenreDescription('');

        } else {
            toast.error("The inputs are require !!!")
        }
    }

    useEffect(() => {
        loadAllGames();
        loadGenres();
    }, []);


    // const deleteGameById = async(gid) =>{

    //     try{
    //     const response = await fetch(baseURL + '/deleteGame/' + gid , {
    //         method:'DELETE'
    //     });
    //     const data = await response.json();
    //     toast.success(data.message);
    //     loadAllGames();
    //     setIsClick(false);
    //     }catch(error){
    //     toast.error(error.message);
    //     }

    // }

    // const readGameByGenre =async(gid)=>{
    //     const response = await fetch(baseURL + '/readGamesByGenre/'+gid , {
    //         method:'GET'
    //     });  
    //     const data = await response.json();
    //     console.log(data.message.length); 
    //     if(data.message.length>0){
    //         toast.error("no") 
    //         console.log(data)
    //     }

    // } 

    const deleteGenreById = async (gid) => {
        const response = await fetch(baseURL + '/readGamesByGenre/' + gid, {
            method: 'GET'
        });
        const data = await response.json();
        if (data.message.length > 0) {
            toast.warning(`This genre have ' ${data.message.length} ' games!`);

        } else {
            const response = await fetch(baseURL + '/deleteGenreById/' + gid, {
                method: 'DELETE'
            });
            const data = await response.json();
            toast.success("Success Delete Gsenre");
            loadGenres();
        }
    }

    return (
        <>
            <Container fluid > 
             <Header/>
                <ToastContainer />
                {/* {
            user.isAdmin ? (<>hi{user}</>) : (<>bye{user}</>)
        }  */}

          
                <Row style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Col xxl={5} xl={6} lg={8} md={9} xs={12} >
                        <>

                            <ToggleButtonGroup defaultValue={1} type="radio" name="options">
                                <ToggleButton onClick={() => { setAuthView("createNewGame") }} id="createNewGame" value={1}>
                                    Create New Game
                                </ToggleButton>
                                <ToggleButton onClick={() => { setAuthView("createNewGenre") }} id="createNewGenre" value={2}>
                                    Create New Genre
                                </ToggleButton>
                                <ToggleButton onClick={() => { setAuthView("updateGame") }} id="updateGame" value={3}>
                                    Update Game
                                </ToggleButton>
                                <ToggleButton onClick={() => { setAuthView("deleteGameById") }} id="deleteGameById" value={4}>
                                    Delete Game By Id
                                </ToggleButton>
                                <ToggleButton onClick={() => { setAuthView("deleteGenreById") }} id="deleteGenreById" value={5}>
                                    Delete Genre By Id
                                </ToggleButton>

                            </ToggleButtonGroup>
                        </>
                    </Col>
                    <Row />
                    <Row style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }} >
                        <Col xxl={6} xl={6} lg={8} md={9} xs={12}>
                            {

                                authView === 'createNewGame' ? (

                                    <>
                                        <Form>

                                            <Form.Select onChange={(e) => { setselectedGenre(e.target.value) }} >
                                                <option>Open this select menu</option>
                                                {
                                                    ganres.length > 0 &&
                                                    ganres.map((genre) => (
                                                        <option value={genre._id}>{genre.genreName}</option>
                                                    ))
                                                }
                                            </Form.Select>


                                            <Form.Control
                                                type="text" value={selectedGameName} onChange={(e) => { setselectedGameName(e.target.value) }}
                                                placeholder="Game Name" style={{ marginTop: 10 }} />
                                            <Form.Control
                                                type="text" value={selectedGamePrice} onChange={(e) => { setselectedGamePrice(e.target.value) }}
                                                placeholder="Game Price" style={{ marginTop: 10 }} />
                                            <Form.Control
                                                type="text" value={selectedGameDescription} onChange={(e) => { setselectedGameDescription(e.target.value) }}
                                                placeholder="Game Description" style={{ marginTop: 10 }} />
                                            <Form.Control
                                                type="text" value={selectedGameImage} onChange={(e) => { setselectedGameImage(e.target.value) }}
                                                placeholder="Game Image" style={{ marginTop: 10 }} />
                                             <Form.Control
                                                type="text" value={selectedGameBackgroundImage} onChange={(e) => { setselectedGameBackgroundImage(e.target.value) }}
                                                placeholder="Game Background Image" style={{ marginTop: 10 }} />

                                            <Button variant="info" onClick={addNewGame} style={{ marginTop: 10, width: '100%' }}>Add New Game</Button>
                                        </Form>
                                    </>
                                )
                                    :
                                    authView === 'createNewGenre' ? (
                                        <>
                                            <Form>
                                                <   Form.Control
                                                    type="text" value={genreName} onChange={(e) => { setGenreName(e.target.value) }}
                                                    placeholder="Genre Name" style={{ marginTop: 10 }} />
                                                <Form.Control
                                                    type="text" value={genreDescription} onChange={(e) => { setGenreDescription(e.target.value) }}
                                                    placeholder="Genre Description" style={{ marginTop: 10 }} />
                                                <Button variant="info" onClick={addNewGenre} style={{ marginTop: 10, width: '100%' }}>Add New Genre</Button>
                                            </Form>
                                        </>
                                    ) :
                                        authView === 'deleteGameById' ? (
                                            <>

                                                <Table>
                                                    <thead style={{ color: '#FF6700' }}>
                                                        <tr>
                                                            <th>Image</th>
                                                            <th>Game Id</th>
                                                            <th style={{ width: 700 }}>Name</th>
                                                            <th>Genre</th>
                                                            <th>Price</th>
                                                            <th style={{ color: '#ff3341', width: "13%" }} >Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ color: "#EBEBEB" }} >
                                                        {
                                                            games.length > 0 &&
                                                            (
                                                                <>
                                                                    {
                                                                        games.map((item) => (
                                                                            <>
                                                                                <DeleteGame loadGenres={loadGenres} loadAllGames={loadAllGames} item={item} />
                                                                            </>
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    </tbody>
                                                </Table>
                                            </>
                                        ) :
                                            authView === 'deleteGenreById' ? (
                                                <>
                                                    <Table>
                                                        <thead style={{ color: '#FF6700' }}>
                                                            <tr>
                                                                <th>Genre Id</th>
                                                                <th>Genre Name</th>
                                                                <th>Genre Description</th>
                                                                <th style={{ color: '#ff3341' }} >Delete Genre</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody style={{ color: "#EBEBEB" }} >
                                                            {
                                                                ganres.length > 0 &&
                                                                (
                                                                    <>
                                                                        {
                                                                            ganres.map((item) => (
                                                                                <>
                                                                                    <tr>
                                                                                        <td>{item._id}</td>
                                                                                        <td>{item.genreName}</td>
                                                                                        <td>{item.genreDescription}</td>
                                                                                        <td>
                                                                                            <AiFillDelete
                                                                                                className="btn btn-danger"
                                                                                                size={38}
                                                                                                onClick={() => { deleteGenreById(item._id) }}
                                                                                            />
                                                                                        </td>
                                                                                    </tr>
                                                                                </>
                                                                            ))
                                                                        }
                                                                    </>
                                                                )
                                                            }
                                                        </tbody>
                                                    </Table>



                                                </>
                                            ) :
                                                authView === 'updateGame' ? (
                                                    <>

                                                        <Row>

                                                            {
                                                                games.length > 0 ?
                                                                    games.map((item) => (
                                                                        <Col xl={4}>
                                                                            <GameItem game={item} loadAllGames={loadAllGames} />
                                                                        </Col>
                                                                    ))
                                                                    :
                                                                    <p>NOPE</p>
                                                            }
                                                        </Row>
                                                    </>
                                                ) : (
                                                    <>
                                                    </>
                                                )
                            }

                        </Col>
                    </Row>
                </Row>


            </Container>


            {/* <Button onClick={Logout} variant="danger" >Logout</Button> */}






        </>
    )
}

export default Admin;