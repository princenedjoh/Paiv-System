import Input from "@components/input/input"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { ChangeEvent, DetailedHTMLProps, HTMLInputAutoCompleteAttribute, InputHTMLAttributes, ReactNode } from "react"

const FormInput = ({
    value,
    handleBlur,
    handleChange,
    touched,
    error,
    autofocus,
    PreIcon,
    PostIcon,
    name,
    type,
    placeholder,
    label,
    autoComplete,
    inputProps
} : {
    value : string,
    handleChange : (e?:ChangeEvent<HTMLInputElement>)=>void
    handleBlur : ()=>void
    error? : string
    touched? : boolean
    autofocus? : boolean
    PreIcon? : ReactNode
    PostIcon? : ReactNode
    name : string,
    type? : "number" | "text" | "password",
    placeholder? : string,
    label : string
    autoComplete? : HTMLInputAutoCompleteAttribute
    inputProps? : DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}) => {
    return (
        <div className="flex flex-col gap-[6px] w-full h-fit">
            <Text
                textColor={theme.colors.text.primary} 
                className="pl-1"
            >
                {label}
            </Text>
            <Input
                PreIcon={PreIcon}
                PostIcon={PostIcon}
                type={type ?? 'text'}
                name={name}
                placeholder={placeholder}
                autofocus={autofocus}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${error && touched ? '!border-[#d44848]' : ''}`}
                inputClassName="!h-[25px]"
                autoComplete={autoComplete}
                inputProps={inputProps}
            />
            {
                error && touched && (
                    <Text
                        textColor='#d44848'
                    >
                        {error}
                    </Text>
                )
            }
        </div>
    )
}
export default FormInput