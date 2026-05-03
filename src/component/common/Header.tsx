import { ReactNode } from "react";

type HeaderProps = {
    children: ReactNode;
}

const Header = ({ children } : HeaderProps ) => {
    return (
        <header className="flex w-full h-18 justify-center items-center bg-white border-b-2 border-gray-200">
            {children}
        </header>
    );
}

export default Header;