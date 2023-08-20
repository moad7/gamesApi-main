import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Carousel, Form, Spinner,Table ,Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Game from "./Game.js";
import {useNavigate } from 'react-router-dom';
import { GrAddCircle,GrSearch,GrLogout,GrCart,GrHomeRounded } from "react-icons/gr";
import {FaHeart} from "react-icons/fa"
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { HiOutlineArrowDownOnSquare } from "react-icons/hi2"


const Dashboard = props => {

    const baseURL = "http://localhost:3001/api";


    const [games, setAllGames] = useState([]);
    const [gamesByGenre, setGamesByGenre] = useState([]);
    const [ganres, setAllGanres] = useState([]);
    const [searchGameByName, setSearchGameByName] = useState([]);
    const [onClickSerch, setOnClickSerch] = useState("searchAllGame");
    const [selectedGame, setSelectedGame] = useState(null);
    const [authView, setAuthView] = useState("Dashboard")
    const [gameName, setGameName] = useState("");
    const[sumPrice,setSumPrice]=useState(0);
    const [arrayGameCart,setArrayGameCart] = useState([]);
    const [arrayGameWishlist,setArrayGameWishlist] = useState([]);

    function addGameToCart(game) {
        const existingItem = arrayGameCart.find(item => item._id.toString() === game._id.toString());
        if (existingItem) {
            toast.warning('Hes Game Was Added Before Cart!!');
        } else {
            setArrayGameCart(prevArray => [...prevArray, game]);
            toast.success(`Added ${game.gameName} to Cart successfully`)
        }

    }
    function addGameToWishlist(game) {
        const existingItem = arrayGameWishlist.find(item => item._id.toString() === game._id.toString());
        if (existingItem) {
            toast.warning('Hes Game Was Added Before in Wishlist !!');
        } else {
            setArrayGameWishlist(prevArray => [...prevArray, game]);
            toast.success(`Added ${game.gameName} to Wishlist successfully`)
        }

    }
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
    const readGameByGenre = async () => {
        try {
            if (selectedGame == "1" && selectedGame) {
                setOnClickSerch("searchAllGame");
            } else {
                const response = await fetch(baseURL + '/readGamesByGenre/' + selectedGame, {
                    method: 'GET'
                });
                const data = await response.json();
                //console.log(data);
                setGamesByGenre(data.message);
                setOnClickSerch("searchGameByGenre");
            }

        } catch {
            toast.error("Somthing Wrong!!");
        }
    }
    const showGame = (game) => {
        setAuthView("ViewGame");
        setSelectedGame(game);
        window.location.hash = "idPageGame";        
    }
    const backToHomeFromPageGame = () => {
        setSelectedGame(1);
        setOnClickSerch("searchAllGame");
        setAuthView("Dashboard");
        window.location.hash = "Dashboard";        
    }
    const deleteRowFromList = (tid) =>{
        setArrayGameCart((state)=>state.filter((item)=> item._id !=tid));
    }
    const deleteGameFromWishlist = (tid) =>{
        setArrayGameWishlist((state)=>state.filter((item)=> item._id !=tid));
    }
    const calculateSum = () => {
        const prices = arrayGameCart.map(game => {
            if (game.gamePrice === "Free") {
              return 0; // Treat "Free" as zero
            }
            return parseFloat(game.gamePrice, 10);
        });
          const sum = prices.reduce((total, price) => total + price, 0);

        setSumPrice(sum);
    };
    const BuyGame =()=>{
        setArrayGameCart([]);
        const emoji = "\u{1F60D}"; 
        toast.success(`Thanks For Your Purchase ${emoji}  \u{1F496}`)
    }
    const Buy =()=>{
        const emoji = "\u{1F60D}"; 
        toast.success(`Thanks For Your Purchase ${emoji}  \u{1F496}`)
        setShow(false);
    }

    const navigate = useNavigate();
    const Logout = () => {
       // localStorage.removeItem("tokenAdmin");
        navigate('/');
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        loadAllGames();
        loadGenres();
        calculateSum();
        if (gameName.length>0) {
            setOnClickSerch("searchGameByName");
        }else{
          setOnClickSerch("searchAllGame");
        }

    }, [gameName,arrayGameCart,arrayGameWishlist]);
    return (
        <>
            <Container fluid>
                <ToastContainer />
                <Row style={{ background: '#000000', paddingTop: 20, paddingBottom: 20 }}>
                    <Col xl={2}>
                        <img src="../../Shope.jpg" style={{ width: 170 }} id="Dashboard"/>
                    </Col>
                    <Col style={{padding:12}} xl={9}>
                        <GrHomeRounded onClick={()=>{setAuthView("Dashboard")}} style={{ background: '#fff', marginRight: 10 }}className="btn btn-secondary" size={50}/>
                        <GrCart onClick={()=>{setAuthView("Cart")}} style={{ background: '#A9DFBF', marginRight: 10 }} color="#fff" className="btn btn-secondary" size={50} />
                        <FaHeart onClick={()=>{setAuthView("Wishlist")}} style={{ background: '#E465DB', marginRight: 10 }} color="#fff" className="btn btn-secondary" size={50} />
                    </Col>
                    <Col style={{padding:12 }}>
                        <div ><GrLogout className="btn btn-danger" onClick={Logout} size={50} /></div>
                    </Col>
                </Row>
                {
                    authView === "Dashboard" ? (<>
                        <Row style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50, marginBottom: 50 }}>

                            {
                                games.length > 0 ? (<>
                                    <Carousel style={{ width: "65%" }}>
                                        {
                                            games.map((item) => (
                                                <Carousel.Item interval={2500}>
                                                    {
                                                        <img
                                                            className="d-block w-100"
                                                            src={item.gameBackgroundImage}
                                                            alt={item.gameName}

                                                        />
                                                    }
                                                    <Carousel.Caption>
                                                        <h2 style={{ color: "#fff", fontWeight: "bold" }}>{item.gameName}</h2>
                                                        <div>
                                                            <Button onClick={() => { showGame(item) }} variant="light" style={{ marginRight: 10 }} >Buy Now</Button>
                                                            <Button onClick={()=>{addGameToWishlist(item)}} variant="outline-light"><GrAddCircle size={20} style={{ marginRight: 5 }} />Add to Wishlist</Button>
                                                        </div>
                                                    </Carousel.Caption>

                                                </Carousel.Item>
                                            ))
                                        }

                                    </Carousel>
                                </>)
                                    :
                                    (
                                        <>
                                            <Spinner animation="border" variant="info" style={{ width: 120, height: 120 }} />
                                        </>
                                    )
                            }
                        </Row>                       
                        <Row style={{ paddingTop: 20, paddingBottom: 20, background: '#C5D6D8' }} className="justify-content-md-center" >
                            <Row style={{ padding:20,borderRadius: 20, marginBottom: 20, background: "#323232", width: "35%" }} className="justify-content-md-center">
                                <Col xl={5}>
                                    <Form.Select style={{ height: "100%" }} onChange={(e) => { setSelectedGame(e.target.value) }} onClick={selectedGame && readGameByGenre} >
                                        <option value={1} >Show All Games</option>
                                        {
                                            ganres.length > 0 &&
                                            ganres.map((genre) => (
                                                <option value={genre._id}>{genre.genreName}</option>
                                            ))
                                        }

                                    </Form.Select>
                                </Col>
                                <Col xl={5}>
                                    <Form.Label style={{ height: "100%" }} >
                                        <Form.Control style={{ height: "100%" }} value={gameName} onChange={(e) => { setGameName(e.target.value) }} type="text" placeholder="Search Game Name" />
                                    </Form.Label>
                                </Col>


                            </Row>
                            <div style={{ height: 800, width: '100%', overflow: 'hidden', overflowX: 'hidden', overflowY: 'scroll' }}>
                                <Row className="justify-content-md-center" style={{ marginTop: 60 }} xl={3}>
                                    {
                                        onClickSerch == "searchGameByGenre" ? (<>{
                                            gamesByGenre.length > 0 ? (<>
                                                {
                                                    gamesByGenre.map((game) => (
                                                        <Game game={game} onClick={() => { showGame(game) }} addGameToCart={()=>{addGameToCart(game)}}  addGameToWishlist={()=>addGameToWishlist(game)} />
                                                    ))
                                                }
                                            </>)
                                                : (<>
                                                    <p>Didn't Have Game By This Genre</p>
                                                </>)
                                        }
                                        </>)
                                            : onClickSerch == "searchAllGame" ?
                                                (<>{
                                                    games.length > 0 && (<>
                                                        {

                                                            games.map((game) => (
                                                                <Game game={game} onClick={() =>{showGame(game)}} addGameToCart={()=>{addGameToCart(game)}}  addGameToWishlist={()=>addGameToWishlist(game)}/>
                                                            ))
                                                        }
                                                    </>)
                                                }</>)
                                                : onClickSerch == "searchGameByName" ? (
                                                    <>
                                                        {
                                                            games.length > 0 ? (<>
                                                                {
                                                                    games.filter((game) => {
                                                                        return game.gameName.toLowerCase().includes(gameName.toLowerCase());
                                                                    }).map((item)=>(
                                                                        <Game  game={item} onClick={() => { showGame(item) }} addGameToCart={()=>{addGameToCart(item)}}  addGameToWishlist={()=>addGameToWishlist(item)}/>
                                                                    ))
                                                                }
                                                            </>) : (<><p>No Have Game By This Name</p></>)
                                                        }
                                                    </>) : (<><p>No Have Game</p></>)

                                    }
                                </Row>
                            </div>
                        </Row>
                        <Row style={{ height: 50}}>

                        </Row>
                    </>)
                    : authView == "ViewGame" ? (<>
                            <Row style={{ padding: 140, paddingTop: 50 }}>
                                <h1 style={{ color: '#fff', marginBottom: 40, fontSize: 50 }}id="idPageGame">{selectedGame.gameName}</h1>
                                <Button style={{ marginBottom: 10, marginLeft: 5, color: '#000', background: "#C2DFE3" }} variant="outline-dark" onClick={backToHomeFromPageGame}>Back To Home</Button>

                                <Col xl={8}>
                                    <Col >
                                        <img style={{ width: "100%" }}  src={selectedGame.gameBackgroundImage} />
                                    </Col>
                                    <h2 style={{ color: '#9DB4C0', marginTop: 40 }}>Description</h2>
                                    <p style={{ color: '#fff', fontSize: 22, marginLeft: 40 }} >{selectedGame.gameDescription}</p>
                                    <h2 style={{ color: '#9DB4C0', marginTop: 40 }}>Genre</h2>
                                    <p style={{ color: '#fff', fontSize: 22, marginLeft: 40 }} >{selectedGame.genreId.genreName}</p>
                                </Col>
                                <Col className="cardBauy" style={{ background: '#C5D6D8' }} xl={4}>
                                    <Row style={{ padding: 60, paddingBottom: 40 }}>
                                        <img className="cardImage" src={selectedGame.gameImage} />
                                    </Row>
                                    <Row style={{ paddingLeft: 30, paddingRight: 30 }} className="justify-content-md-center" >
                                        <Col xs lg={5} style={{ marginBottom: 10 }}>
                                            <h1>{selectedGame.gamePrice === "Free" ? <> {selectedGame.gamePrice}</> : <>₪{selectedGame.gamePrice}</>}</h1>
                                        </Col>
                                        <button style={{ marginBottom: 14 }} onClick={handleShow} className="buttonBuy">
                                            <span className="transition"></span>
                                            <span className="gradient"></span>
                                            <span className="label"><HiOutlineArrowDownOnSquare size={25} /> Buy Now</span>
                                        </button>
                                        <button style={{ marginBottom: 14 }} onClick={()=>{addGameToCart(selectedGame)}} className="buttonBuy">
                                            <span className="transitionCart"></span>
                                            <span className="gradient"></span>
                                            <span className="label"><BsFillCartPlusFill size={25} /> Add To Cart</span>
                                        </button>
                                        <button style={{ marginBottom: 25 }} onClick={()=>{addGameToWishlist(selectedGame)}} className="buttonBuy">
                                            <span className="transitionWishlist"></span>
                                            <span className="gradient"></span>
                                            <span className="label"><MdOutlinePlaylistAdd size={25} /> Add to Wishlist</span>
                                        </button>
                                    </Row>
                                </Col>
                                <Modal
                                    show={show}
                                    onHide={handleClose}
                                    backdrop="static"
                                    keyboard={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Buy Game {selectedGame.gameName}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                    Are you sure you want to buy this game?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                                        <Button variant="primary" onClick={Buy}>Yes</Button>
                                    </Modal.Footer>
                                </Modal>
                            </Row>
                    </>)
                    : authView == "Cart" ? (<>
                    {
                                arrayGameCart.length > 0 ? (<>
                                    <Row className="justify-content-center">
                                        <Table style={{ width: "60%",marginTop:60 }}>

                                            <thead style={{ color: '#FF6700' }}>
                                                <tr className="text-center">
                                                    <th >Image</th>
                                                    <th>Game Id</th>
                                                    <th style={{ width: 700 }}>Name</th>
                                                    <th>Genre</th>
                                                    <th>Price</th>
                                                    <th style={{ color: '#FF6700', width: "13%" }} >Remove</th>
                                                </tr> 
                                            </thead>
                                            <tbody>
                                                {
                                                    arrayGameCart.length > 0 &&
                                                    (
                                                        <>
                                                            {
                                                                arrayGameCart.map((item) => ( 
                                                                    <>
                                                                        <tr className="text-center" >
                                                                            <td><img style={{ height: 67, width: 120 }} src={item.gameBackgroundImage} /></td>
                                                                            <td>{item._id}</td>
                                                                            <td>{item.gameName}</td>
                                                                            <td>{item.genreId.genreName}</td>
                                                                            <td>{item.gamePrice=='Free'?<>{item.gamePrice}</>:<>₪{item.gamePrice}</>}</td>
                                                                            <td>
                                                                                <Button variant="outline-warning" onClick={() => { deleteRowFromList(item._id) }}>Remove</Button>
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


                                    </Row>
                                    
                                </>):(<>
                                    
                                    <Row  style={{marginTop:60}}>
                                        <h3 className="text-center" style={{ color: "#fff" }}>Your cart is empty.</h3>
                                    </Row>

                                </>)

                            }
                           
                            <Row className="justify-content-center" style={{marginTop:30}}>
                                {
                                    sumPrice>0&&(<>
                                        <h3 className="text-center" style={{color:'#ffff'}}>Your Total Price Is: {sumPrice.toFixed(2)}</h3>
                                        <Button onClick={BuyGame} variant="outline-light" style={{width:'15%',background:'#58BC82',marginTop:20,marginBottom:80}}>Buy It</Button>
                                    </>)
                                }
                            </Row>
                                
                    </>)
                    : authView =="Wishlist" ? (<>
                            {
                                arrayGameWishlist.length > 0 ? (<>
                                    <Row className="justify-content-center">
                                        <Table style={{ width: "50%",marginTop:60 }}>

                                            <thead style={{ color: '#FF6700' }}>
                                                <tr className="text-center">
                                                    <th >Image</th>
                                                    <th style={{ width: 700 }}>Name</th>
                                                    <th>Price</th>
                                                    <th style={{ color: '#FF6700', width: "13%" }} >Add To Cart</th>
                                                    <th style={{ color: '#BFC0C0', width: "13%" }} >Remove</th>

                                                </tr> 
                                            </thead>
                                            <tbody>
                                                {
                                                    arrayGameWishlist.length > 0 &&
                                                    (
                                                        <>
                                                            {
                                                                arrayGameWishlist.map((item) => ( 
                                                                    <>
                                                                        <tr className="text-center" >
                                                                            <td><img style={{ height: 67, width: 120 }} src={item.gameBackgroundImage} /></td>
                                                                            <td>{item.gameName}</td>
                                                                            <td>{item.gamePrice=='Free'?<>{item.gamePrice}</>:<>₪{item.gamePrice}</>}</td>
                                                                            <td><Button variant="outline-success" onClick={() => { addGameToCart(item) }}>Add</Button></td>
                                                                            <td>
                                                                                <Button variant="secondary" onClick={() => { deleteGameFromWishlist(item._id) }}>Remove</Button>
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


                                    </Row>
                                    
                                </>):(<>
                                    
                                    <Row  style={{marginTop:60}}>
                                        <h3 className="text-center" style={{ color: "#fff" }}>You haven't added anything to your wishlist yet.</h3>
                                    </Row>

                                </>)

                            }
                    </>) 
                    :(<></>)
                }

            </Container>

        </>
    )
}

export default Dashboard;