const AdminTabs = ({ activeTab, setActiveTab }) => {

    return (
        <div className="d-flex admin-tab_container">
            <div onClick={()=>setActiveTab(0)} className={`admin-tab ${activeTab === 0 ? 'active-tab' : ''}`}><h3>Requests</h3></div>
            <div onClick={()=>setActiveTab(1)} className={`admin-tab ${activeTab === 1 ? 'active-tab' : ''}`}><h3>Charts</h3></div>
        </div>
    );
}

export default AdminTabs;