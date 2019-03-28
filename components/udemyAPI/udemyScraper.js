const divList = [...document.querySelectorAll(".profile-course-card--card--sx0Aa")]
for (let i = 0; i<divList.length; i++) {
    let courseId = i + 1
    let photoUrl = divList[i].lastChild.attributes[0].ownerElement.childNodes[0].childNodes[0].childNodes[0].childNodes[0].currentSrc
    let title = divList[i].lastChild.attributes[0].ownerElement.firstChild.children[0].children[0].nextElementSibling.children[0].childNodes[0].innerText
    let author = divList[i].lastChild.children[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1].innerText
    let rating = divList[i].lastChild.attributes[0].ownerElement.firstChild.children[0].children[0].nextElementSibling.childNodes[1].firstChild.innerText
    let courseUrl = divList[i].childNodes[1].childNodes[0].childNodes[0].href
    console.log("\n\ncourseId:  ",courseId,"\ntitle:  ",title,"\nauthor:  ",author,"\nudemyRating:  ",rating,"\nphotoUrl:  ",photoUrl,"\ncourseUrl:  ",courseUrl)

}