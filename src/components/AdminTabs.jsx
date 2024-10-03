import { FaArchive, FaDatabase } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";

const AdminTabs = ({ activeTab, setActiveTab }) => {

    return (
        <div>
            <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap ">
                <button onClick={()=>setActiveTab(0)} className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 border-b-2 ${activeTab === 0 ? 'border-brandPrimary border-b-2' : 'border-transparent'} bg-transparent sm:px-4 -px-1 whitespace-nowrap focus:outline-none`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>

                    <span className="mx-1 text-sm sm:text-base">
                        Requests
                    </span>
                </button>

                <button onClick={()=>setActiveTab(1)} className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 ${activeTab === 1 ? 'border-brandPrimary border-b-2' : 'border-transparent'}  sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}>
                <MdOutlineManageAccounts />


                    <span className="mx-1 text-sm sm:text-base">
                        Account
                    </span>
                </button>

                <button onClick={()=>setActiveTab(2)} className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 ${activeTab === 2 ? 'border-brandPrimary border-b-2' : 'border-transparent'}  sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}>
                <FaDatabase /> 

                    <span className="mx-1 text-sm sm:text-base">
                        Data
                    </span>
                </button>

                <button onClick={()=>setActiveTab(3)} className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 ${activeTab === 3 ? 'border-brandPrimary border-b-2' : 'border-transparent'}  sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}>
                <FaArchive />


                    <span className="mx-1 text-sm sm:text-base">
                        Archive
                    </span>
                </button>

                <div className="ml-auto">
                    <button onClick={()=>setActiveTab(2)} className="inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
                        <IoExitOutline />
                        <span className="mx-1 text-sm sm:text-base">
                            Log Out
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminTabs;