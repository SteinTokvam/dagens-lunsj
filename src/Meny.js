import { useEffect, useState } from 'react';
import './Meny.css'
import Dag from './Dag';

export default function Meny() {
    const[meny, setMeny] = useState('')
    const dayOfWeek = new Date().getDay()-1

    useEffect(() => {
        function getMeny(url) {
            fetch(url)
            .then((res) => res.json())
            .then(e => setMeny(e))
        }
        getMeny('https://raw.githubusercontent.com/SteinTokvam/dagens-lunsj/main/meny.json')
    }, []);

    function getDayMenu(dayOfWeek) {
        if(meny !== '') {
            return {
                kantine: meny[dayOfWeek].kantine,
                rett: meny[dayOfWeek].meny}
            }   
        }
        return null
    }

    const dagens = getDayMenu(dayOfWeek)
    return(<>
        {
            dagens !== '' ? 
            dagens.map((d, index) =><Dag key={index} kantine={d.kantine} meny={d.rett}/>) : ''
        }
        <div className='restenAvUken'>
            <h1>Resten av uken</h1>
            {
            meny !== '' ? 
                ''
                
                    
                : ''
        }  
      </div>
    </>
    )
}
