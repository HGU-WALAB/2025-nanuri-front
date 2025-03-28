import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Container, Row, Col, Breadcrumb} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axiosInstance from "../apis/axios";

function ItemDetail() {
    const {itemId} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [imageFiles, setImageFiles] = useState(null);

    const handleItemDelete = async () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                const response = await axiosInstance.delete(`/api/item/${itemId}`)
                console.log("아이템 삭제 성공: ", response);
                alert("물건이 삭제되었습니다.");
                navigate("/items");
            } catch (e) {
                console.log("아이템 삭제 실패: ", e);
            }
        }
    }

    const handleItemApply = () => {
        axiosInstance.post("/api/history", {itemId: itemId}).then(r => {
                alert("신청되었습니다.");
                navigate("/items");
            }
        )

    }

    const handleAddWish = () => {
        axiosInstance.post("/api/wish", {itemId: itemId}).then(r => {
            alert("위시 리시트에 등록되었습니다.");
        })
    }

    useEffect(() => {
        axiosInstance.get(`/api/item/${itemId}`).then(res => {
            setItem(res.data);
            console.log(res.data);
        })
    }, []);

    return (
        <>
            {item !== null
                ? <div className="mt-lg-5">
                    <Container className="col col-md-10 col-lg-8  bg-white p-5 border rounded shadow-sm mb-5">
                        <Row>
                            <Breadcrumb className="d-none d-sm-none d-md-none d-lg-block">
                                <Breadcrumb.Item onClick={() => {
                                    navigate("/")
                                }}>홈</Breadcrumb.Item>
                                <Breadcrumb.Item onClick={() => {
                                    navigate("/items")
                                }}>나눔 목록</Breadcrumb.Item>
                                <Breadcrumb.Item active>{item.title}</Breadcrumb.Item>
                            </Breadcrumb>

                            <Col xs={12} sm={12} md={12} lg={6}>
                                {/*{imageFiles ? <img className="border border-2 rounded w-100 h-75 mb-3" src={imageFiles} alt="image"/> : null}*/}
                                <img className="border border-2 rounded w-100 h-75 mb-3" src={item.images[0]}
                                     alt="image"/>
                                <h4>{item.nickname}</h4>
                            </Col>

                            <Col>
                                <h3>{item.title}</h3>
                                <p className="mb-5">{item.category} · {item.createdTime}</p>
                                <p className="mb-5">{item.description}</p>

                                <p className="h6 opacity-75"><small>관심 {item.wishCount} · 조회 {item.viewCount}</small>
                                </p>
                                {item.isOwner
                                    ?
                                    <Container className="d-flex justify-content-between p-0">
                                        <Button className="w-50 me-1" variant="outline-primary"
                                                onClick={() => navigate(`/updateItem/${item.id}`)}>수정하기</Button>
                                        <Button className="w-50 ms-1" variant="outline-danger" onClick={handleItemDelete}>삭제하기</Button>
                                    </Container>
                                    : <Container className="d-flex justify-content-between p-0">
                                        <Button className="w-50 me-1" variant="outline-primary" onClick={handleItemApply}>나눔 받기 신청</Button>
                                        <Button className="w-50 ms-1" variant="outline-secondary" onClick={handleAddWish}>위시 등록하기</Button>
                                    </Container>
                                }


                                {/*<div className="d-grid gap-2">*/}
                                {/*    <Button variant="outline-danger" onClick={handleItemDelete}>나눔 받기 신청</Button>*/}
                                {/*    <Button variant="outline-secondary" onClick={handleItemDelete}>위시 등록하기</Button>*/}
                                {/*</div>*/}
                            </Col>
                        </Row>

                    </Container>
                </div>
                : null
            }
        </>
    );
}


export default ItemDetail;