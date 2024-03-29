import React, { Component } from 'react'
import './AsideFeed.css'

class AsideFeed extends Component {
    render() {
        const { articles } = this.props
        const users = articles
            .map((article) => {
                console.log(article.users._id)
                return [article.users.name, article.users.provider_pic, article.users._id]
            })
            .sort()
            .filter((a, b, self) => {
                return self.indexOf(a) === b
            })
            .map((item_user, chiso) =>
                <div key={chiso} className="post-metadata">
                    <div className="post-info">
                        <a href={`/profile/${item_user[2]}`}>
                            <div key={chiso}>
                                <img className='avatar-image' src={item_user[1]} alt="" height="50px"/>
                                <span className='nameSpan' data-reactroot="">{item_user[0]}</span>
                            </div>
                        </a>

                    </div>
                </div>
            )
        const top_articles = articles
            .map((article, chiso) =>
                <li key={chiso} className="top-stories-list-item">
                    <div className="count-button-wrapper">
                        <span className="count-button">{chiso + 1}</span>
                    </div>
                    <div className="top-stories-links">
                        <a className="post-title" href={`/articleview/${article._id}`}>{article.title}</a><br />
                        <small>
                            <div data-react-classname="PopoverLink" data-react-props="">
                                <span className="popover-link" data-reactroot="">
                                    <a href={`/profile/${article.users._id}`}>{article.users.name}</a>
                                </span>
                            </div>
                        </small>
                    </div>
                </li>
            )
        return (
            <div>
                <aside className="col-md-4 main-sidebar sidebarSticky">
                    <h4 className="small-heading border-top">Featured Users</h4>
                    <div data-react-classname="TagList" data-react-props="">
                        <div className="tags-wrapper undefined" data-reactroot="">
                            {users}
                        </div>
                    </div>
                    <h4 className="small-heading border-top">Top stories</h4>
                    <div className="sidebar-top-stories">
                        <ul>
                            {top_articles}
                        </ul>
                    </div>
                </aside>
            </div>
        )
    }
}
export default AsideFeed