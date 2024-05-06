import client from "@/config/apollo"
import { useRouter } from "next/router"

const Header = () => {
    const router = useRouter()
    const logOut = () => {
        client.clearStore()
        localStorage.removeItem('token')
        router.push('/login')
    }
    return (
        <div className="sm:flex flex sm:justify-end mb-6">
            <button
                onClick={() => logOut()}
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md justify-end"
                type="button"
            >
                Logout
            </button>
        </div>

    )
}

export default Header