import {API_KEY, NEWS_API_MAIN_URL} from '../constants/constants'

class NewsApi{
  constructor(from, to, sortBy, pageSize, language) {
    this.from = from;
    this.to = to;
    this.sortBy = sortBy;
    this.pageSize = pageSize;
    this.language = language;
    this.apiKey = API_KEY;
  }

  async getNews(item){
    const query = item || '*';
    const url = `${NEWS_API_MAIN_URL}?apiKey=${this.apiKey}&q=${query}&from=${this.from}&to=${this.to}&sortBy=${this.sortBy}&pageSize=${this.pageSize}`;
    const res = await fetch(url);
    if (!res.ok){
        throw new Error(res.status);
    }
    return  await res.json();
  }
}

export default NewsApi