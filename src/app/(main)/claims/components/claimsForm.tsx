'use client'

import Container from "@components/container/container"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import { useFormik } from "formik"
import { useState } from "react"
import validationSchema from "../utils/validationSchema"
import theme from "@styles/theme"
import { FaChevronDown } from "react-icons/fa"
import Divider from "@components/divider/divider"
import { GiCaduceus } from "react-icons/gi"
import Button from "@components/button/button"
import { DropdownItem } from "@/utils/@types"

interface addClaimsType {
    encounterToken : string
    serviceType : string[]
    disgnosis : string
    drugs : {
        code : string,
        quantity : number
    }[]
    medicalProcedures : string[]
    labTests : string[]
}

const ClaimsForm = ({
    close
} : {
    close : ()=>void
}) => {
    const [display, setDisplay] = useState(true)
    const [patientSearchValue, setPatientSearchValue] = useState("")

    const formik = useFormik({
        initialValues: {
          disgnosis: "",
          medicalProcedures: [],
          drugs: [{ code : "", quantity: 1 }],
          labTests: [],
          serviceType: "",
        },
        validationSchema,
        onSubmit: async (values) => {
          console.log("Form Submitted:", values);
        },
    });

    const mainConditionItems: DropdownItem[] = [
        { key: "I10", label: "Hypertension (I10)", onClick: () => formik.setFieldValue("primaryDiagnosis", "I10") },
        { type: "divider", key: "divider-1" },
        { key: "E11", label: "Type 2 Diabetes Mellitus (E11)", onClick: () => formik.setFieldValue("primaryDiagnosis", "E11") },
        { type: "divider", key: "divider-2" },
        { key: "N18", label: "Chronic Kidney Disease (N18)", onClick: () => formik.setFieldValue("primaryDiagnosis", "N18") },
        { type: "divider", key: "divider-3" },
        { key: "I25", label: "Ischemic Heart Disease (I25)", onClick: () => formik.setFieldValue("primaryDiagnosis", "I25") },
        { type: "divider", key: "divider-4" },
        { key: "J45", label: "Asthma (J45)", onClick: () => formik.setFieldValue("primaryDiagnosis", "J45") },
        { type: "divider", key: "divider-5" },
        { key: "J44", label: "Chronic Obstructive Pulmonary Disease (COPD) (J44)", onClick: () => formik.setFieldValue("primaryDiagnosis", "J44") },
        { type: "divider", key: "divider-6" },
        { key: "J18", label: "Pneumonia (J18)", onClick: () => formik.setFieldValue("primaryDiagnosis", "J18") },
        { type: "divider", key: "divider-7" },
        { key: "I63", label: "Stroke (Cerebrovascular Accident) (I63)", onClick: () => formik.setFieldValue("primaryDiagnosis", "I63") },
        { type: "divider", key: "divider-8" },
        { key: "I50", label: "Heart Failure (I50)", onClick: () => formik.setFieldValue("primaryDiagnosis", "I50") },
        { type: "divider", key: "divider-9" },
        { key: "K70", label: "Liver Disease (K70)", onClick: () => formik.setFieldValue("primaryDiagnosis", "K70") },
        { type: "divider", key: "divider-10" },
        { key: "A09", label: "Gastroenteritis (A09)", onClick: () => formik.setFieldValue("primaryDiagnosis", "A09") },
        { type: "divider", key: "divider-11" },
        { key: "D64", label: "Anemia (D64)", onClick: () => formik.setFieldValue("primaryDiagnosis", "D64") },
        { type: "divider", key: "divider-12" },
        { key: "A15", label: "Tuberculosis (A15)", onClick: () => formik.setFieldValue("primaryDiagnosis", "A15") },
        { type: "divider", key: "divider-13" },
        { key: "B54", label: "Malaria (B54)", onClick: () => formik.setFieldValue("primaryDiagnosis", "B54") },
        { type: "divider", key: "divider-14" },
        { key: "A41", label: "Sepsis (A41)", onClick: () => formik.setFieldValue("primaryDiagnosis", "A41") },
        { type: "divider", key: "divider-15" },
        { key: "A90", label: "Dengue Fever (A90)", onClick: () => formik.setFieldValue("primaryDiagnosis", "A90") },
        { type: "divider", key: "divider-16" },
        { key: "U07.1", label: "COVID-19 (U07.1)", onClick: () => formik.setFieldValue("primaryDiagnosis", "U07.1") },
        { type: "divider", key: "divider-17" },
        { key: "K27", label: "Peptic Ulcer Disease (K27)", onClick: () => formik.setFieldValue("primaryDiagnosis", "K27") },
        { type: "divider", key: "divider-18" },
        { key: "G40", label: "Epilepsy (G40)", onClick: () => formik.setFieldValue("primaryDiagnosis", "G40") },
        { type: "divider", key: "divider-19" },
        { key: "C80", label: "Cancer (C80)", onClick: () => formik.setFieldValue("primaryDiagnosis", "C80") },
        { type: "divider", key: "divider-20" }
    ];

    const labTestItems: DropdownItem[] = [
        { key: "R79.0", label: "Blood Glucose Test (R79.0)", onClick: () => formik.setFieldValue("labTests", "R79.0") },
        { type: "divider", key: "divider-1" },
        { key: "Z13.6", label: "Lipid Profile Test (Z13.6)", onClick: () => formik.setFieldValue("labTests", "Z13.6") },
        { type: "divider", key: "divider-2" },
        { key: "Z11.3", label: "HIV Screening (Z11.3)", onClick: () => formik.setFieldValue("labTests", "Z11.3") },
        { type: "divider", key: "divider-3" },
        { key: "Z11.4", label: "Hepatitis B Screening (Z11.4)", onClick: () => formik.setFieldValue("labTests", "Z11.4") },
        { type: "divider", key: "divider-4" },
        { key: "R10.9", label: "Urine Analysis (R10.9)", onClick: () => formik.setFieldValue("labTests", "R10.9") },
        { type: "divider", key: "divider-5" },
        { key: "Z01.89", label: "Electrolyte Panel (Z01.89)", onClick: () => formik.setFieldValue("labTests", "Z01.89") },
        { type: "divider", key: "divider-6" }
    ];

    const serviceTypeItems: DropdownItem[] = [
        { key: "OPD", label: "Outpatient Consultation (OPD)", onClick: () => formik.setFieldValue("serviceType", "OPD") },
        { type: "divider", key: "divider-1" },
        { key: "IPD", label: "Inpatient Admission (IPD)", onClick: () => formik.setFieldValue("serviceType", "IPD") },
        { type: "divider", key: "divider-2" },
        { key: "ER", label: "Emergency Services (ER)", onClick: () => formik.setFieldValue("serviceType", "ER") },
        { type: "divider", key: "divider-3" },
        { key: "S1", label: "Surgery (S1)", onClick: () => formik.setFieldValue("serviceType", "S1") },
        { type: "divider", key: "divider-4" },
        { key: "L1", label: "Laboratory Services (L1)", onClick: () => formik.setFieldValue("serviceType", "L1") },
        { type: "divider", key: "divider-5" },
        { key: "T1", label: "Telemedicine (T1)", onClick: () => formik.setFieldValue("serviceType", "T1") },
        { type: "divider", key: "divider-6" }
    ];

    
    
    return (
        <Overlay onClick={close}>
            <Container 
                display={display}
                setDisplay={setDisplay}
                onClose={close}
                className="!w-[700px] !h-[700px]"
            >
                <div className="flex flex-col gap-6 w-full py-8 px-8 overflow-y-auto">
                    <div className="flex flex-col w-full gap-2">
                        <Text 
                            fontfamily="greater-theory"
                            className="pl-1"
                        >
                            Add Claim
                        </Text>
                        <Divider />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <div className="flex flex-col pl-1">
                            <Text 
                                fontfamily="greater-theory"
                            >
                                Select Patient
                            </Text>
                            <Text
                                textColor={theme.colors.text.tetiary}
                            >
                                Search for a patient by name, NHIS ID, or token. The patient must be checked in and checked out before submitting a claim.
                            </Text>
                        </div>
                        <Dropdown >
                            <Input
                                value={patientSearchValue}
                                setValue={setPatientSearchValue}
                                placeholder="Search by name, NHIS ID, or token"
                                PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                            />
                        </Dropdown>
                    </div>
                    <Divider />
                    <div className="flex flex-col gap-2 w-full">
                        <Text
                            fontfamily="greater-theory"
                            className="!pl-1"
                        >
                            Diagnosis & Treatment Details
                        </Text>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="flex flex-col pl-1">
                                    <Text>
                                        Diagnosis
                                    </Text>
                                    <Text textColor={theme.colors.text.tetiary}>
                                        Select the main condition diagnosed (ICD-10 code).
                                    </Text>
                                </div>
                                <Dropdown 
                                    className="flex-1 !h-[300px]"
                                    outterContainerClassName="flex-1"
                                    menuItems={mainConditionItems}
                                >
                                    <Input
                                        value={patientSearchValue}
                                        setValue={setPatientSearchValue}
                                        placeholder="Select primary diagnosis"
                                        className="!flex !flex-1"
                                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                    />
                                </Dropdown>
                            </div>

                            <Divider />

                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="flex flex-col pl-1">
                                    <Text>
                                        Medical Procedures
                                    </Text>
                                    <Text textColor={theme.colors.text.tetiary}>
                                        Select any procedures performed during treatment (procedure codes).
                                    </Text>
                                </div>
                                <Dropdown 
                                    className="flex-1"
                                    outterContainerClassName="flex-1"
                                >
                                    <Input
                                        value={patientSearchValue}
                                        setValue={setPatientSearchValue}
                                        placeholder="Select medical procedure"
                                        className="!flex !flex-1"
                                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                    />
                                </Dropdown>
                            </div>

                            <Divider />

                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="flex flex-col pl-1">
                                    <Text>
                                        Drugs
                                    </Text>
                                    <Text textColor={theme.colors.text.tetiary}>
                                        Select prescribed medications (generic name, strength, dosage).
                                    </Text>
                                </div>
                                <Dropdown 
                                    className="flex-1"
                                    outterContainerClassName="flex-1"
                                >
                                    <Input
                                        value={patientSearchValue}
                                        setValue={setPatientSearchValue}
                                        placeholder="Select prescribed drugs"
                                        className="!flex !flex-1"
                                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                    />
                                </Dropdown>
                            </div>

                            <Divider />

                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="flex flex-col pl-1">
                                    <Text>
                                        Lab Tests
                                    </Text>
                                    <Text textColor={theme.colors.text.tetiary}>
                                        Select laboratory tests conducted during diagnosis.
                                    </Text>
                                </div>
                                <Dropdown 
                                    className="flex-1"
                                    outterContainerClassName="flex-1"
                                    menuItems={labTestItems}
                                >
                                    <Input
                                        value={patientSearchValue}
                                        setValue={setPatientSearchValue}
                                        placeholder="Select lab tests"
                                        className="!flex !flex-1"
                                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                    />
                                </Dropdown>
                            </div>

                            <Divider />
                        </div>
                    </div>
                    <div className="flex w-full justify-end">
                        <Button 
                            text="Submit Claim"
                            className="!bg-main-primary"
                        />
                    </div>
                </div>
            </Container>
        </Overlay>
    )
}
export default ClaimsForm
