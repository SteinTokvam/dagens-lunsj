import { useEffect, useState } from 'react';
import JSSoup from 'jssoup';
import './Meny.css'

export default function Meny() {
    const[kroken, setKroken] = useState('')
    const[bright, setBright] = useState('')
 
    function getMeny(url) {
        const meny = fetch(url)
        .then((res) => res.text())
        .then((soup) => new JSSoup(soup).findAll('h3').slice(0, 5))
        .then(meny => {
        const res = []
    
        meny.forEach(element => {
            const dayText = element.contents[0]._text
            var lunsjText = ""
            //console.log(element.contents[0]._text)
            const day = element.contents[0].nextElement
            day.contents.forEach(e => {
            if(e._text !== undefined) {
                lunsjText = lunsjText + '<br />' + e._text
                //console.log(e._text)
            }
            })
            res.push({day: dayText, meny: lunsjText})
        });
        return res
        })
        return meny
    }
    
    const print = (isKroken) => {
        getMeny(isKroken ? 'https://mustadkantine.no/kafekroken' : 'https://mustadkantine.no/brightcafe').then(e => isKroken ? setKroken(e) : setBright(e))
    }

    useEffect(() => {
        print(true)
        print(false)
    });

    function format(string) {
        return string
        .replaceAll('&nbsp;', ' ')
        .replaceAll('&aring;', 'å')
        .replaceAll('&aelig;', 'æ')
        .replaceAll('&amp;', '&')
        .replaceAll('&oslash;', 'ø')
    }

    const dayOfWeek = new Date().getDay()

    return(<div className='float-container'>  
    <div className='float-child'>
        <h1>Kroken</h1>
        {kroken !== '' && dayOfWeek < 6 ? 
        kroken.map((d, index) => {
            const meny = d.meny.split('<br />').splice(2)
            if(index === dayOfWeek-1) {
                return(<>
                    <h3>{d.day}</h3>
                    {
                        meny.map((m) => {
                            return(<p>{format(m)}</p>)
                        })
                    }
                    <p>{}</p>
                </>)
            }
            return null
        }) 
        : 'Stengt'}
    </div>
    <div className='float-child'>
    <h1>Bright</h1>
    {bright !== '' && dayOfWeek < 6 ? 
        bright.map((d, index) => {
            const meny = d.meny.split('<br />').splice(2)
            if(index === dayOfWeek-1) {
                return(<>
                    <h3>{d.day}</h3>
                    {
                        meny.map((m) => {
                            return(<p>{format(m)}</p>)
                        })
                    }
                    <p>{}</p>
                </>)
            }
            return null
        }) 
        : 'Stengt'}
    </div>
    </div>
    )
}
