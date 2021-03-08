import {date} from '../utils/functions'

class NewsCard{
  constructor(info){
      this._info = info;
  }

  renderCard(){
    const {
      urlToImage,
      publishedAt,
      title,
      description,
      url,
      source,
      number,
      id} = this._info

    const dispDate = date(publishedAt);
    let flag = 'cards__flag';
    flag += id ? ' cards__trash' :''
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('cards__item')
    const card = `
        <div  data-id=${number} class='${flag}'></div>
        <img src=${urlToImage} alt="${flag}" class="cards__image">
        <div class="cards__text-block">
            <p class="cards__date">${dispDate}</p>
            <h2 class="cards__title">${title}</h2>
            <p class="cards__text">${description}</p>
            <p >
                <a class="cards__source" href=${url} target="_blank">${source.name}</a>
            </p>
        </div>
    `;
    cardDiv.innerHTML = card;
    return cardDiv
  }

}

export default NewsCard;