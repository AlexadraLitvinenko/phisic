import React, {useState, useEffect} from 'react';
import {Card, Image, ProgressBar,Container, Col, Row, Breadcrumb, Nav} from 'react-bootstrap';
import Markdown from './Markdown';
import Sound from 'react-sound';
import imagePlay from "../play.svg";
import imagePause from "../stop.svg";

const WorkBook = (data) => {

    const [lectureText, setLectureText] = useState('');
    const [lectureImage, setLectureImage] = useState('');
    const [lectureSound, setLectureSound] = useState('');
    const [title, setTitle] = useState('');
    const [previousURL, setPreviousURL] = useState('');
    const [soundStatus, setSoundStatus] = useState('STOPPED');
    const [imageStatus, setImageStatus] = useState(imagePlay);
    const [soundStartPoint, setSoundStartPoint] = useState(0);
    const [orientationClass, setOrientationClass] = useState("d-flex flex-column");

    useEffect(() => {
        if(data.location.state) {
            setLectureText(data.location.state.lectureText);
            setLectureImage(data.location.state.lectureImage);
            setLectureSound(data.location.state.lectureSound);
            setTitle(data.location.state.title);
            setPreviousURL(data.location.state.previousURL);
        }
    }, [data.location.state]);

    const soundClick = () => {
        if(soundStatus === Sound.status.PLAYING){
            setSoundStatus(Sound.status.STOPPED);
            setImageStatus(imagePlay);
          }
        else {
            setSoundStatus(Sound.status.PLAYING);
            setImageStatus(imagePause);
          }
    };

    let checkPosition = (position) => {
        setSoundStartPoint((position.position / position.duration) * 100);
    };

    return (
        <div className="d-flex flex-column justify-content-center">
        {
            data.location.state ?
            <Breadcrumb>
                <Breadcrumb.Item href={previousURL}>{data.location.state.currentSection}</Breadcrumb.Item>
                <Breadcrumb.Item href="#">{title}</Breadcrumb.Item>
            </Breadcrumb>
            : null
        }
        
        {lectureSound?
            <Card style={{ width: '80%', height: '100%',  marginLeft: "auto", marginRight: "auto"}}>
            <Card.Body>
                <Card.Text>Вы можете прослушать данную лекцию</Card.Text>
                <Container>
                <Row className="align-items-center">
                    <Col className="justify-content-center px-2">
                        <button className="btn btn-outline-secondary" onClick={soundClick}>
                            <img src={imageStatus} alt="Play voiceover" height='25' width="50"/>
                        </button>
                    </Col>
                    <Col xs={9} className="m-2">
                        <Sound 
                            volume={100} 
                            autoLoad={false} 
                            url={lectureSound} 
                            playStatus={soundStatus} 
                            onPlaying={checkPosition}
                        />
                        <ProgressBar now={soundStartPoint}/>
                    </Col>
                </Row>
                </Container>
            </Card.Body>
            </Card>:null
        }
        {lectureText?
            <Card className="mt-3" style={{ width: '80%', height: '100%',  marginLeft: "auto", marginRight: "auto"}}>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="book">
                <Nav.Item>
                    <Nav.Link eventKey="book" onClick={() => setOrientationClass("d-flex flex-column")}>Книжная ориентация</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="album" onClick={() => setOrientationClass("d-flex flex-row")}>Альбомная ориентация</Nav.Link>
                </Nav.Item>
                </Nav>
            </Card.Header>
                    <Card.Body>
                    <div className={orientationClass}>
                        <div className="d-flex justify-content-center align-self-center" height="200px">
                            
                                {
                                    lectureImage ? 
                                        <Image variant="center" src={lectureImage} height="400"/>
                                        : null
                                }
                            
                        </div>
                        <div className="flex-shrink-1">
                        <Markdown>
                            {lectureText}
                        </Markdown>
                        </div>
                    </div>
                    </Card.Body>
            </Card>
           :
            <div className="d-flex justify-content-center"><p>Упс, кажется лекция еще не готова</p></div>
        }
        </div>
    )
} 
export default WorkBook;