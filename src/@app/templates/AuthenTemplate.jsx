import { Col, Layout, Menu, Row } from "antd";
import { Footer } from "antd/lib/layout/layout";
import "./styles.scss"
import {
  HomeFilled,
  StarFilled,
  LogoutOutlined,
  UserOutlined,

} from "@ant-design/icons";
import { RiTeamFill } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import { localStorageSaveReduxState } from "../utils/StorageUtil";
const { Header, Content, Sider } = Layout;
const AuthenTemplate = ({ children }) => {
  const navigator = useNavigate()
  const signOut = async () => {
    console.log("hello")
    localStorage.clear();
    navigator("/sign-in")
    window.location.reload();

  }
  return (<>
    <div className="layout">
      <Layout>
        <Header className="header">
          <Row>
            <Col span={2}>
              <div className="logo" />
              
                <h2
                  style={{ fontWeight: "bold", color: "#fff", }}
                  onClick={() => {

                  }}
                >
                  FAMS
                </h2>
              
            </Col>
            <Col span={20} />

            <Col span={1}>
              <UserOutlined style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }} />
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider width={200} className="layoutSlide">
            <Menu
              defaultSelectedKeys={["home"]}
              mode="inline"
              className="menu"
            >
              <Menu.Item icon={<HomeFilled />} onClick={() => { navigator("/") }} key={"home"}>
                Home
              </Menu.Item>
              <Menu.Item icon={<RiTeamFill />} onClick={() => { navigator("/group") }} >
                Group
              </Menu.Item>
              <Menu.Item icon={<StarFilled />} onClick={() => { navigator("/event") }}>
                Event
              </Menu.Item>
              <Menu.Item icon={<LogoutOutlined />} onClick={() => { signOut() }}>
                Sign out
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <div style={{ marginBottom: 10 }}>
              </div>

              {children}
            </Content>
          </Layout>
        </Layout>
        <Footer>
          <Row align="middle" justify="center" >
            Copyright © 2022 FAMS <br />
          </Row>
        </Footer>
      </Layout>
    </div>
  </>)
}
export default AuthenTemplate;