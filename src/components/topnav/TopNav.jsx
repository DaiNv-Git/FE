import React, { useEffect } from 'react'

import './topnav.css'

import { Link } from 'react-router-dom'

import Dropdown from '../dropdown/Dropdown'

import ThemeMenu from '../thememenu/ThemeMenu'

import user_image from '../../assets/images/tuat.png'

import user_menu from '../../assets/JsonData/user_menus.json'
import { USERNAME } from '../../@app/constants/key'
import { GetNotificationAPI } from '../../connectors/NotificationConnector'
import { useState } from 'react'
import { Badge, Col, Divider, Row } from 'antd'

const curr_user = {
    display_name: localStorage.getItem(USERNAME),
    image: user_image
}

const renderNotificationItem = (item, index) => (
    <Link to={`/notification-detail/${item.id}`}>
        <div>
            <div className="notification-item" style={{ padding: 10 }} key={index}>
                <Row>
                    <Col span={1}>
                        {
                            item.isImportant ? <Badge color='red' /> : <Badge status='default' />
                        }
                    </Col>
                    <Col span={22}>
                        <Row>
                            <Col span={24}>
                                <span style={{ fontWeight: "bold" }}>{item.title}</span>
                            </Col>
                            <Col span={24}>
                                <span>{item.message}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>



            </div>
            <Divider />
        </div>
    </Link>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {
                localStorage.getItem(USERNAME)
            }
        </div>
    </div>
)

const renderUserMenu = (item, index) => (
    <Link to={item.path} key={index}>
        <div className="usermenu-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const Topnav = () => {
    const [notifications, setNotifications] = useState([])
    const getNotifications = async () => {
        const res = await GetNotificationAPI();
        setNotifications(res.data)
    }
    useEffect(() => {
        getNotifications()
    }, [])
    return (
        <div className='topnav'>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                    {
                        notifications ? <Dropdown
                            icon='bx bx-bell'
                            badge={notifications.length}
                            contentData={notifications.slice(0, 2)}
                            renderItems={(item, index) => renderNotificationItem(item, index)}
                            renderFooter={() => <Link to='/notification'>View All</Link>}
                        /> : null
                    }
                    {/* dropdown here */}
                </div>
                <div className="topnav__right-item">
                    <ThemeMenu />
                </div>
            </div>
        </div>
    )
}

export default Topnav
