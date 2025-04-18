import { IClaimsDetailType } from "./types"

export const convertToClaimsDetails = (claim:any) : IClaimsDetailType => {
    console.log({claim})
    return {
        totalPayout : 0,
        diagnosis : [{
            description : claim.diagnosis,
            diagnosis : claim.diagnosis,
            ICD10 : claim.diagnosis,
            GRDG : "MEDI31A"
        }],
        drugs : claim.drugs.map((drug:any) => ({
            code : drug.code,
            dosage : `${drug.frequency} hourly for ${drug.duration} day(s)`,
            description : drug.code,
            date : new Date()
        }))
    }
}