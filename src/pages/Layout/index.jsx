// test if token is taken
// import { request } from '@/utils'
// import { useEffect } from 'react'

// const Layout=() =>{
//     useEffect(()=>{
//         request.get('/user/profile')
//     },[])
//     return <div>this is layout</div>
// }

// export default Layout

// import { Layout, Menu, Popconfirm } from "antd";
// import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
// import {
//   HomeOutlined,
//   DiffOutlined,
//   EditOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import "./index.scss";
// import { Outlet } from "react-router-dom";
// // import Vis from '../../components/Vis.jsx"'

// const { Header, Sider } = Layout;

// const items = [
//   {
//     label: "首页",
//     key: "/",
//     icon: <HomeOutlined />,
//   },
//   {
//     label: "文章管理",
//     key: "/diary",
//     icon: <DiffOutlined />,
//   },
//   {
//     label: "创建文章",
//     key: "/healthTracker",
//     icon: <EditOutlined />,
//   },
// ];
// function sayhello() {
//   <h1>123123123</h1>
// }

// const GeekLayout = () => {
//   return (
//     <Layout>
//       <Header className="layout-header">
//         <div className="logo" />
//         <div className="user-info">
//           <span className="user-name">user.name</span>
//           <span className="user-logout">
//             <Popconfirm title="Are you sure you want to logout? " okText="logout" cancelText="cancel">
//               <LogoutOutlined /> logout
//             </Popconfirm>
//           </span>
//         </div>
//       </Header>
//       <Layout>
//         <Sider width={200} className="site-layout-background" >
//           <Menu
//             mode="inline"
//             theme="light"
//             defaultSelectedKeys={["1"]}
//             style={{ height: "100%", borderRight: 0}}
//           >
//             <Menu.Item icon={<HomeOutlined />} key="1" onClick={sayhello}>
//               <Link to={"/home"}>Home Page</Link>
//             </Menu.Item>

//             <Menu.Item icon={<EditOutlined />} key="2">
//             <Link to={"/diary"}>Diary Entries</Link>
//             </Menu.Item>

//             <Menu.Item icon={<DiffOutlined />} key="3">
//             <Link to={"/healthAnalysis"}>Health Analysis</Link>
//             </Menu.Item>

//             <Menu.Item icon={<EditOutlined />} key="4">
//             <Link to={"/healthTracker"}>Health Habit Tracker</Link>
//             </Menu.Item>
//           </Menu>
//         </Sider>
//         <Layout className="layout-content" style={{ padding: 20 }}>
       
      
//           <Outlet/>
//         </Layout>
//       </Layout>
//     </Layout>
//   );
// };

// export default GeekLayout;


import { Layout, Menu, Popconfirm } from "antd";
import { BrowserRouter as Router, Link, Routes, Route, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
// import Vis from '../../components/Vis.jsx"'


const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/diary",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/healthTracker",
    icon: <EditOutlined />,
  },
];
function sayhello() {
  <h1>123123123</h1>
}

const GeekLayout = () => {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(null);

  useEffect(() => {
    // Update the state to indicate if the current location is the home page
    setIsHomePage(location.pathname === "/home");
  }, [location.pathname]);
  return (
    <Layout>
      <Header className="layout-header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user.name</span>
          <span className="user-logout">
            <Popconfirm title="Are you sure you want to logout? " okText="logout" cancelText="cancel">
              <LogoutOutlined /> logout
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        {!isHomePage && (<Sider width={200} className="site-layout-background" >
          <Menu
            mode="inline"
            theme="light"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0}}
          >
            <Menu.Item icon={<HomeOutlined />} key="1">
              <Link to={"/home"}>Home Page</Link>
            </Menu.Item>

            <Menu.Item icon={<EditOutlined />} key="2">
            <Link to={"/diary"}>Diary Entries</Link>
            </Menu.Item>

            <Menu.Item icon={<DiffOutlined />} key="3">
            <Link to={"/healthAnalysis"}>Health Analysis</Link>
            </Menu.Item>

            <Menu.Item icon={<EditOutlined />} key="4">
            <Link to={"/healthTracker"}>Health Habit Tracker</Link>
            </Menu.Item>
          </Menu>
        </Sider>)}
        <Layout className="layout-content" style={{ padding: 20 }}>
       

          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;