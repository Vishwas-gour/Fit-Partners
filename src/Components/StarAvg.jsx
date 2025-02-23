/* eslint-disable react/prop-types */
import axios from 'axios'
import  { useEffect, useState } from 'react'
import { starPrintForCard } from '../Functions/starPrint';

function StarAvg({ id }) {
    const [data, setData] = useState([]);

    async function loadData(id) {
        const addDataApi = `http://localhost:3000/review/?productId=${id}`;
        const object = await axios.get(addDataApi);
        setData(object.data);
    }
    let totalStar = data.reduce((accu, cValue) => {
        return accu + +(cValue.star);
    }, 0)
    useEffect(() => {
        loadData(id)
    })
    return (
        <>
            <div value="">{starPrintForCard(data.length, totalStar)}</div>
        </>
    )
}

export default StarAvg;