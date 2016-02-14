import {observable} from 'mobservable'
import Cache from '../helpers/Cache'

class AppStore {

  dataLayer;
  memLayer;

  @observable lines = []
  @observable stations = []
  @observable disruptions = [];
  @observable isLoading = false;
  @observable error = null;



  constructor( dataLayer ) {
    this.dataLayer = dataLayer;
    this.memLayer = new Cache();

    this.loadDisruptions();
    this.loadLines();

    this.handleError = this.handleError.bind(this)
  }


  loadLines() {

    let parseLines = (json) => {
      this.lines = [];
      for( let k in json ){
        this.lines.push( {
          id: k,
          name: json[k],
          selected: false
        })
      }
      console.log(this.lines)
      this.isLoading = false;
    }

    this.isLoading = true;
    this.dataLayer.get("subway-lines")
                  .then(parseLines)
                  .catch( this.handleError )
  }


  loadDisruptions() {
    let parse = (json) => {
      this.disruptions = json;
    }
    this.dataLayer.get("disruptions")
                  .then(parse)
                  .catch(this.handleError)
  }


  loadStations( lineId ) {
    let cacheK = (`stations-${lineId}`),
        cached = this.memLayer.get(cacheK);

    if( cached ) {
      this.stations = cached;
      return;
    }

    let parse = (json) => {
      this.stations = json;
      this.stations.unshift( { name: "Select a station", id: -1 } )

      this.memLayer.set(cacheK, json);
    }

    this.dataLayer.get("stations", lineId)
                  .then( parse )
                  // .then( cache.bind)
                  .catch(this.handleError)
  }

  //CRUD
  removeDisruption(id) {
    var found = this.disruptions.find( (x) => x.id == id );
    if( found ) {
      this.dataLayer.delete("disruptions", id )
                    .then( () => this.disruptions.remove( found ) )
                    .catch( this.handleError )
    }
  }

  addDisruption( data ) {

    let complete = (res) => {
      if( res.success ) {
        this.disruptions.push( {
          description: data.description,
          start: data.start,
          end: data.end,
          id: res.data.id,
          linename: data.linename
        })
      }
    }

    this.dataLayer.post("disruptions", data)
                  .then( complete )
                  .catch( this.handleError )
  }


  //toggling
  toggleLine( idx, select ) {
    var line = this.lines[idx];
    if( line ) {
      let selState =  select || !line.selected;
      this.unselectAllLines();
      line.selected = selState;

      this.loadStations( line.id );
    }
  }

  unselectAllLines() {
    this.lines.forEach( (line) => line.selected = false );
  }

  getSelectedLine() {
    return this.lines.filter( x=> x.selected )[0]
  }

  //helpers
  handleError(error) {
    this.isLoading = false;
    this.error = error ? error.message : "error";

    //test
    setTimeout( () => this.error = null, 25000)
  }
}

export default AppStore;
