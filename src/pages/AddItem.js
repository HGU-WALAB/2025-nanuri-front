import {Container, Row, Col, Form, Image, Button} from "react-bootstrap";
import {Carousel} from 'antd';
import {Fragment, useRef, useState} from "react";
import {AiOutlinePicture} from "react-icons/ai";
import axiosInstance from "../apis/axios";
import styled from "styled-components";
import {mockCategory} from "../mocks/fixtures/mockCategory";
import {useNavigate} from "react-router-dom";

function AddItem() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        category: "",
        place: "",
        description: "",
    });
    const {title, place, category, description} = inputs;
    const categoryList = mockCategory.slice(1, mockCategory.length);

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({...inputs, [name]: value});
    }

    const imageRef = useRef(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const onChangeRadio = (label, e) => {
        setSelectedCategory(Number(e.target.value));

        const {name} = e.target;
        setInputs({...inputs, [name]: label});
    }

    const addImageFile = (e) => {
        const images = e.target.files;

        if (images) {
            setImageFiles(images);
            setPreviews([]);

            for (let i = 0; i < images.length; i++) {
                const reader = new FileReader();
                reader.readAsDataURL(images[i]);
                reader.onloadend = () => {
                    if (reader.result) {
                        setPreviews(prev => [...prev, reader.result]);
                    }
                };
            }
        }

        // console.log("imageFiles: ", imageFiles.concat(images));
        // console.log("images: ", images[0]);
    };

    const removeImageFile = (idx) => {
        setImageFiles(previews.filter((e, i) => i !== idx));
        setPreviews(previews.filter((e, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(imageFiles.length === 0) {
            alert("이미지를 등록해주세요.");
            return;
        }
        if (!category) {
            alert("카테고리를 선택해주세요.");
            return;
        }

        const formData = new FormData();
        Array.from(imageFiles).forEach((file) => {
            formData.append("files", file);
        });

        // https://selfdevelopcampus.tistory.com/entry/React-Axios-Post-FormData-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%9E%91-JSON-%EA%B0%99%EC%9D%B4-%EB%B3%B4%EB%82%B4%EA%B8%B0-%EC%97%90%EB%9F%AC-%EC%97%84%EC%B2%AD-%EB%82%9C-%ED%9B%84%EA%B8%B0
        // const formData = new FormData();
        // const json = JSON.stringify(inputs);
        // const blob = new Blob([json], {
        //     type: "application/mocks",
        // });
        // formData.append("createMenuDto", blob);
        // formData.append('files', imageFiles);
        //
        // console.log(imageFiles);
        // console.log(formData);
        // console.log(inputs);

        axiosInstance.post("/api/item", inputs).then((response) => {
            if (response.status === 200) {
                const itemId = response.data.itemId;

                axiosInstance.post(`/api/image/${itemId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }).then((res) => console.log(res))

                alert("물건이 등록되었습니다.");
                navigate("/items")
            } else {
                alert("등록 오류가 발생했습니다. 다시 시도해주세요.");
                window.location.reload();
            }
        });
    }

    return (
        <>
            <Container className="mt-5">
                <h1 className="text-center mb-5">나의 물건 나눔</h1>
                {/*<h2>이미지: {imageFiles.length}개</h2>*/}
                {/*<h2>미리보기: {previews.length}개</h2>*/}
                <Row>
                    <Col className="mb-3 px-5" md={0} lg={6}>
                        {
                            previews && previews.length
                                ? <Container>
                                    <Carousel arrows autoplay className="text-black">
                                        {previews.map((img, i) => (
                                            <div key={i}>
                                                <div className="d-flex justify-content-end">
                                                    <Button
                                                        style={{position: 'absolute', zIndex: "10"}}
                                                        className="m-2"
                                                        variant="outline-danger"
                                                        onClick={() => removeImageFile(i)}
                                                    >X</Button>
                                                </div>
                                                <Image className="w-100"
                                                       src={img}
                                                       alt={img}
                                                       style={{
                                                           height: '45vh',
                                                           objectFit: "fill",
                                                           // backgroundColor: "grey"
                                                       }}
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </Container>
                                : <Container className="d-flex justify-content-center align-items-center mt-4" style={{
                                    height: '45vh',
                                    backgroundColor: "lightgrey"
                                }}><AiOutlinePicture size="100" color="#555"/></Container>
                        }
                    </Col>
                    <Col>
                        <Container className="d-flex justify-content-end">
                            <Button variant="outline-primary"
                                    onClick={() => {
                                        imageRef.current?.click();
                                    }}>
                                이미지 업로드
                            </Button>
                        </Container>
                        <Container className="d-flex justify-content-center mb-3">

                            <input
                                className="hidden"
                                id="imageInput"
                                accept=".png, .jpeg, .jpg"
                                type="file"
                                onChange={addImageFile}
                                ref={imageRef}
                                style={{display: 'none'}}
                                multiple
                            />
                        </Container>

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label column="md">제목</Form.Label>
                                <Form.Control type="text" name="title" placeholder="글 제목" value={title}
                                              onChange={onChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label column="md">카테고리</Form.Label>
                                <RadioWrap>
                                    <Row xs={3} md={4} lg={3} xl={4}>
                                        {
                                            categoryList.map((category, idx) => (
                                                <Col key={idx}>
                                                    <label>
                                                        <input
                                                            type='radio'
                                                            name='category'
                                                            value={idx}
                                                            onChange={(e) => onChangeRadio(category.label, e)}
                                                            style={{whiteSpace: "nowrap"}}
                                                            checked={idx === selectedCategory}
                                                        />
                                                        <span className='category'
                                                              style={{
                                                                  border: idx === selectedCategory ? '1px solid #95a5bd' : '1px solid lightgray',
                                                                  backgroundColor: idx === selectedCategory ? '#95a5bd' : 'lightgray'
                                                              }}
                                                        >{category.label}</span>
                                                    </label>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </RadioWrap>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label column="md">장소</Form.Label>
                                <Form.Control type="text" name="place" placeholder="장소" value={place}
                                              onChange={onChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label column="md">자세한 설명</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="게시글 내용을 작성해 주세요." name="description"
                                              value={description} onChange={onChange}></Form.Control>
                            </Form.Group>
                            {/*<Form.Group className="mb-3">*/}
                            {/*    <Form.Label column="md">카테고리</Form.Label>*/}
                            {/*    <Form.Control type="text" name="category" placeholder="카테고리" value={category}*/}
                            {/*                  onChange={onChange}></Form.Control>*/}
                            {/*</Form.Group>*/}


                        </Form>
                    </Col>
                </Row>

                <div className="d-flex justify-content-center my-5">
                    <button type="submit" className="btn btn-primary justify-content-center"
                            onClick={handleSubmit}>나눔 글 올리기
                    </button>
                </div>
            </Container>
        </>
    );
}

export default AddItem;

const RadioWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;

    input {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

    .category {
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        font-size: 14px;
        text-align: center;
        padding: 4px 16px;
    }
`