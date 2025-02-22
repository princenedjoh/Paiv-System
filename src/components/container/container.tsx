import ClickableTab from "@components/clickable/clickabletab"
import Overlay from "@components/overlay/overlay"
import theme from "@styles/theme"
import { ReactNode } from "react"
import { IoMdCloseCircle } from "react-icons/io"

const Container = ({
    children,
    className
} : {
    children? : ReactNode,
    className? : string
}) => {
    return (
        <div 
            className={`min-w-[300px] min-h-[200px] flex flex-col items-center p-2 relative rounded-[20px] border-[1px] border-solid border-border-tetiary bg-[#1F1F28] ${className}`}
            style={{
                backgroundImage: "url('/assets/prod/bg-gradient.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}                    
        >
            <div className="absolute left-[-3px] top-[-3px] w-[70px] h-[70px] rounded-tl-[20px] border-t-[5px] border-l-[5px] border-solid border-[#3C3C53]">

            </div>
            <div className="absolute right-[-3px] bottom-[-3px] w-[70px] h-[70px] rounded-br-[20px] border-b-[5px] border-r-[5px] border-solid border-[#3C3C53]">

            </div>
            <div className="absolute top-[10px] right-[10px]">
                <ClickableTab className="!rounded-full hover:!bg-bg-tetiary">
                    <IoMdCloseCircle color={theme.colors.text.secondary} />
                </ClickableTab>
            </div>
            {children}
        </div>
    )
}
export default Container