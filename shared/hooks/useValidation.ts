"use client"
import { useEffect, useState } from "react"
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const validateEmail = (email: string) => {
  return EMAIL_REGEXP.test(email)
};
export interface ValidationProp {
  isEmpty?: {value: boolean, message: string};
  minLength?: {value: number, message: string},
  maxLength?: {value: number, message: string};
  isEmail?: {value: boolean, message: string}
}
export const useValidation = (value: string, validations: ValidationProp) => {
  const [isEmpty, setEmpty] = useState({value: validations?.isEmpty?.value || false, message: ''})
  const [minLengthError, setMinLengthError] = useState({value: false, message: ''})
  const [maxLengthError, setMaxLengthError] = useState({value: false, message: ''})
  const [isEmail, setIsEmail] = useState({value: validations?.isEmail?.value || false, message: ''})
  const [isInputValid, setInputValid] = useState(false)
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < (validations?.minLength?.value || 0) ? setMinLengthError({value: true, message: validations?.minLength?.message || ''}) : setMinLengthError({value: false, message: ''})
          break
        case 'isEmpty':
          value ? setEmpty({value: false, message: ''}) : setEmpty({value: true, message: validations?.isEmpty?.message || ''})
          break
        case 'maxLength': 
          value.length > (validations?.maxLength?.value || 10000) ? setMaxLengthError({value:true, message: validations?.maxLength?.message || ''}) : setMaxLengthError({value: false, message: ''})
          break
        case 'isEmail':
          const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          re.test(String(value).toLowerCase()) ? setIsEmail({value: true, message: ''}) : setIsEmail({value: false, message: validations?.isEmail?.message || ''})
          break
      }
    }
  }, [value])
  useEffect(() => {
    if (isEmpty.value || maxLengthError.value || minLengthError.value || isEmail.value) {
      setInputValid(false)
    } else {
      setInputValid(true)
    }
  }, [isEmpty, maxLengthError, minLengthError, isEmail])
  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    isInputValid,
    isEmail
  }
}