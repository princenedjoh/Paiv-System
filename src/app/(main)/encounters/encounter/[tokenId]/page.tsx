'use client'

import { useParams } from "next/navigation"
import { useEffect, } from "react"
import TopSection from "./components/top section/topSection"
import { useEncounterContext } from "./context/encounter.context"
import VerificationStates from "./components/verificationStates"
import NoData from "@components/NoData/noData"
import RecentTable from "./components/recent table/recentTable"
import Disposition from "./components/disposition/disposition"
import { AnimatePresence } from "framer-motion"
import ClaimsFormLayout from "./components/claims/claimsFormLayout"
import Slidein from "@styles/components/slidein"

const Encounter = () => {
    const { tokenId } = useParams();
    const {getEncounterMutation, getEncounterPending, encounterData, encounterDetails, showClaims, setShowClaims } = useEncounterContext();

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
            <Slidein className="flex flex-col gap-6 px-8">
                <div className="w-full bg-[#ffffff05] border-b-[1px] border-solid border-b-border-tetiary justify-center py-[30px] flex items-center">
                    <div className="w-full flex flex-col justify-center gap-6">
                        <TopSection />
                    </div>
                </div>
                <div className="w-full flex justify-center gap-1">
                    <div className="w-full flex flex-col gap-6">
                        <RecentTable />
                    </div>
                </div>
            </Slidein>
        </>
    );
};

export default Encounter;