import React, { Component } from 'react';


import 'semantic-ui-css/semantic.min.css';
import { Header } from 'semantic-ui-react';

import TrackSearch from './TrackSearch';
import Playlist from './Playlist';

import Client from './Client';

class App extends Component {
state = {
  playlist: [],
  newTrack: [],
  isLoading_: false,
};

componentWillMount() {
Client.getPlaylist("pls sir", (callback) => {
  // console.log(callback)
  this.setState({playlist: callback})
})
}



handleTrackClick = (evt) => {

  var newPlaylist = this.state.playlist.slice(0);
  newPlaylist.push(evt);

// console.log("handleTrackClick evt: ", evt)
// console.log("handleTrackClick newPlaylist: ", newPlaylist)

this.setState({playlist: newPlaylist})

Client.addTrackToPlaylist(newPlaylist, (callback) => {
  // console.log("addTrackToPlaylist callback: ", callback)
});
  

}

handleSearch = (evt) => {
var searchValue = evt.target.searchBox.value;
// console.log("handleSearch :", searchValue)

  Client.search(searchValue, (tracks) => {
    this.setState({
      searchResults: tracks,
    });
  });

};

  render() {
    return (
      <div className="ui  container">
        <Header as='h1'>GPM Party Playlist</Header>

        <TrackSearch
                    onTrackClick={ this.handleTrackClick   }
                    onSearch={this.handleSearch}
                    isLoading_={false}
                    // searchResults={this.state.searchResults}
        />

        <Playlist 
        tracks={this.state.playlist}
        />

      </div>


    );
  }
}


export default App;
