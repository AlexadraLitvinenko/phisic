import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Image, Card} from 'react-bootstrap';

const Main = () => {
    //Стейт для контента главной страницы
    const [cards, setCards] = useState([]);

    //Запрос к json файлу конфигурации контента
    useEffect(() => {
        fetch("/content/cards/cards.json")
            .then(response => response.json())
            .then(result => setCards(result.cardsArray))
    }, []);
    
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
                        //Рендер массива карточек из стейта
                        cards.map((item, key) => {
                            return (
                                <div key={key} className="col-md-4 mb-4">
                                        <Card className="card shadow-sm text-center" style={{height: "100%"}}>
                                            <Card.Header>
                                            <Image className="pb-2" style={{maxHeight: "64pt"}} src={item.image} />
                                                <Card.Subtitle>
                                                    {item.title}
                                                </Card.Subtitle>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Text>
                                                    {item.text}
                                                </Card.Text>
                                            </Card.Body>
                                            <Link to={"/" + item.id}>
                                            <Card.Footer className="text-muted">Подробнее</Card.Footer>
                                            </Link>
                                        </Card>
                                </div>
                        )
                    }) 
                    }   
                </div>  
            </section>
        </div>
    )
};
export default Main;
