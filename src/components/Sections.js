import React, {useState, useEffect} from 'react';
import { Accordion, Card, Button, Breadcrumb } from 'react-bootstrap';
import { useRouteMatch, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const Sections = (data) => {

    const getCards = gql`
    query getCards {
        cards {
          url
          cardImage {
            url
          }
          cardName
          cardDescription
          theme {
            themeName
            test {
              testName
              tests
            }
            lectures {
              title
              lectureImage
              {
                url
              }
              lectureText
              lectureSound
              {
                url
              }
            }
          }
        }
      }
    `;
  
    const cardsArray = (useQuery(getCards));

    //Стейт для списка тем
    const [themes, setThemes] = useState([]);
    const [cardURL, setCardURL] = useState([]);
    const [cardName, setCardName] = useState([]);

    //Запросы к роуту страницы для дальнейшего поиска по номеру темы
    let url = useRouteMatch().url;

    useEffect(() => {
        if(data.location.state) {
            setThemes(data.location.state.themes);
            //setCardURL(data.location.state.url);
            setCardName(data.location.state.cardName);
        } else if (cardsArray.data) {
            let themesArray = cardsArray.data.cards.filter(card => card.url == url.substr(1)).theme;
            setThemes(themesArray);
            let cardName = cardsArray.data.cards.filter(card => card.url == url.substr(1)).cardName;
            setCardName(cardName);
        }
        
    }, [data.location.state, cardsArray]);

    return (
        <div>
        {
            themes?
            <div>
                <Breadcrumb>
                <Breadcrumb.Item href="#">{cardName}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="mx-4 my-4">
                    {
                        !themes || themes == [] ?
                        <div className="d-flex justify-content-center">
                            <p>Упс, кажется этот раздел еще не готов</p>
                        </div> 
                        :
                        <Accordion>
                        {
                            themes?
                            //Условный рендеринг после выполнения запроса и заполнения стейта
                            themes.map((item, key) => {
                                return(
                                    <Card key={key}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} align="left" variant="link" eventKey={key}>
                                                {item.themeName}
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    <Accordion.Collapse eventKey={key}>
                                        <Card.Body align="left"> 
                                        {
                                            item.lectures.map((item, key) => {
                                                return(
                                                    <p key={key}>
                                                        <Link 
                                                            to={{
                                                                pathname: `${url}/workbook`,
                                                                state: {
                                                                    currentSection: cardName,
                                                                    previousURL: url,
                                                                    title: item.title,
                                                                    lectureImage: item.lectureImage.url,
                                                                    lectureText : item.lectureText,
                                                                    lectureSound : item.lectureSound.url
                                                                }
                                                            }}>
                                                            {item.title}
                                                        </Link>
                                                    </p>
                                                )
                                            })
                                        }
                                       <Link 
                                            to={{
                                                pathname: `${url}/check`,
                                                state: {
                                                        testName: item.test.testName,
                                                        questions: item.test.tests,
                                                        url: url,
                                                        themeName: item.themeName,
                                                        sectionName: cardName 
                                                }
                                            }}>
                                            <Button variant="outline-secondary">Проверь себя</Button>
                                        </Link> 
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    </Card>
                                )
                            }) 
                            :   <div className="d-flex justify-content-center">
                                    <p>Упс, кажется этот раздел еще не готов</p>
                                </div> 
                        }
                        </Accordion> 
                    }
                </div>
            </div>
        :null
        }
        </div>
    )
    
}
export default Sections;