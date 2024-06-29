import Dashboard from "../components/dashboard";
import AdminTabs from "../components/AdminTabs";
import Charts from "../components/Charts";

import { useState } from 'react'

const Admin = () => {
    const [ activeTab, setActiveTab ] = useState(0);

    return (
        <div className="page-admin">
            <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            {activeTab === 0 ? <Dashboard /> : <Charts />}
        </div>
    );
}

export default Admin;