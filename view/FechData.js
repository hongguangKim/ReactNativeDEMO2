

module.exports class FechData{
  export default function urlForQueryAndPage(key, value, pageNumber) {
        var data = {
            country: 'uk',
            pretty: '1',
            encoding: 'json',
            listing_type: 'buy',
            action: 'search_listings',
            page: pageNumber
        };
        data[key] = value;
        var querystring = Object.keys(data)
          .map(key => key + '=' + encodeURIComponent(data[key]))
          .join('&');
        return 'http://api.nestoria.co.uk/api?' + querystring;
      };

  export default  function	_executeQuery(query) {
      var list;
      console.log(query);
      fetch(query)
      .then(response => response.json())
      .then(json =>  list=json.response.listings)
      .catch();
      retunr list;
    };

  export default  function fetchData(i){
      var query = urlForQueryAndPage('place_name',tabItems[i].title, 1);
      this._executeQuery(query);
      InteractionManager.runAfterInteractions(()=>{
        console.log('InteractionManager....MyMessage');
      });
      this.setState({currentIndex:i});
    };
}
module.exports = FechData;