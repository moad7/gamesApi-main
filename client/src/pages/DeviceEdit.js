import React,{ useState} from "react";
import { Button, Container, Row, Col, Form,Table,Image} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from '../../src/components/Header.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcPlus,FcEditImage } from "react-icons/fc";
import { VscChevronRight } from "react-icons/vsc";

import moment from 'moment';
import RowEdit from "../components/RowEdit.js";
import GalleryEdit from "../components/GalleryEdit.js";
import {NavLink} from 'react-router-dom';

import axios from 'axios';


const DeviceEdit = props => {

    const baseURL = 'http://localhost:3001/api';


    const [deviceName,setDeviceName] = useState('');
    const [price,setPrice] = useState(0);
    const [reviews,setReviews] = useState([]);
    const [gallery,setGallery] = useState([]);
    const [reviewsIsEditTable,setReviewsIsEditTable]=useState(false);

    //const[search,setSearch] = useState(null);

    const [counterGallery,setCounterGallery] = useState(0);

    const [counter,setCounter] = useState(0);
    
    const [rowItem,setRowItem] = useState({
        title:'',
        review:'',
        tid:0
    }); 

    const [rowItemGallary,setRowItemGallary] = useState({
        imageSource:'',
        imageDesc:'',
        iid:0
    }); 



    const {title,review} = rowItem; 

    const {imageSource,imageDesc} = rowItemGallary;
    //Fuctions  
    
    
    const preset_key ="gz7egm67";
    const could_name ="dfh3k03xt";
    
    
    const onItemChange = (e) =>{


        let vlaue = '';

        if(e.target.name === "imageSource" ){
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file',file)
            formData.append('upload_preset',preset_key)
            // console.log(formData);  
            axios.post(`https://api.cloudinary.com/v1_1/${could_name}/image/upload`,formData)
            .then(async results =>{
                vlaue = await results.data.secure_url;
                setRowItemGallary((prev) =>({
                    ...prev,
                    [e.target.name]:vlaue
                }))
            })
            .catch(error =>{
                toast.error(error.message)
            })
        }else{
            vlaue = e.target.value
            setRowItemGallary((prev) =>({
                ...prev,
                [e.target.name]:vlaue
            }))
        }



        setRowItem((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
        }))



    }



    const addReviewToList  = () =>{
        if(review !== '' && title !== ''){
            setCounter(counter+1);
            let row = {
                tid:counter,
                title:title,
                review:review,
                createdAt:Date.now()
            };
            setReviews(reviews=>[...reviews,row]);          
        }else{
            toast.error("All inputs are required!!!");
        }
    }
    const deleteRowFromList = (tid) =>{
        setReviews((state)=>state.filter((item)=> item.tid !== tid));
    }
    const deleteRowFromListGallery = (iid) =>{
        setGallery((state)=>state.filter((item)=> item.iid !== iid));
    }
    const editList =() =>{
        setReviewsIsEditTable(!reviewsIsEditTable);
    }

    const addGalleryToList = () =>{
        if(imageDesc !== '' && imageSource !==''){
            setCounterGallery(counterGallery+1);
            let Ugallery = {
                iid:counterGallery,
                imageSource:imageSource,
                imageDesc:imageDesc
            }
            setGallery(gallery=>[...gallery,Ugallery]);
        }else{
            toast.error("All inputs are required!!!");
        }
    }

    const updateReviewsList = (tid,e) => {
      let new_title , new_review , erow;
        if(e.target.name === 'title'){
           new_title = e.target.value

            erow = reviews.map((item)=>{
            if(item.tid === tid){
                return {...item,title:new_title}
            }
            return item;
          })

        }else{
           new_review = e.target.value
           erow = reviews.map((item)=>{
            if(item.tid === tid){
                return {...item,review:new_review}
            }
            return item;
          })
        }
      setReviews(erow);
    }

    const updateGalleryList = (iid,e) => {
        let new_imageSource, new_imageDesc , erow;
          if(e.target.name === 'imageSource'){
            new_imageSource = e.target.value
  
              erow = gallery.map((item)=>{
              if(item.iid === iid){
                  return {...item, imageSource : new_imageSource}
              }
              return item;
            })
  
          }else{
            new_imageDesc = e.target.value
             erow = gallery.map((item)=>{
              if(item.iid === iid){
                  return {...item, imageDesc : new_imageDesc}
              }
              return item;
            })
          }
  
        setGallery(erow);

    }
  
    const adddevice = async() => {
        const response = await fetch(baseURL + '/account/createDevice' , {
            method:'POST',
            headers:{
              'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                deviceName: deviceName,
                price: price,
                reviews: reviews,
                gallery: gallery
            })
        });
        const data = await response.json();
        toast.success(data.message);


    }

    // useEffect(()=>{
    //     gallery.filter(x=>x.imageDesc === search);
    // },[search])

    return(

        <>
            <Header/>
            <ToastContainer/>          
            <Container style={{marginTop:50}}>
                {/* <Row>
                    <Col xl={12}>
                        <Form.Control value={search} onChange={(e)=>setSearch(e)} style={{width:200}} />
                    </Col>
                </Row>
                <br/> */}

                <Row>
                    <Col xl={3}>
                        <Form.Control value={deviceName} onChange={(e)=>setDeviceName(e.target.value)} style={{width:200}} />
                    </Col>
                    <Col xl={3}>
                        <Form.Control value={price} onChange={(e)=>setPrice(e.target.value)} style={{width:200}} />
                    </Col>
                    <Col xl={3}>
                       <Button onClick={adddevice} variant="outline-success"> <FcPlus size={28}/></Button>
                    </Col>
                </Row>

                <Row>
                    <Col xl={5}>
                    <Form.Control value={title} name="title" onChange={(e) =>{onItemChange(e)}} type="text" placeholder="Type your title..."/>
                    </Col>
                    <Col xl={5}>
                        <Form.Control value={review} name="review" onChange={(e) =>{onItemChange(e)}} type="text" placeholder="Type your review..."/>
                    </Col>
                    <Col xl={2}>
                        <Button onClick={addReviewToList} variant="outline-success"> <FcPlus size={28}/></Button>
                        <Button style={{marginLeft:10}} onClick={editList} variant="outline-info"> <FcEditImage size={28}/></Button>
                    </Col>

                </Row>

                <Row>
                    <Col xl={5}>
                        <Form.Control style={{marginTop:10}} name="imageSource"  onChange={(e) =>{onItemChange(e)}} type="file"/>
                    </Col>
                    <Col xl={5}>
                      <Form.Control style={{marginTop:10}} name="imageDesc"  value={imageDesc} onChange={(e) =>{onItemChange(e)}} type="text" placeholder="Type your Description..."/>
                    </Col>
                    <Col xl={2}>
                      <Button style={{marginTop:10}} onClick={addGalleryToList} variant="outline-success"> <FcPlus size={28}/></Button>
                    </Col>
                </Row>

                <Row>
                    <Col xl={12}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Review title</th>
                                    <th>Review content</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    reviews.length > 0 &&
                                    (<>
                                        {
                                            reviews.map((item)=>(
                                                <>
                                                {
                                                    reviewsIsEditTable ? (
                                                        <RowEdit 
                                                        row={item} 
                                                        delete={deleteRowFromList} 
                                                        updateReviewsList={updateReviewsList}/>
                                                    ) :(
                                                        <tr>
                                                            <td>{item.tid}</td>
                                                            <td>{item.title}</td>
                                                            <td>{item.review}</td>
                                                            <td>{moment(item.createdAt).format("DD/MM/YYYY hh:mm:ss")}</td>
                                                            <td>
                                                                <NavLink
                                                                key={"reviewKey"}
                                                                to="/game"
                                                                state={{reviewState:item}}
                                                                
                                                                className='btn btn-info' >
                                                                    <VscChevronRight color="#fff" size={28}/>
                                                                </NavLink>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                </>

                                            ))
                                        }
                                    
                                    </>)
                                }
                            </tbody>
                        </Table>
                        <Table style={{marginTop:50}}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Descreption</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    gallery.length > 0 &&
                                    (<>
                                        {
                                            gallery.map((item) =>(
                                                <>
                                                    {
                                                        reviewsIsEditTable ? (
                                                            <GalleryEdit 
                                                            row={item} 
                                                            delete={deleteRowFromListGallery}
                                                            updateGalleryList={updateGalleryList}/>
                                                        ) : (
                                                            <tr>
                                                                <td>{item.iid}</td>
                                                                <td><Image style={{height:80,width:60}} src={item.imageSource}/></td>
                                                                <td>{item.imageDesc}</td>
                                                            </tr>  
                                                        )
                                                    }     
                                                </>
                                            ))
                                        }
                                    </>)
                                }
                            </tbody>

                        </Table>
                    </Col>
                </Row>



            </Container> 
        </>
    )
}

export default DeviceEdit;