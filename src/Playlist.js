import  React , { Component } from 'react';

import {  Header, Image, } from 'semantic-ui-react';



function msToMandS(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

class Playlist extends Component {

  componentDidMount() {
    this.setState({
      playlist: this.props.tracks,
  })
  }


render() {
return (
    <div>
<Header as='h3'>Playlist</Header>

          <table className='ui selectable unstackable structured large table'>
            <thead>


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
                 this.props.tracks.map(({ artist, album, title, durationMillis, albumArtRef }, idx) => (


                  <tr
                    key={idx}
                  // onClick={() => this.props.onFoodClick(food)}
                  >
                    <td><Image className="mini" src={albumArtRef[0].url} /> </td>
                    <td className='left aligned'>
                      {artist}
                    </td>
                    <td className='left aligned'>
                      {title}
                    </td>
                    {/* <td className='right aligned'>
                    &nbsp;
                    </td> */}
                    <td className='left aligned'>
                      {msToMandS(durationMillis)}
                    </td>
                  </tr>
                 ))
              }
            </tbody>
          </table>


        </div>



);


}


}

export default Playlist;