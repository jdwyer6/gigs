const AdminTabs = ({ activeTab, setActiveTab }) => {

    return (
        <div>
            <div className="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap dark:border-gray-700">
                <button onClick={()=>setActiveTab(0)} className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 border-b-2 ${activeTab === 0 ? 'border-brandPrimary border-b-2' : 'border-transparent'} bg-transparent sm:px-4 -px-1 dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>

                    <span className="mx-1 text-sm sm:text-base">
                        Requests
                    </span>
                </button>

                <button onClick={()=>setActiveTab(1)} className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 ${activeTab === 1 ? 'border-brandPrimary border-b-2' : 'border-transparent'}  sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>

                    <span className="mx-1 text-sm sm:text-base">
                        Account
                    </span>
                </button>

                <button onClick={()=>setActiveTab(2)} className={`inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 ${activeTab === 2 ? 'border-brandPrimary border-b-2' : 'border-transparent'}  sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18V3H3zm3 3h12v12H6V6zm3 3h6v6H9V9z" />
                    </svg>

                    <span className="mx-1 text-sm sm:text-base">
                        Data
                    </span>
                </button>
                <div className="ml-auto">
                    <button onClick={()=>setActiveTab(2)} className="inline-flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mx-1 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6-10V5a3 3 0 10-6 0v1" />
                        </svg>

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