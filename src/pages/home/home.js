import React, { useState, useEffect } from 'react';

export default function Home() {
    const [list, setList] = useState([]);
    useEffect(() => {
        getList();
    }, []);
    const getList = () => {
        fetch('/api/getList')
        .then(res=>res.json())
        .then(list=> setList(list))
    }
    return (
        <div>
            {list.map(item => item)}
        </div>
    )
}
