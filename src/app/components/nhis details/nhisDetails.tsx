import Overlay from "@components/overlay/overlay"
import Image from "next/image"
import Table from "./components/table/table"
import { IoMdCloseCircle } from "react-icons/io"
import theme from "@styles/theme"
import ClickableTab from "@components/clickable/clickabletab"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { mainContext } from "@/app/context/context"
import { FaUserCircle } from "react-icons/fa"
import ZoomImage from "@components/zoomImage/zoomImage"
import Button from "@components/button/button"
import Instructions from "../instructions/instructions"
import CaptureContainer from "../capture container/captureContainer"
import VerificationSuccessfulContainer from "../verification successful container/verificationSuccessfulContainer"
import { ViewState } from "@/app/utils/types"
import VeficationFailed from "../capture container/components/verificationFailed"
import VerificationSelection from "../verification selection/verificationSelection"
import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const NhisDetails = () => {
    const {nhisDetails, showNhisDetails, setShowNhisDetails, viewState, setViewState} = useContext(mainContext)
    const [zoomProfile, setZoomProfile] = useState(false)
    const router = useRouter()

    const handleCreateEncounter = async () => {
        const response = await protectedApi.POST("encounter/initiate", {membership_id : nhisDetails?.memberShipId})
        return response
    }

    const {mutate : handleCreateEncounterMutation, isPending} = useMutation({
        mutationFn : handleCreateEncounter,
        onSuccess : (data)=>{
            toast.success("Encounter created successfully")
            router.push(`/encounter/${data.token}`)
            setViewState(null)
        },
        onError : ()=>{
            toast.error("Error creating encounter")
        }
    })
    
    return (
        <>
            <AnimatePresence>
                {
                    viewState === ViewState.VERIFICATION_SELECTION && <VerificationSelection />
                }
                {
                    viewState === ViewState.INSTRUCTIONS && (
                        <Instructions setViewState={setViewState} />
                    )
                }
                {
                    viewState === ViewState.CAPTURE && (
                        <CaptureContainer setViewState={setViewState} />
                    )
                }
                {
                    viewState === ViewState.VERIFICATION_SUCCESS && <VerificationSuccessfulContainer />
                }
                {
                    viewState === ViewState.VERIFICATION_FAILED && <VeficationFailed />
                }
                {viewState === ViewState.NHIS_DETAILS && (
                    <Overlay onClick={() => setViewState(null)}>
                        <div className="w-[500px] flex flex-col items-center p-2 relative rounded-[20px] border-[1px] border-solid border-border-tetiary h-[750px] bg-[#1F1F28]"
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
                            <div className="w-full rounded-[10px] h-[100px] border-[1px] border-solid border-border-secondary bg-[#4f4f631d]">

                            </div>
                            <div className="p-2 w-[120px] h-[120px] bg-[#24242F] rounded-full mt-[-60px] border-b-[1px] border-solid border-border-tetiary">
                                {nhisDetails?.imageUrl ? (
                                    <div className="relative overflow-hidden rounded-full w-full h-full">
                                        <Image
                                            src={nhisDetails.imageUrl}
                                            alt="Profile Image"
                                            width={110}
                                            height={110}
                                            style={{ height: "auto", width: "100%" }}
                                            className="hover:scale-[1.1] cursor-pointer duration-200"
                                            onClick={() => setZoomProfile(true)}
                                        />
                                    </div>
                                ) : (
                                    <FaUserCircle color={theme.colors.text.tetiary} size={105} />
                                )}
                            </div>
                            <div className="mt-[10px] w-full flex justify-center px-4">
                                <Table />
                            </div>
                            <div className="px-4 w-full">
                                <Button
                                    text="Create Encounter"
                                    className="mt-[20px] !w-full !h-[45px] !border-none !bg-main-primary"
                                    onClick={()=>handleCreateEncounterMutation()}
                                    // onClick={() => setViewState(ViewState.VERIFICATION_SELECTION)}
                                    loading={isPending}
                                />
                            </div>
                            <div className="absolute top-[15px] right-[15px]">
                                <ClickableTab
                                    className="!rounded-full hover:!bg-bg-tetiary"
                                    onClick={() => setViewState(null)}
                                >
                                    <IoMdCloseCircle color={theme.colors.text.secondary} />
                                </ClickableTab>
                            </div>
                        </div>
                    </Overlay>
                )}
            </AnimatePresence>

            <ZoomImage
                setShow={setZoomProfile}
                show={zoomProfile}
                imageURL={nhisDetails?.imageUrl ?? ''} 
            />
        </>
    )
}
export default NhisDetails