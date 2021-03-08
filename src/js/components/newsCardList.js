import NewsCard from './newsCard';
import { NEWS_START_COUNT } from '../constants/constants';
import { makeFavouritesCards } from '../utils/functions'

class NewsCardList{
  constructor(cards){
      this._cardsList = document.querySelector('.cards__list');
      this._cardsContainer = document.querySelector('.cards__container');
      this._counter = 0;
      this._query= '*'
      this.cards = cards;
      this.renderResults = this.renderResults.bind(this);
      this.toggleMore = this.toggleMore.bind(this)
      this.showMore = this.showMore.bind(this);
  }

  setArticles(cards, query=''){
    this._counter = 0;
    this._cards = cards;
    this._query = query
  }

  renderResults(){
    const {_cards, _cardsList, _counter} = this;
    if (_cards.length !==0 ){
      if (_counter===0){ _cardsList.innerHTML='' }

      if (window.location.toString().indexOf('saved')>0){
        _cards.forEach((item, j)=>{
          const card = new NewsCard({
            ..._cards[j],
            number:j
          });

          _cardsList.appendChild(card.renderCard())
        })
      } else {
        for (let i = _counter; i <_cards.length && i <_counter + NEWS_START_COUNT ; ++i){

            const card = new NewsCard({..._cards[i],number:i});
            _cardsList.appendChild( card.renderCard())
        }
      }

      this._counter = _counter + NEWS_START_COUNT;
    } else {
      _cardsList.innerHTML=(
          `<div></div>
        <div class="cards__not-found">
          <div class="cards__not-found-image"></div>
          <p class="cards__not-found-title">Ничего не найдено</p>
          <p class="cards__not-found-text">К сожалению по вашему запросу
            ничего не найдено.</p>
        </div>`)
    }

    _cardsList.querySelectorAll('.cards__flag').forEach((item)=>{
      item.addEventListener('click',(event)=>{
        makeFavouritesCards(event, {
          ...this._cards[event.target.dataset.id],
          keyword: this._query
        })
      })
    })
    return _cardsList;
  }

  toggleMore(){
    document.querySelector('.cards__button').disabled = !(this._counter < this._cards.length);
  }

  showMore(){
    if (this._counter < this._cards.length){
      const results = this.renderResults();
      this.toggleMore();
      return results;
    }
  }

  renderLoader(){
    this._cardsList.innerHTML=(
      `<div></div>
      <div class="cards__loading">
          <div class="cards__preloader"></div>
          <p class="cards__loading-title">Идет поиск новостей...</p>
      </div>`)
  }
}

export default NewsCardList;