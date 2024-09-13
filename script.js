console.log("loaded script.js")


function returnTags(spoiler_el) {
    return ["World Cup", "Ronaldo", "Goal"]
}

function getTagEl(text) {
    const el = document.createElement("div");
    el.innerHTML = text;
    el.classList.add("tag")
    return el;
}
function displayTags(event, spoiler_el) {

    var box = document.getElementById("tag-display");
    // box.style.position = "absolute";
    // box.style.backgroundColor = "black";
    // box.style.visibility="visible";
    // const width = "5rem";
    // const height = "2rem";
    // box.style.width = width;
    // box.style.height = height;

    // box.innerHTML = returnTags(spoiler_el);
    const tags = returnTags(spoiler_el)
    for(var i = 0 ; i < tags.length; i++) {
        box.appendChild(getTagEl(tags[i]))
    }

    // Calculate position of tag box
    const tag_x = event.pageX  + "px"
    const tag_y = spoiler_el.getBoundingClientRect().y + "px"  

    // box.style.setProperty('display', "block")
    const y_string = 'calc(' + tag_y + " - " + box.offsetHeight+ "px - 1rem" + ')'
    const x_string = 'calc(' + tag_x + " - " + box.offsetWidth + "px / 2" + ')'
    box.style.setProperty('top', y_string);
    box.style.setProperty('left', x_string);
    box.classList.add("visible-tag");



}

function load() {
    let spoiler_els = document.getElementsByClassName("spoiler")
    for(var i = 0; i < spoiler_els.length; i++) {
        let spoiler_el = spoiler_els[i];
        spoiler_el.addEventListener("mouseenter", (event) => {
            var timer_stop = false;
            timer = setTimeout(() => {
                displayTags(event, spoiler_el);
                timer_stop = true;
            }, 500)
            spoiler_el.addEventListener("mouseleave", () => {
                clearTimeout(timer)

                if(timer_stop) {
                    
                    timer_remove = setTimeout(() => {
                        document.getElementById("tag-display").classList.remove("visible-tag")
                    }, 500)

                    var box = document.getElementById("tag-display");
                    box.addEventListener("mouseenter", () => {
                        clearTimeout(timer_remove)
                        box.addEventListener("mouseleave", () => {
                            document.getElementById("tag-display").classList.remove("visible-tag")
                        })
                    })
                }
            })
        })
    }
}

window.addEventListener("load", function(event) {
    load();
})