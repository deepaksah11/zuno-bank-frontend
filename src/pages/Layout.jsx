import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

const Layout = () => {
    // const { isCheckingAuth } = useAuthStore()
    
    // if (isCheckingAuth) {
    //     return (
    //         <div className="flex h-screen justify-center items-center">
    //             <Loader2 className='w-10 h-10 animate-spin text-blue-600' />
    //         </div>
    //     )
    // }
    
    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                
                <main className="flex-1 overflow-y-auto bg-gray-50 ml-[230px]">
                    <div className="">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Layout