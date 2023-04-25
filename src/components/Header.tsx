import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <header className="flex p-5 justify-between sticky top-0 bg-white z-50 shadow-md ">
            {/* left div */}
            <div className="flex space-x-2 items-center">
                <Image src='https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png' width={50} height={50} alt="logo" />
                <div>
                    <h1 className="font-bold">
                        AI Image <span className="text-blue-500">Generator</span>
                    </h1>
                    <h2 className="text-xs">
                        An image generator using various AI tools including Chat GPT & DALLE
                    </h2>
                </div>
            </div>
            {/* right div */}
            <div className="flex text-xs md:text-base divide-x items-center text-gray-500">
                {/* A Link component connecting to my twitter account motypes */}
                <Link href="https://twitter.com/motypes">
                    Find me on Twitter <span className="text-blue-500">@motypes</span>
                </Link>
            </div>
        </header>
    )
    }

export default Header