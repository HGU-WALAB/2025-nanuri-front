import React, {useEffect, useState} from "react";
import {Col, Container, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axiosInstance from "../apis/axios";

function Profile() {
    const [user, setUser] = useState({
        uniqueId: '',
        name: '',
        department: '',
        nickname: '',
    });
    const [disable, setDisable] = useState(true);

    const onChange = (e) => {
        const {value, name} = e.target;
        setUser({...user, [name]: value,});
    };

    const handleChangeNickname = async () => {
        if (window.confirm("정말로 닉네임을 변경하시겠습니까?")) {
            await axiosInstance.patch("/api/user", {nickname: user.nickname})
            alert("변경되었습니다.");
            window.location.reload();
        }
    }

    const getUser = async () => {
        const response = await axiosInstance.get("/api/user");
        setUser(response.data);
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="my-5 pt-5">
            <Container className="col col-md-8 col-lg-6 col-xl-4 bg-white p-5 border rounded shadow">
                <h2 className="mb-5 text-center">프로필 정보</h2>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>이름</Form.Label>
                        <Form.Control type="text" value={user.name} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>학번</Form.Label>
                        <Form.Control type="text" value={user.uniqueId} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>학부</Form.Label>
                        <Form.Control type="text" value={user.department} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>닉네임</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control type="text" name="nickname" value={user.nickname} onChange={onChange}
                                              disabled={disable}/>
                            </Col>
                            <Col>
                                {disable
                                    ? <Button variant="outline-secondary" onClick={() => setDisable(!disable)}>수정</Button>
                                    : <>
                                        <Button variant="outline-secondary"
                                                onClick={() => setDisable(!disable)}>취소</Button>
                                        <Button variant="outline-primary" className="mx-2"
                                                onClick={handleChangeNickname}>변경</Button>
                                    </>
                                }
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Container>

            <div style={{height: '10vh'}}></div>
        </div>
    )
}

export default Profile;