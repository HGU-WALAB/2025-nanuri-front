import {Col, Container, Row, Button} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import React, {useEffect, useState} from "react";
import {Drawer} from "antd";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../apis/axios";

function Sharing() {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState(null);
    const [open, setOpen] = useState(false);
    const [applicantList, setApplicantList] = useState([]);

    const onClickCard = (itemId) => {
        navigate(`/item/${itemId}`)
    };

    const getApplicant = (itemId) => {
        setOpen(true);
        axiosInstance.get(`/api/history/${itemId}`).then((res) => {
            setApplicantList(res.data);
        })
        console.log(applicantList);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axiosInstance.get("/api/items/shared", {params: {done : false}}).then((res) => {
                setItemList(res.data);
            }
        )
    }, [])

    return (
        <>
            <Container className="p-0 mt-md-0 mt-lg-4 col-md-10 col-lg-8 col-xl-6">
                <Card>
                    <Card.Header as="h2" className="text-center py-3">나눔 중</Card.Header>
                    {itemList === null
                        ? null
                        : itemList.map((item, idx) => (
                            <Card.Body key={idx} className="border">

                                <Row className="m-3">
                                    <Col xs={0} sm={0} md={3} lg={3} xl={4}
                                         style={{cursor: "pointer"}}
                                         onClick={() => onClickCard(item.itemId)}>
                                        <Card.Img
                                            className=""
                                            variant="top"
                                            src={item.image} width={100}
                                            height={200}/>
                                    </Col>

                                    <Col xs={0} sm={0} md={6} lg={6} xl={5}
                                         className="my-3 my-md-0"
                                         style={{cursor: "pointer"}}
                                         onClick={() => onClickCard(item.itemId)}>
                                        <Card.Title className="mb-1 fs-4">{item.title}</Card.Title>
                                        <Card.Text className="opacity-75">
                                            <p>{item.category} · {item.createdTime}</p>
                                            <p>{item.description}</p>
                                        </Card.Text>
                                    </Col>

                                    <Col className="d-grid d-md-flex align-items-md-end justify-content-md-end">
                                        <Button variant="outline-primary" onClick={() => getApplicant(item.itemId)}
                                                style={{whiteSpace: "nowrap"}}>
                                            신청자 보기
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        ))}

                    <Drawer title="나눔 받기 신청자" onClose={onClose} open={open}>
                        {
                            applicantList.map((applicant, idx) => (
                                <Row className="mb-3 p-2" key={idx}>
                                    <Col xs={5} sm={5} className="fs-5 p-0 d-flex align-items-center">
                                        <span>{applicant.nickName}</span>
                                    </Col>

                                    <Col xs={4} sm={4} className="d-flex justify-content-end align-items-center">
                                        <span className="opacity-75">{applicant.applicationTime}</span>
                                    </Col>

                                    <Col className="p-0 d-flex justify-content-end align-items-center">
                                        <Button
                                            className=""
                                            variant="primary"
                                            style={{whiteSpace: "nowrap"}}>
                                            채팅하기
                                        </Button>
                                    </Col>
                                </Row>
                            ))
                        }
                    </Drawer>
                </Card>
            </Container>
        </>
    );
}

export default Sharing;