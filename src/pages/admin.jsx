import Dashboard from "../components/dashboard";
import AdminTabs from "../components/AdminTabs";
import Charts from "../components/Charts";
import Upload from "../components/Upload";

import { useState } from 'react'

const Admin = () => {
    const [ activeTab, setActiveTab ] = useState(0);
    const renderComponent = () => {
        switch (activeTab) {
            case 0:
                return <Dashboard />;
            case 1:
                return <Charts />;
            case 2:
                return <Upload />;
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