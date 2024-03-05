import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";


// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`


function App() {
     const [query,setQuery] = useState(0)
    const [changeValue,setChangeValue] = useState('')
    const [from, setFrom]=useState('EUR')
    const [to, setTo]=useState('USD')


    useEffect(()=>{
        async function fetchmaneyCalculiate (){
            try {
                const res =  await   fetch(`https://api.frankfurter.app/latest?amount=${query}&from=${from}&to=${to}`)
                if (!res.ok){
                    throw new Error('sxal harcum')
                }
                const data = await res.json()
                if (data.Response === 'False') {
                    throw new Error('Value not found')
                }
                setChangeValue(data)
            }catch (err){
                console.error(err)
            }
        }
        fetchmaneyCalculiate()
    },[])

    console.log(changeValue)
    console.log(query)
    console.log(from)
    console.log(to)


  return (
    <div className="App">
       <input type="text" value={query} onChange={e=>{setQuery(e.target.value)}}/>
      <select value={from} onChange={(e)=>{setFrom(e.target.value)}}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={e=>setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
    </div>
  );
}

export default App;
