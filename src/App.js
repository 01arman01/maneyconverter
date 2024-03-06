import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";


// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`


function App() {
    const [query, setQuery] = useState(100)
    const [changeValue, setChangeValue] = useState('')
    const [from, setFrom] = useState('USD')
    const [to, setTo] = useState('EUR')
    const arr = ['USD', 'EUR', 'CAD', 'INR']
    const [isLoading, setIsLoading] = useState(false)
    const HandleEditQuery = (e) => {
        setQuery(e.target.value)
    }
    const handleChangeFrom = {}

    useEffect(() => {
        async function fetchmaneyCalculiate() {
            try {
                if (query <= 0) return
                setIsLoading(true)
                const res = await fetch(`https://api.frankfurter.app/latest?amount=${query}&from=${from}&to=${to}`)
                if (!res.ok) {
                    throw new Error('sxal harcum')
                }
                const data = await res.json()
                if (data.Response === 'False') {
                    throw new Error('Value not found')
                }
                setChangeValue(data.rates[to])
            } catch (err) {
                console.error(err)
            }
        }

        fetchmaneyCalculiate()
        setIsLoading(false)

    }, [query, from, to, changeValue])

    console.log(changeValue)
    console.log(query)
    console.log(from)
    console.log(to)


    return (
        <div className="App">
            <input disabled={isLoading} type="number" value={query} onChange={e => HandleEditQuery(e)}/>
            <select
                value={from}
                onChange={(e) => {
                    setFrom(e.target.value)
                }}
                disabled={isLoading}
            >

                {
                    arr.filter(item => item !== to).map((item) => {
                        return <option value={item}>{item}</option>
                    })
                }
            </select>
            <select
                value={to}
                onChange={e => setTo(e.target.value)}
                disabled={isLoading}
            >
                {
                    arr.filter(item => item !== from).map((item) => {
                        return <option value={item}>{item}</option>
                    })
                }
            </select>
            {isLoading ? <p>Loadding...</p> : <p>{changeValue} {to}</p>}
        </div>
    );
}

export default App;
