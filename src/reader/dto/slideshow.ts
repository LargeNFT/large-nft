interface Slideshow {
    elements?:SlideShowElement[]
}


interface SlideShowElement {
    html?:string
    caption?:string 
    url?:string 
}

export {
    Slideshow
}