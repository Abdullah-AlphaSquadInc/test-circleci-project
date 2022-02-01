import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import './Layout.css';

class MainLayout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            sidebar: false
        }
    }

    render() {
        
        const { isLogin, children } = this.props;
    
        if (isLogin || localStorage.getItem('isLogin')) {
            return (
                <div className={`w-100 app-flex-row align-items-start justify-content-start master-layout-container`}>

                    <Sidebar />
                    
                    <div className="app-flex-column p-0 h-100" style={{ width: '82%' }}>
                        
                        { children }

                    </div>

                </div>
            )
        }
        else return children;    
    }

}

export default MainLayout;