import { useEffect, useState } from 'react';
import './Meny.css'

export default function Meny() {
    const[bright, setBright] = useState('')
 
    useEffect(() => {
        function getMeny(url) {
            fetch(url)
            .then((res) => res.json())
            .then(e => setBright(e))
        }
        getMeny('https://raw.githubusercontent.com/SteinTokvam/dagens-lunsj/main/meny.json')
    }, []);

    const dayOfWeek = new Date().getDay()-1

    return(<div className='float-container'>
    {/*  
        <div className='float-child'>
        {bright !== '' ? <h1>{bright[0].Kantine}</h1>: ''}
        {bright !== '' ? <h3>{bright[0].meny[dayOfWeek].dag}</h3>: ''}
        {bright !== '' ? <p>{bright[0].meny[dayOfWeek].meny}</p>: ''}
            
        </div>
*/}
    <div className='float-child'>
        {bright !== '' ? <h1>{bright[1].Kantine}</h1>: ''}
        {bright !== '' ? <h3>{bright[1].meny[dayOfWeek].dag}</h3>: ''}
        {bright !== '' ? <p>{bright[1].meny[dayOfWeek].meny}</p>: ''}
    </div>
    </div>
    )
}
