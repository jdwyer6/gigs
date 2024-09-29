import Dashboard from "../components/dashboard";
import AdminTabs from "../components/AdminTabs";
import Account from "../components/Account";
import Data from "../components/Data";

import { useState } from 'react'

const Admin = () => {
    const [ activeTab, setActiveTab ] = useState(0);
    const renderComponent = () => {
        switch (activeTab) {
            case 0:
                return <Dashboard />;
            case 1:
                return <Account />;
            case 2:
                return <Data />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="page-admin">
            <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            {renderComponent()}
        </div>
    );
}

export default Admin;