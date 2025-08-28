import React from 'react'

export default function Search({type, placeholder, className}) {
    return <input type={ type || "search" } placeholder={ placeholder } className={ className }/>
}

