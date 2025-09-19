import React from "react";
import numeral from 'numeral'
// pass as a props the amount and make it format
const CurrencyFormat=({amount})=>{
    const formattedAmount=numeral(amount).format("$0,0.00")
    return <div>{formattedAmount}</div>
}
export default CurrencyFormat