import { useState } from 'react'
import { months, years, style } from './shared'

export const formatCardNumber = (value: string) => {
    const regex = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
    const onlyNumbers = value.replace(/[^\d]/g, '')

    return onlyNumbers.replace(regex, (regex: any, $1: any, $2: any, $3: any, $4: any) =>
        [$1, $2, $3, $4].filter(group => !!group).join(' ')
    )
}

const obsureCardNumber = (value: string) => {
    const onlyNumbers = value.replace(/[^\d]/g, '')
    const lastFour = onlyNumbers.slice(-4)
    const firstFour = onlyNumbers.slice(0, 4)
    const obscure = onlyNumbers.slice(4, -4).replace(/\d/g, '*')

    const obscured = `${firstFour}${obscure}${lastFour}`
    
    const formatted = obscured.match(/.{1,4}/g);
    return formatted?.join(' ')
}

export default function CardDetailsForm() {
    const [cardNumber, setCardNumber] = useState('#### #### #### ####')
    const [cardHolder, setCardHolder] = useState('FIRSTNAME LASTNAME')
    const [expiryMonth, setExpiryMonth] = useState('')
    const [expiryYear, setExpiryYear] = useState('')
    const [cvc, setCvc] = useState('')
    const [isCardInputFocused, setIsCardInputFocused] = useState(true)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const data = {
            cardNumber: cardNumber.replace(/\s/g, ''),
            cardHolder,
            expiryMonth,
            expiryYear,
            cvc
        }
        console.log(data)
    }

    return (
        <div className="w-[90%] md:w-1/3 absolute">
            <div style={style} className="relative w-[80%] md:w-[70%] rounded-lg mx-auto -mb-16 md:-mb-24 shadow-lg h-42 md:h-52 p-4 flex flex-col justify-between">
                <div className="flex justify-between">
                    <img src="/images/chip.png" alt="chip" className="w-14 h-10 rounded-lg" />
                    <img src="/images/visa.png" alt="visa" className="w-16 h-10 rounded-lg" />
                </div>
                <span className="text-white text-xl font-bold">{isCardInputFocused ? formatCardNumber(cardNumber) : obsureCardNumber(cardNumber)}</span>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-white text-xs">Card Holder</span>
                        <span className="text-white text-sm font-bold">{cardHolder?.toUpperCase()}</span>
                    </div>
                    <div className="px-2 p-1 flex flex-col border-[1px] border-gray-100 rounded-md">
                        <span className="text-white text-xs">Expires</span>
                        <span className="text-white text-sm font-bold">{expiryMonth || 'MM'}/{expiryYear?.slice(-2) || 'YY'}</span>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 px-4 md:px-8 pb-4 md:pb-8 pt-24 md:pt-32 rounded-lg shadow-lg">
                <div className="mb-6">
                    <label htmlFor="card" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card Number</label>
                    <input onMouseEnter={() => setIsCardInputFocused(true)} onMouseLeave={() => setIsCardInputFocused(false)} value={formatCardNumber(cardNumber)} type="tel" id="card" maxLength={19} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XXXX XXXX XXXX XXXX" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Card Name</label>
                    <input type="text" id="name" maxLength={50} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setCardHolder(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-6 flex space-x-2 w-full">
                    <div className="w-2/3">
                        <label htmlFor="expiry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expiry Date</label>
                        <div className="flex space-x-2">
                            <select id="months" onChange={e => setExpiryMonth(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Month</option>
                                {months.map(month => (
                                    <option key={month.id} value={month.id}>{month.name}</option>
                                ))}
                            </select>
                            <select id="years" onChange={e => setExpiryYear(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="">Year</option>
                                {years.map(year => (
                                    <option key={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <label htmlFor="cvv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CVV</label>
                        <input type="tel" maxLength={3} id="cvv" onInput={
                            (e: React.ChangeEvent<HTMLInputElement>) => {
                                const value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                                setCvc(value)
                            }
                        } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="XXX" required />
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}