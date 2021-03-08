import {logout} from '../utils/functions'

class Header{
  constructor(popup = null, color = "") {
      this._color = color;
      this._popup = popup;
      this._openPopup = this._openPopup.bind(this)
      this.setHeader = this.setHeader.bind(this);
  }

  setHeader(props){
    const {isLoggedIn, userName} = props;
    const header = document.querySelector('.header');
    const phoneMenu = document.querySelector('.phone-menu');
    const logoutIcons = header.querySelectorAll('.header__logout-icon');
    const navIcon = document.querySelector('.header__nav-icon');

    navIcon.addEventListener('click',() => {
      phoneMenu.style.display='block';
    })
    document.querySelector('.phone-menu__close').addEventListener('click',() => {
      phoneMenu.style.display = 'none'
    })

    if (this._color){
      header.classList.add(this._color);
    }

    if (isLoggedIn){
      document.querySelectorAll('.header__auth-name').forEach((item) => {
        item.innerHTML = userName;
      })
      logoutIcons.forEach((item)=>{
        item.style.display = "inline"
        item.addEventListener('click',() => {logout(this)});
      });
          document.querySelectorAll('.header__auth').forEach((item) => {
            item.removeEventListener('click',this._openPopup);
          })
      document.querySelector('.header__item_main:nth-child(2)').style.display = 'block'
    } else {
      document.querySelectorAll('.header__auth-name').forEach((item) => {
        item.innerHTML = 'Авторизоваться';
      })
      logoutIcons.forEach((item)=>{
        item.style.display = "none"
      });
        document.querySelector('.header__item_main:nth-child(2)').style.display = 'none'

      if (this._popup){
        document.querySelectorAll('.header__auth').forEach((item) => {
          item.addEventListener('click', this._openPopup);
      })
    }
  }
}

  _openPopup(event){
    if (!event.target.classList.contains('header__logout-icon')){
      this._popup.open()
    }
  }
}

export default Header;