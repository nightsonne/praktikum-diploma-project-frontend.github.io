import NewsApi from '../api/newsApi';
import MainApi from '../api/mainApi'
import NewsCardList from '../components/newsCardList';
import {RESULT_COUNT} from '../constants/constants';

const date = (rawDate) => {
  const date = new Date(rawDate);
  const day = (date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate();
  const month = (date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1;
  const year = date.getFullYear();
  return day + '.' + month + '.' + year;
}
const apiDate = (date) => {
  const day = (date.getDate() < 10) ? ('0' + date.getDate()) : date.getDate();
  const month = (date.getMonth() + 1 < 10) ? ('0' + (date.getMonth() + 1)) : date.getMonth() + 1;
  const year = date.getFullYear();
  return year + '-' + month + '-' + day;
}

const getNews = (query) => {
  const date = new Date();
  const dateFrom =  new Date(date - 24*7*60*60*1000);
  const newsApi = new NewsApi(
    apiDate(dateFrom),
    apiDate(date),
    "publishedAt",
    RESULT_COUNT,
    "ru"
  )
  const cardsList = document.querySelector('.cards__list')
  const newsCardList = new NewsCardList([]);
  newsCardList.renderLoader();

  newsApi.getNews(query)
    .then((result)=>{
        newsCardList.setArticles(result.articles, query);
        newsCardList.renderResults();
        document.querySelector('.cards__button').addEventListener('click', newsCardList.showMore)
        newsCardList.toggleMore()
    })
    .catch((err)=>{
      cardsList.innerHTML = "Произошла ошибка при загрузке статей"
        console.error(err)
    })
}

const signUp = (data, popup)=>{
  const mainApi = new MainApi();
  mainApi.signup(data)
    .then((res)=>{
        popup.setContent("popup__success");
    })
    .catch((err)=>{
        popup.setContent("popup__error");
    })
}

const signIn = (data, popup, header) => {
  const mainApi = new MainApi();
  mainApi.signin(data)
    .then((res)=>{
      console.log(res, data);
      localStorage.setItem('token',res.token);
      mainApi.getUserData(res.token)
        .then(res=>{
          console.log(res.name);
          localStorage.setItem('username',res.name)
          header.setHeader({isLoggedIn: true, userName:res.name});
        })
        popup.close();
    })
    .catch((err)=>{
        console.error(err)
        popup.setContent("popup__error");
    })
}
const logout = (header) => {
  localStorage.removeItem('token'),
  localStorage.removeItem('username')
  header.setHeader({isLoggedIn: false, userName:''});
}

const makeFavouritesCards = (event, article) => {
    const mainApi = new MainApi();
    const token = localStorage.token;
    if ( !event.target.classList.contains('cards__trash')){
      const articleItem = {
        keyword: article.keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
      }
      console.log(articleItem)
      mainApi.createArticle(articleItem, token)
        .then((res)=>{
          event.target.classList.toggle('cards__flag-marked');
        })
        .catch((err)=>{
            console.error(err)
        })
    }
    else{
      mainApi.deleteArticle(article.id,token)
        .then((res)=>{
          event.target.classList.toggle('cards__flag-marked');
          event.target.closest('.cards__item').remove()
        })
        .catch((err)=>{
            console.error(err)
        })
    }
}

const getFavouritesCards = ()=>{
  const mainApi = new MainApi();
  const token = localStorage.token;
  const newsCardList = new NewsCardList([]);
  newsCardList.renderLoader();
  document.querySelector('.cards').style.display = 'block';
  mainApi.getArticles(token)
    .then((res)=>{
      console.log(res.data)
        document.querySelector('.intro__title_count').innerHTML = res.data.length;
        const keywords = new Set();
        const articleItem = res.data.map((item) => {
          keywords.add(item.keyword)
          return {
            title: item.title,
            description: item.text,
            publishedAt: item.date,
            source: {name:item.source},
            url: item.link,
            urlToImage: item.image,
            id: item._id
          }
        });

    const tags = document.querySelector('.intro__subtitle_tags')
    const keywordsArray = Array.from(keywords);
    let count = keywordsArray.length;
    tags.innerHTML = [keywordsArray[0],keywordsArray[1]].join(', ')
    let otherKeywordsCount = count - 2;
    document.querySelector('.intro__subtitle_tags-count').innerHTML =
    (otherKeywordsCount < 1) ? '' :
    (otherKeywordsCount == 1) ? ` и ещё ${otherKeywordsCount}-му` : ` и ${otherKeywordsCount}-м другим`
    newsCardList.setArticles(articleItem);
    newsCardList.renderResults();
  })
}

export { apiDate, getNews, date, signUp, signIn, logout, makeFavouritesCards, getFavouritesCards }