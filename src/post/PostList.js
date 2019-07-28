import React, { Component } from 'react';

class PostList extends Component {
  // Create the initial state of the search filter blank.
  constructor (props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      isOpen: false
    }
  }

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    console.log('clicked');
  };


  componentDidMount(){

    fetch('https://jsonplaceholder.typicode.com/photos')
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json.slice(0, 24),
      })
    });
  }

  render() {
      const { isLoaded, items, isOpen } = this.state;

      if (!isLoaded) {
        return <div>Loading...</div>;
      }

      else {

         return (
          <div className="wrapper">
            <h1>Images</h1>
            
            {/* Map the post json data around the return so it can show all the items */}
            <ul>
            {items.map((item, index) => (
              <div>
                <div>
                  <li key={item.id} className="item-list">
                    <img
                      className="small"
                      src={item.thumbnailUrl}
                      onClick={this.handleShowDialog}
                      alt="no image"
                    />
                  </li> 
                  </div>

                  <div>
                  {this.state.isOpen && (
                    <dialog
                      key={item.id}
                      className="dialog"
                      style={{ position: 'absolute' }}
                      open
                      onClick={this.handleShowDialog}
                    >
                      <img
                        key={item.id}
                        className="image"
                        src={item.url}
                        onClick={this.handleShowDialog}
                        alt="no image"
                      />
                    </dialog>
                  )}
                  </div>
                </div>
            ))}
            </ul>
          </div>
        )
      }
    }
  }

export default PostList