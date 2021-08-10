

const oscurecer = (e) => {
    e.preventDefault()
    $("body").css("background-color", "#373d3c")
    $("li").css("background-color", "grey")
    $("header").css("background-color", "#135345")
    $("li").css("color", "rgba(255,255,255,0.9)")

    

       
}




$("#dark").click(oscurecer)