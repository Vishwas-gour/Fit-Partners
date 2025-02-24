/* eslint-disable react/prop-types */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { starPrintForCard } from '../Functions/starPrint';

function StarAvg({ id }) {
    const [data, setData] = useState([]);
    const [totalStar, setTotalStars] = useState(0);


    async function loadData(id) {
        const addDataApi = `http://localhost:3000/review/?productId=${id}`;
        const cardsApi = `http://localhost:3000/products/${id}`;
        await axios.get(addDataApi).then(res => {
            setData(res.data);
             
             let cardData = res.data;
             let length = res.data.length;
            // Traverval on review id
            setTotalStars(cardData.reduce((accu, cValue) => accu + +(cValue.star), 0));
            // If responce length == 0 then patch API not resolve
            if(length == 0 ) return;
             axios.patch((cardsApi), {
                noOfReviews: length,
                rating: +((totalStar/(length*5))*5).toFixed(1)
            }).catch((error)=>console.log(error))
        }) ;
    }

    useEffect(() => {
        loadData(id)
    }, [id, totalStar])

    return (
        <>
            <div value="">{starPrintForCard(data.length, totalStar)}</div>
        </>
    )
}

export default StarAvg;