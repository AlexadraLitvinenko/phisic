import React, {useState, useEffect} from 'react';
import { Accordion, Card, Button, Breadcrumb } from 'react-bootstrap';
import { useRouteMatch, Link } from 'react-router-dom';

const Sections = () => {

    //Стейты для контента и для списка тем
    const [cards, setCards] = useState([]);
    const [themes, setThemes] = useState([]);

    //Запросы к роуту страницы для дальнейшего поиска по номеру темы
    let { url } = useRouteMatch();
    let sectionNumber = useRouteMatch().params.sectionNumber;

    //Запрос к json файлу конфигурации контента
    useEffect(() => {
        fetch("/content/cards/cards.json")
            .then(response => response.json())
            .then(result => setCards(result.cardsArray))
    }, []);

    //Поиск по массиву необходимой темы и заполнение стейта списка тем
    useEffect(() => {
        setThemes(cards.filter(item => item.id === +sectionNumber));
    }, [cards, sectionNumber]);

    return (
        <div>
        {
            themes[0]?
            <div>
                <Breadcrumb>
                <Breadcrumb.Item href="#">{themes[0].title}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="mx-4 my-4">
                    {
                        themes[0].themes == 0?
                        <div className="d-flex justify-content-center">
                            <p>Упс, кажется этот раздел еще не готов</p>
                        </div> 
                        :
                        <Accordion>
                        {
                            //Условный рендеринг после выполнения запроса и заполнения стейта
                            themes[0].themes.map((item, key) => {
                                return(
                                    <Card key={key}>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} align="left" variant="link" eventKey={key}>
                                                {item.title}
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    <Accordion.Collapse eventKey={key}>
                                        <Card.Body align="left"> 
                                        {
                                            item.subtitles.map((item, key) => {
                                                return(
                                                    <p key={key}>
                                                        <Link 
                                                            to={{
                                                                pathname: `${url}/workbook`,
                                                                state: {
                                                                    item, 
                                                                    title: themes[0].title,
                                                                    url: url
                                                                }
                                                            }}>
                                                            {item.subtitle}
                                                        </Link>
                                                    </p>
                                                )
                                            })
                                        }
                                        <Link 
                                                            to={{
                                                                pathname: `${url}/check`,
                                                                state: {
                                                                    item, 
                                                                    title: themes[0].title,
                                                                    url: url,
                                                                    checkURL: item.check_yourself
                                                                }
                                                            }}>
                                                            <Button variant="outline-secondary">Проверь себя</Button>
                                                        </Link>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    </Card>
                                )
                            })
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