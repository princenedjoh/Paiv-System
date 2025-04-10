'use client'

import Button from "@components/button/button"
import { useParams } from "next/navigation"
import { useEffect, } from "react"
import TopSection from "./components/topSection"
import { useEncounterContext } from "./context/encounter.context"
import { ViewState } from "./utils/types"
import VerificationStates from "./components/verificationStates"
import NoData from "@components/NoData/noData"
import RecentTable from "./components/recent table/recentTable"
import { DispositionViewState } from "@/app/utils/types"
import Disposition from "./components/disposition/disposition"
import { AnimatePresence } from "framer-motion"
import ClaimsFormLayout from "./components/claims/claimsFormLayout"
import Slidein from "@styles/components/slidein"

const Encounter = () => {
    const { tokenId } = useParams();
    const { setViewState, setDispositionViewState, getEncounterMutation, getEncounterPending, encounterData, encounterDetails, showClaims, setShowClaims } = useEncounterContext();
    const checkinFailed = encounterDetails?.checkinImageUrl && !encounterDetails.checkinStatus
    const checkinSuccessful = encounterDetails?.checkinStatus
    const checkoutSuccessful = encounterDetails?.checkoutStatus
    const checkoutTime = encounterDetails?.checkoutTime

    useEffect(() => {
        if (tokenId) {
            getEncounterMutation();
        }
    }, [tokenId]);

    if (getEncounterPending) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="normal-loader"></div>
            </div>
        );
    }

    if (!encounterData) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <NoData />
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {
                    showClaims &&
                    <ClaimsFormLayout
                        close={()=>setShowClaims(false)}
                    />
                }
            </AnimatePresence>
            <VerificationStates />
            <Disposition />
            <Slidein className="flex flex-col gap-6">
                <div className="w-full bg-[#ffffff05] border-b-[1px] border-solid border-b-border-tetiary justify-center pt-[30px] h-[350px] flex items-center">
                    <div className="max-w-[1024px] w-full flex flex-col justify-center gap-6">
                        <TopSection />
                    </div>
                </div>
                <div className="w-full flex justify-center gap-1">
                    <div className="max-w-[1024px] w-full flex flex-col gap-6">
                        <div className="flex gap-2">
                            {
                                !checkinSuccessful &&
                                <Button
                                    text="Verify Visit"
                                    className="!bg-main-primary"
                                    onClick={() => setViewState(ViewState.VERIFICATION_SELECTION)}
                                />
                            }
                            {
                                checkinSuccessful && !checkoutTime &&
                                <Button
                                    text="Close Encounter"
                                    className="!bg-main-primary"
                                    onClick={() => setDispositionViewState(DispositionViewState.SELECT_DISPOSITION)}
                                />
                            }
                            {
                                checkinFailed || checkinSuccessful || checkoutSuccessful ?
                                <Button
                                    text="Submit Claim"
                                    onClick={()=>setShowClaims(true)}
                                />
                                : <></>
                            }
                        </div>
                        <RecentTable />
                    </div>
                </div>
            </Slidein>
        </>
    );
};

export default Encounter;