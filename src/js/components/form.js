class Form{
  constructor(formSelector){
    this._form = document.querySelector(formSelector);
    this._submitButton = this._form.querySelector('button');
    this._inputsAll = this._form.querySelectorAll('input');
    this._validateForm = this._validateForm.bind(this);
    this._validateInputElement = this._validateInputElement.bind(this);
    this._getInfo = this._getInfo.bind(this);
    this._clear = this._clear.bind(this);
  }

  _validateInputElement(input){
    const text = input.value;
    if (input.classList.contains('search__input')){
        return true;
    }
    switch (input.type) {
      case "email":{
        let regexp = /\S+@\S+\.\S+/;
        return regexp.test(text);
      } case "password": {
          return (text.length >= 8)
      } case "text":{
          return (text.length>=2 && text.length<=30)
      } default:{
          return true
      }
    }
  }

  _validateForm(){
    let isFormValid = true;
    this._inputsAll.forEach((input)=>{
        isFormValid = isFormValid && this._validateInputElement(input);
    });
    this._submitButton.disabled = !isFormValid;
    if (isFormValid) {
      this._submitButton.classList.add('form__button_active');
    } else {
      this._submitButton.classList.remove('form__button_active');
    }
  }

  _getInfo(){
    const info = {};
    this._inputsAll.forEach((input)=>{
        info[input.dataset.propname] = input.value;
    });
    return info;
  }

  _clear(){
      this._inputsAll.forEach((input) => { input.value='';});
  }

  setEventListeners(submitEvent){
    this._inputsAll.forEach((input) => {
      input.addEventListener('input', this._validateForm)
    });
    this._form.addEventListener('submit',(event)=>{
      event.preventDefault();
      submitEvent(this._getInfo());
    })
  }

  removeEventListeners () {
    this._inputsAll.forEach((input) => {
      input.removeEventListener('input', this._validateForm);
    });
  };
}

export default Form;