import React, { Component } from 'react';
import { Header, Form, Image, Input } from 'semantic-ui-react';


//this is our api Client for talking to pm-serv.js which is our link to google play music
import Client from './Client';


function msToMandS(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}


class TrackSearch extends Component {
state = {
  searchValue: '',
  searchResults: [],
}


  componentDidMount() {
    this.setState({
      searchResults: [],
      searchValue: '',
      isLoading_: false,
    });
  }


  onSearchChange = (e) => {
    const value = e.target.value;
    this.setState({
      searchValue: value,
      searchResults: [],
    });
  };

  onSearch = (evt) => {
    var searchValue = evt.target.searchBox.value;
    // console.log("onSearch :", searchValue)
    
      Client.search(searchValue, (tracks) => {
        this.setState({
          searchResults: tracks,
        });
      });
    
    };

  onSearchResultClick = (idx) => {
    var results = [...this.state.searchResults];
    var track = results[idx];
    this.props.onTrackClick(track)
    results.splice(idx, 1);
    this.setState({searchResults: results});
  

  }

renderSearchInput = () => {
if (this.props.isLoading_) {
  return (
    <Input
    name="searchBox"
    type="text"
    placeholder="Search for music..."
    onChange={this.onSearchChange}
    value={this.state.searchValue}
    // onSubmit={this.props.onSearch}
    icon='search'
    fluid
    loading
  />
  )
} else {
  return (
    <Input
    name="searchBox"
    type="text"
    placeholder="Search for music..."
    onChange={this.onSearchChange}
    value={this.state.searchValue}
    // onSubmit={this.props.onSearch}
    icon='search'
    fluid
  />  
  )
}

}

renderSearchResults = () => {
  return (
    <div className="ui container">
      <Header as='h3'>Add music to playlist</Header>
      <div>
        <table className='ui selectable unstackable structured large table'>
          <thead>
            <tr>
              <th colSpan='4'>
                <div className='ui fluid search'>

                  <Form onSubmit={this.onSearch} >
                   {this.renderSearchInput()}
                  </Form>

                </div>
              </th>
            </tr>

            <tr>
              {/* <th className='eight wide'>Artist</th> */}
              <th className='two wide'>&nbsp;</th>
              <th>Artist</th>
              <th>Track</th>
              <th>Length</th>
            </tr>

          </thead>

          <tbody>
            {
              // this.props.searchResults.map((resultsTrack, idx) => (
                this.state.searchResults.map((resultsTrack, idx) => (

                <tr
                  key={idx}
                  // onClick={() => this.props.onTrackClick(resultsTrack)}
                  onClick={() => this.onSearchResultClick(idx)}
                >
                  <td><Image className="mini" src={resultsTrack.albumArtRef[0].url} /> </td>
                  <td className='left aligned'>
                    {resultsTrack.artist}
                  </td>
                  <td className='left aligned'>
                    {resultsTrack.title}
                  </td>
                  {/* <td className='right aligned'>
                  &nbsp;
                  </td> */}
                  <td className='left aligned'>
                    {msToMandS(resultsTrack.durationMillis)}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>


      </div>

    </div>
  );



};


  render() {
    return (


      this.renderSearchResults()


    );
  }



}


export default TrackSearch;
