import React, {Component} from 'react'
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight
} from 'react-instantsearch/dom'

const Hit = ({hit}) =>
  <div className="hit">
    <div className="hit-content">
      {/* <p>{hit.title}</p> */}
      <div>
        <Highlight attributeName="title" hit={hit}/>
      </div>
      {/* <p>{hit.title}</p> */}
    </div>
  </div>

const Sidebar = () =>
  <div className='sidebar'>

  </div>

const Content = () =>
  <div className='content'>
    <Hits hitComponent={Hit}/>
  </div>


class Search extends Component {
  render(){
    return(
      <InstantSearch
        appId={'LAOC4SMGQL'}
        apiKey='a127bd0315d486711a78f421c318f51b'
        indexName='ChallengeIndex'
      >
        <header>
          {/* <img src="instant_search_logo@2x.png" alt=''></img> */}
          <SearchBox translations={{placeholder:'Search for Products'}}/>
        </header>
        <main>
          <Sidebar />
          <Content />
        </main>
      </InstantSearch>
    )
  }
}

export default Search
