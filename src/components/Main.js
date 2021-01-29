import React from 'react';
import {Link} from 'react-router-dom';
import {Image, Card} from 'react-bootstrap';
import { useQuery, gql } from '@apollo/client';

const Main = () => {
    //Запрос к json файлу конфигурации контента
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
    
        return (
        <div>
            <section >
                    <div class="pt-4 text-center">
                        <h2>Добро пожаловать на портал для изучения физики!</h2>
                        <p class="lead">Тут можно добавить любую информацию о портале, его назначении, авторах и т.д</p>
                    </div>
            </section>
            <section>
                <div className="d-flex flex-row flex-wrap justify-content-center align-items-stretch p-4" style={{ minHeight: "100%"}}>
                    {
                        cardsArray.data?
                        //Рендер массива карточек из стейта
                        cardsArray.data.cards.map((item, key) => {
                            return (
                                <div key={key} className="col-md-4 mb-4">
                                        <Card className="card shadow-sm text-center" style={{height: "100%"}}>
                                            <Card.Header>
                                            <Image className="pb-2" style={{maxHeight: "64pt"}} src={item.cardImage.url} />
                                                <Card.Subtitle>
                                                    {item.cardName}
                                                </Card.Subtitle>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    {item.cardDescription}
                                                </Card.Text>
                                            </Card.Body>
                                            <Link to={{
                                                    pathname: "/" + item.url,
                                                    state: {
                                                        cardName: item.cardName,
                                                        cardURL: item.url,
                                                        themes: item.theme
                                                    }
                                            }}>
                                            <Card.Footer className="text-muted">Подробнее</Card.Footer>
                                            </Link>
                                        </Card>
                                </div>
                        )
                    }) 
                    : <img src="../loading.gif" stwidth="64" height="64" frameBorder="0" allowFullScreen alt="loading"/>
                    }   
                </div>  
            </section>
        </div>
    )
};
export default Main;
