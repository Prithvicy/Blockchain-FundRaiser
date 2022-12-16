import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    toggleOpen,
} from '../../redux/actions/CommonAction'
import {
    logoutUser,
} from '../../redux/actions/UserAction'
import { GoogleLogout } from 'react-google-login'
import { GG_CLIENT_ID } from '../../constants/ConfigConst'

import './Header.css'

class Header extends Component {
    render() {
        const onLogout = () => {
            localStorage.removeItem('Auth')
            this.props.logoutUser()
        }
        const { propsReducerUser } = this.props
        const { isAuth, user } = propsReducerUser
        return (
            <div>
                <div data-react-classname="UserOverlay">
                    <div className="overlay overlay-hugeinc " data-reactroot=""><button className="overlay-close">
                    </button>
                        <nav className="users-overlay">
                            <ul>
                                <li className="pagination-button-group"></li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div data-behavior="progress-bar" className="progress-bar"></div>

                <nav data-behavior="animated-navbar" className="navbar navbar-default navbar-fixed-top is-inView navprops">
                    <div className="container-fluid col-md-10 col-md-offset-1">
                        <div className="navbar-header">
                            <a className="navbar-brand" id="logo" href="/">
                                <img alt="Stories" src="/assets/img/logo.png" height="60" />
                            </a>
                        </div>
                        <ul className="nav navbar-header">
                            <li><a className="" href="/">Top stories</a></li>
                        </ul>

                        <div className="folding-nav">
                            <ul className="nav navbar-nav navbar-right">
                                {isAuth ?
                                    <div className='buttonCluster'>
                                        <div>
                                            <small>Welcome user:</small> <br />{user.name}
                                        </div>
                                        <div>
                                            <a className='storyButton' data-behavior="trigger-overlay" href="/editor"><button className="bn30">Write a story</button></a>
                                        </div>
                                        <div>
                                            <GoogleLogout
                                                clientId={GG_CLIENT_ID}
                                                buttonText="Logout"
                                                onLogoutSuccess={onLogout}
                                            >
                                            </GoogleLogout>
                                        </div>
                                    </div>
                                    :
                                    <button onClick={this.props.toggleOpen} className="button green-border-button">
                                        Sign in / Sign up
                                    </button>
                                }
                            </ul>
                        </div>

                    </div>
                </nav>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        propsReducerUser: state.reducerUser
    }
}

export default connect(mapStateToProps, { toggleOpen, logoutUser })(Header)