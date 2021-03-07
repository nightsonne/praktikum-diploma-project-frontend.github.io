class Popup{
  constructor (popupItem){
    this._popupItem = popupItem;
    this._popupItem.querySelectorAll('.popup__close').forEach((item) => {
        item.addEventListener('click',()=>{
          this.close()
        })
    })

    this._popupItem.querySelectorAll('.popup__link').forEach((item) => {
      item.addEventListener('click',(event)=>{
          this.setContent(event.target.dataset.action);
      })
    })
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  setContent(contentId){
    const innerPopup = this._popupItem.querySelectorAll('.popup__content');
    innerPopup.forEach((item)=>{
      if (item.id == contentId){
          item.classList.remove('popup__content_hide');
      }
      else{
          item.classList.add('popup__content_hide');
      }
    })
  }

  open(){ this._popupItem.classList.add('popup_is-opened');}

  close(){ this._popupItem.classList.remove('popup_is-opened');}
}

export default Popup