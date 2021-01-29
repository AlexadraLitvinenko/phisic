import React, {useState, useEffect} from 'react';
import {Breadcrumb, Card, Form, Button, OverlayTrigger, Popover} from 'react-bootstrap';

const Check = (data) => {

    let resultArrayForAlert = [];
    let resultStringForAlert;
    let title = data.location.state.testName;
    let subtitle = data.location.state.themeName;
    let previousURL = data.location.state.url;
    let sectionName = data.location.state.sectionName;

    const [test, setTest] = useState([]);
    const [checkVariants, setCheckVariants] = useState([]);

    useEffect(() => {
        setTest(data.location.state.questions)
    }, [data.location.state]);

    let checkResults = () => {
        let sampleArray = test.check_questions.map((item) => {
            return item.correct
        });
        
        let resultArray = [];
        let chacked = document.getElementsByName("checkbox");
        chacked.forEach((item) => {
            if(item.checked === true) resultArray.push(+item.attributes.value.textContent)
        })
        
        if(sampleArray.length === resultArray.length) {
            sampleArray.forEach((item, key) => {
                resultStringForAlert = undefined;
                
                if(item == resultArray[key]) resultArrayForAlert.push((key + 1) + " - Верный ответ");
                else {resultArrayForAlert.push((key + 1) + " - Неверный ответ");
                        setCheckVariants(resultArrayForAlert)
                }
            })
        }
        else setCheckVariants("Кажется Вы ответили не на все вопросы")
    };

    return (
        <div>
            <Breadcrumb>
            <Breadcrumb.Item href={previousURL}>{sectionName}</Breadcrumb.Item>
            <Breadcrumb.Item href={previousURL}>{subtitle}</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Проверь себя</Breadcrumb.Item>
            </Breadcrumb>
            <Card className="m-2">
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    {test.check_questions?
                        test.check_questions.map((item, key) => {
                            return(
                                <div key={key}>
                                    <Card.Text>
                                        {item.text}
                                    </Card.Text>
                                    <Form.Group controlId="formBasicCheckbox">
                                        {item.variants.map((item, key) => {
                                            return(
                                                <Form.Check
                                                    key={key}
                                                    name="checkbox"
                                                    type="checkbox"
                                                    className="my-1 mr-sm-2"
                                                    id="customControlInline"
                                                    label={item}
                                                    value={item}
                                                />
                                            )
                                    })}
                                    </Form.Group>
                                </div>
                        )})
                        :null
                    }
                    <OverlayTrigger
                        trigger="click"
                        key="right"
                        placement="right"
                        overlay={
                            <Popover id="popover-positioned-right">
                            <Popover.Title as="h3">Ваши результаты:</Popover.Title>
                            <Popover.Content>
                               {
                                   typeof(checkVariants) == "string"?
                                   checkVariants:
                                   checkVariants.map((item, key) => {
                                        return(
                                            <p key={key}>{item}</p>
                                        )
                                   })
                               }
                            </Popover.Content>
                            </Popover>
                        }
                        >
                        <Button variant="outline-secondary" onClick={checkResults}>Подтвердить ответы</Button>
                    </OverlayTrigger>
                </Card.Body>
            </Card>
        </div>
    )
}
export default Check;