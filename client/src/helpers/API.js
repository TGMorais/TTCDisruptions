import 'whatwg-fetch'

export default class API {

  baseUrl;

  constructor( url ) {
      this.baseUrl = url;
  }

  get( url, id ) {
    return fetch( this.getUrl(url, id) )
          .then( this.toJson )
  }

  put( url, data ) {
    console.log("put", this.getUrl(url), data)
  }

  post( url, data ) {
    return fetch( this.getUrl(url), { method: "POST", body: JSON.stringify(data), headers:{ 'Content-Type': 'application/json'} } )
            .then( this.toJson )
  }

  delete( url, id ){
    return fetch( this.getUrl(url, id), { method: "DELETE" } )
            .then( this.toJson )
  }

  //todo handle multiple params (via ...params?)
  getUrl( url, id ) {
    return `${this.baseUrl}/${url}${id ? '/'+id : ''}`;
  }


  parseResponse( response ) {
    console.log(response)
  }

  //fetch does not reject on unsuccesfull Request (https://github.com/github/fetch/issues/155)
  toJson( response ) {
    if( response.status === 404 || response.status === 500 ) {
      return response.json().then( e => Promise.reject(e) )
    }
    else {
      return response.json()
    }
  }
}
