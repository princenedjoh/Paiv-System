import { useState, useEffect } from "react"
import ClickableTab from "@components/clickable/clickabletab"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"
import { FaBell, FaChevronDown, FaHospitalSymbol, FaPowerOff, FaUserCircle } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"
import Menu from "../dropdown/dropdown"
import Link from "next/link"
import { DropdownItem } from "@/utils/@types"
import { IoMdPulse, IoMdSettings } from "react-icons/io"
import Pressable from "@components/button/pressable"
import { useAuth } from "@/app/context/authContext"
import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import { MdLocalHospital } from "react-icons/md"
import Input from "@components/input/input"
import { FaMagnifyingGlass } from "react-icons/fa6"

const Topbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [hospitalName, setHospitalName] = useState('')
    const [searchValue, setSearchValue] = useState("")
    
    const { logout } = useAuth()
    
    const menuItems: DropdownItem[] = [
        { key: "1", label: "Pages", type: 'title', disabled: true },
        { key: "2", type: 'link', href: "/", label: "Search" },
        { key: "3", type: 'link', href: "/claims", label: "Claims" },
        { key: "4", type: 'link', href: "/encounters", label: "Encounters" },
        { type: "divider", key: "divider-2" },
        { key: "below-1", label: "Settings", icon: <IoMdSettings size={15} className="ml-[-1.5px]" color={theme.colors.text.secondary} /> },
        { key: "below-2", label: "Logout", onClick: () => logout(false), icon: <FaPowerOff size={12} color={theme.colors.text.secondary} /> },
    ]
    
    const getUserProfile = async() => {
        const response = await protectedApi.GET("/user/profile")
        return response
    }
    
    const {mutate : getUserProfileMutation, isPending : isUserProfileLoading} = useMutation({
        mutationFn : getUserProfile,
        onSuccess : (data)=>{
            setHospitalName(data.hospital_name)
        }
    })
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(()=>{
        getUserProfileMutation()
    },[])

    return (
        <div className="w-full pl-[250px] h-[60px] border-b-[1px] border-solid border-border-primary fixed top-0 left-0 transition-all duration-300 z-[10]">
            <div className={`w-full h-full flex justify-center bg-bg-secondary`}>
                <div className="px-8 w-full h-full flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                        {
                            isUserProfileLoading ?
                            <div className="normal-loader !w-[18px]"></div>
                            : hospitalName &&
                            <Pressable scaleFactor={1.015}>
                                <div className="flex px-2 py-[6px] pr-[10px] border-[1px] border-solid border-border-tetiary rounded-xl bg-bg-tetiary cursor-pointer hover:bg-bg-quantinary duration-200 h-fit items-center gap-1">
                                    <MdLocalHospital color={theme.colors.text.secondary} />
                                    <Text>
                                        {hospitalName}
                                    </Text>
                                </div>
                            </Pressable>
                        }
                        <ClickableTab>
                            <div className="flex gap-1 items-center">
                                <Text>
                                    princenedjoh@gmail.com
                                </Text>
                                <FaChevronDown 
                                    size={10}
                                    color={theme.colors.text.tetiary}
                                />
                            </div>
                        </ClickableTab>
                    </div>
                    <div className="flex items-center gap-2">

                        {/* Search */}
                        <Input 
                            value={searchValue}
                            setValue={setSearchValue}
                            placeholder="Search anything..."
                            className="!h-[32px] !px-3 !bg-bg-primary"
                            PreIcon={(
                                <FaMagnifyingGlass 
                                    size={13}
                                    color={theme.colors.text.tetiary}
                                />
                            )}
                        />

                        {/* Icons */}
                        <div className="flex items-center gap-1">
                            <ClickableTab>
                                <FaBell 
                                    color={theme.colors.text.secondary}
                                />
                            </ClickableTab>
                            <Menu menuItems={menuItems}>
                                <ClickableTab>
                                    <FiMenu color={theme.colors.text.secondary} />
                                </ClickableTab>
                            </Menu>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar
