import React, {Component} from 'react';

import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel'
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {
                    label: 'Going to learn React',
                    important: true,
                    like: false,
                    id: 1,
                },
                {
                    label: 'That is so good',
                    important: false,
                    like: false,
                    id: 2,
                },
                {
                    label: 'I need a break...',
                    important: false,
                    like: false,
                    id: 3,
                },
            ],
            term: '',
            filter: 'all',
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);        

        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState( ({data}) => {
            const index = data.findIndex( elem => elem.id === id );

            const newData = [...data];
            newData.splice(index, 1);

            return {
                data : newData
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++,
        };

        this.setState( ({data}) => {
            const newData = [...data, newItem];
            return {
                data: newData
            }
        });
    }

    onToggleImportant(id) {
        this.setState( ({data}) => {
            const index = data.findIndex( elem => elem.id === id );

            const newData = [...data];
            newData[index].important = !newData[index].important;

            return {
                data: newData
            }
        });
    }

    onToggleLiked(id) {        
        this.setState( ({data}) => {
            const index = data.findIndex( elem => elem.id === id );

            const newData = [...data];
            newData[index].like = !newData[index].like;

            return {
                data: newData
            }
        });
    }

    filterPost(items, filter) {
        if (filter === 'like') {            
            return items.filter( item => item.like);
        } else {            
            return items;
        }
    }

    onFilterSelect(filter) {        
        this.setState( {filter} );        
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter( item => (item.label.indexOf(term) > -1) );
    }

    onUpdateSearch(term) {   
        this.setState( {term} );
    }

    render() {
        const {data, term, filter} = this.state;

        const postsCount = data.length;
        const likedCount = data.filter(item => item.like).length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader
                    liked={likedCount}
                    total={postsCount}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}/> 
                <PostAddForm
                    onAdd={this.addItem}/>           
            </div>        
        )
    }  

    
};