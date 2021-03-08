import "./index.css";
import Popup from './js/components/popup'
import Header from './js/components/header';
import Form from './js/components/form';
import { getNews, signUp, signIn, getFavouritesCards } from './js/utils/functions';

if (window.location.toString().indexOf('saved')>0){
  const header = new Header();
  if (localStorage.token){
    header.setHeader({isLoggedIn: true, userName:localStorage.username});
  } else {
    header.setHeader({isLoggedIn: false, userName:''});
  }
  document.querySelector('.intro__owner').innerHTML=localStorage.username;
  getFavouritesCards();
} else {
  const popupItem = document.querySelector('.popup');
  const popup = new Popup(popupItem);
  const header = new Header(popup);
  
  if (localStorage.token){
    header.setHeader({isLoggedIn: true, userName:localStorage.username});
  } else {
    header.setHeader({isLoggedIn: false, userName:''});
  }

  const loginForm = new Form('form[name="login"]');
  loginForm.setEventListeners((e) => {signIn(e, popup, header)})
  const signupForm = new Form('form[name="signup"]');
  signupForm.setEventListeners((e) => {signUp(e, popup)})
  const searchForm = new Form('form.search__form');
  searchForm.setEventListeners((e) => {
    document.querySelector('.cards').style.display = 'block'; console.log(e); getNews(e.query)
  })
}