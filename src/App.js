import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {RecoilRoot} from "recoil";
import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import LoginIng from "./services/LoginIng";
import PrivateRoute from "./services/PrivateRoute";
import Items from "./pages/Items";
import MySharing from "./pages/MySharing";
import Chat from "./pages/Chat";
import Ranking from "./pages/Ranking";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import AddItem from "./pages/AddItem";
import ItemDetail from "./pages/ItemDetail";
import UpdateItem from "./pages/UpdateItem";

function App() {

    return (
        <div style={{backgroundColor: '#F5F7FA'}}>
            <RecoilRoot>
                <BrowserRouter>
                    <Header/>

                    <Routes>
                        {/* 인증여부가 상관없는 페이지 */}
                        <Route path={process.env.REACT_APP_DEPLOY_URL} element={<Main/>}/>
                        <Route path={process.env.REACT_APP_DEPLOY_URL + "nanuri/callback"} element={<LoginIng/>}/>
                        <Route path={process.env.REACT_APP_DEPLOY_URL + "signup"} element={<Signup/>}/>
                        {/* 인증을 해야만 접속 가능한 페이지 */}
                        <Route element={<PrivateRoute/>}>
                            <Route path={process.env.REACT_APP_DEPLOY_URL + "items"} element={<Items/>}/>
                            <Route path={process.env.REACT_APP_DEPLOY_URL + "item/:itemId"} element={<ItemDetail/>}/>
                            <Route path={process.env.REACT_APP_DEPLOY_URL + "addItem"} element={<AddItem/>}/>
                            <Route path={process.env.REACT_APP_DEPLOY_URL + "updateItem/:itemId"} element={<UpdateItem/>}/>
                            <Route path={process.env.REACT_APP_DEPLOY_URL + "mysharing"} element={<MySharing/>}/>
                            <Route path={process.env.REACT_APP_DEPLOY_URL + "chat"} element={<Chat/>}/>
                            <Route path={process.env.REACT_APP_DEPLOY_URL + "ranking"} element={<Ranking/>}/>
                            <Route path={process.env.REACT_APP_DEPLOY_URL + "profile"} element={<Profile/>}/>
                        </Route>
                    </Routes>

                    <Footer/>
                </BrowserRouter>
            </RecoilRoot>
        </div>
    );
}

export default App;
