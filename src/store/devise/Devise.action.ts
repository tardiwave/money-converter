import { getCoef } from "../../service/converter"
import { AppDispatch } from "../store"
import { SET_AMOUNT_OUT, SET_AMOUNT_IN } from "./Devise.reducers"

export const convert = (amountIn : number) => {
  return async ( dispatch : AppDispatch , getState : any) => {
    let converted = 0
    if (amountIn > 0) {
      let result = await getCoef()
      result = Object.values(result)[0]
      converted = result * amountIn
    }
    
    dispatch(SET_AMOUNT_IN(amountIn))
    dispatch(SET_AMOUNT_OUT(converted))
  }
}