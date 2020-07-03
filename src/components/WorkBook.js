import React, {useState, useEffect} from 'react';
import {Card, Image, ProgressBar,Container, Col, Row, Breadcrumb} from 'react-bootstrap';
import Markdown from './Markdown';
import Sound from 'react-sound';

const WorkBook = (data) => {
    let currentSubtitle; let imageURL; let theoryURL; let soundURL; let title; let previousURL;
    let imagePlay = "/content/images/play.svg";
    let imagePause = "/content/images/stop.svg";

    if(data.location.state.item) {
        currentSubtitle = data.location.state.item.subtitle;
        imageURL = data.location.state.item.image;
        theoryURL = data.location.state.item.url;
        soundURL = data.location.state.item.sound;
        title = data.location.state.title;
        previousURL = data.location.state.url;
    }

    const [theory, setTheory] = useState('');
    const [soundStatus, setSoundStatus] = useState('STOPPED');
    const [imageStatus, setImageStatus] = useState(imagePlay);
    const [soundStartPoint, setSoundStartPoint] = useState(0);

    useEffect(() => {
        fetch(theoryURL).then(response => response.text()).then(text => setTheory(text))
    }, []);

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
        <Breadcrumb>
            <Breadcrumb.Item href={previousURL}>{title}</Breadcrumb.Item>
            <Breadcrumb.Item href="#">{currentSubtitle}</Breadcrumb.Item>
        </Breadcrumb>
        {soundURL?
            <Card style={{ width: '80%', height: '100%',  marginLeft: "auto", marginRight: "auto"}}>
            <Card.Body>
                <Card.Text>Вы можете прослушать данную лекцию</Card.Text>
                <Container>
                <Row className="align-items-center">
                    <Col className="justify-content-center px-2">
                        <button className="btn btn-outline-secondary" onClick={soundClick}>
                            <img src={imageStatus} alt="Play voiceover" height='25' width="25"/>
                        </button>
                    </Col>
                    <Col xs={9} className="m-2">
                        <Sound 
                            volume={100} 
                            autoLoad={false} 
                            url={soundURL} 
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
        {theoryURL?
            <Card className="mt-3" style={{ width: '80%', height: '100%',  marginLeft: "auto", marginRight: "auto"}}>
            <Card.Body>
                <div className="d-flex justify-content-center" height="30%">
                    <div className="d-flex justify-content-center">
                        <Image variant="center" src={imageURL} width="60%"/>
                    </div>
                </div>
                    <Markdown>
                        {theory}
                    </Markdown>
            </Card.Body>
            </Card>:
            <div className="d-flex justify-content-center"><p>Упс, кажется лекция еще не готова</p></div>
        }
        </div>
    )
} 
export default WorkBook;