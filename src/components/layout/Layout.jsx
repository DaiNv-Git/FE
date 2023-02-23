import React, { useEffect } from 'react'

import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'
import AppRouter from '../../routers/routers'
import Dashboard from '../../pages/Dashboard'
const notLayout = ["/sign-in", "/sign-out"]
const Layout = () => {

    const themeReducer = useSelector(state => state.ThemeReducer)
    const dispatch = useDispatch()
    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))

    }, [dispatch])

    return (
        <BrowserRouter>
            <Route render={(props) => (

                <div>
                    
                    {
                        notLayout.includes(props.location.pathname) ? <AppRouter /> : <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                            <Sidebar {...props} />
                            <div className="layout__content">
                                <TopNav />
                                <div className="layout__content-main">
                                    <AppRouter />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            )} />
        </BrowserRouter>
    )
}

export default Layout
