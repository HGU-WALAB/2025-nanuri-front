import { Col, Container, Row, Button } from "react-bootstrap";
import {mockItems} from "../../mocks/mockItems";
import Card from "react-bootstrap/Card";
import img from "../../assets/images/items/shirt.jpeg";
import React from "react";

function ReceivedSharing() {

    return (
        <>
            <Container className="my-5 col col-md-8 col-lg-8 col-xl-6">
                <Card>
                    <Card.Header as="h3" className="text-center">받은 나눔</Card.Header>
                    {mockItems.map((item, idx) => (
                        <Card.Body key={idx} className="border">

                            <Row>
                                <Col lg={3} className="mb-3">
                                    <Card.Img
                                        className="border rounded"
                                        variant="top"
                                        src={img} width={100}
                                        height={200}/>
                                </Col>
                                <Col xs={8} lg={6}>
                                    <Row>
                                        <Card.Title className="mb-3 fs-3">{item.title}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                    </Row>
                                </Col>
                                <Col xs={4} lg={3}>
                                </Col>
                            </Row>
                        </Card.Body>
                    ))}
                </Card>
            </Container>
        </>
    );
}

export default ReceivedSharing;