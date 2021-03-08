class MainApi{
  constructor(){
      this._mainApiUrl = "https://nightsonne-newsapi.students.nomoreparties.xyz";
  }

  async _postData(url, data){
    const res = await fetch(url, data);
    if (!res.ok){
      throw new Error(res.status);
    }

    return await res.json();
  }

  async signup(user) {
    const url = this._mainApiUrl + '/signup';
    const data = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
    return await this._postData(url, data);
  }

  async signin(user) {
    const url = this._mainApiUrl + '/signin';
    const data = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      }
    }
      return await this._postData(url, data);
  }

  async getUserData(token) {
    const url = this._mainApiUrl + '/users/me';
    const data = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    }
    return await this._postData(url, data);
  }

  async getArticles(token) {
    const url = this._mainApiUrl + '/articles';
    const data = {
      headers:{
        'authorization': `Bearer ${token}`
      }
    }
    return await this._postData(url, data)
  }
  async createArticle(article, token) {
    const url = this._mainApiUrl + '/articles';
    const data = {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    }
    return await this._postData(url, data)
  }

  async deleteArticle(id, token) {
    const url = this._mainApiUrl+'/articles/'+id;
    const data = {
      method: 'DELETE',
      headers:{
        'authorization': `Bearer ${token}`
      }
    }
    return await this._postData(url, data)
  }
}

export default MainApi;