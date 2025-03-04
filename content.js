const bookmarkIconUrl = chrome.runtime.getURL("assets/bookmark.png");
// console.log("Bookmark Icon URL: ", bookmarkIconUrl);\
const AZ_Key = "AZ_Key";

// window.addEventListener("load", addBookMarkButton);

const observer = new MutationObserver(()=>{
    addBookMarkButton();
})

observer.observe(document.body,{childList:true,subtree:true});

addBookMarkButton();

function onProblemsPage(){
    return window.location.pathname.startsWith("/problems/");
}
function addBookMarkButton() {
    // console.log("Triggered");
    if(!onProblemsPage() || document.getElementById("bookmark_Button")) return;
    const bookmarkButton = document.createElement("img");
    bookmarkButton.id = "bookmark_Button";
    bookmarkButton.src = bookmarkIconUrl;
    bookmarkButton.style.height = "20px";
    bookmarkButton.style.width = "20px";
    bookmarkButton.style.cursor = "pointer";
    
    const ask_doubt_button = document.getElementsByClassName("coding_ask_doubt_button__FjwXJ")[0];

    if (ask_doubt_button) {
        ask_doubt_button.parentNode.insertAdjacentElement("afterEnd", bookmarkButton);
        // console.log("Bookmark Button added.");
    } else {
        console.error("Element with class 'coding_ask_doubt_button__FjwXJ' not found.");
    }
    bookmarkButton.addEventListener("click",addNewBookMark);

}

async function addNewBookMark(){
    const currentBookmarks = await getBookmarks();
    const problem_Url = window.location.href;
    const problem_title = document.getElementsByClassName("Header_resource_heading__cpRp1")[0].innerText;
    const uniqueId = getUniqueId(problem_Url);

    const newBookMark = {
        id: uniqueId,
        title: problem_title,
        url: problem_Url
    }
    if(currentBookmarks.find(bookmark => bookmark.id === uniqueId)) return;

    const updatedBookmarks = [...currentBookmarks,newBookMark];
    chrome.storage.sync.set({AZ_Key: updatedBookmarks},()=>{
        console.log("Bookmark Added to" , updatedBookmarks);
    })

    function getUniqueId(url){
        const start = url.indexOf("problems/") + "problems/".length;
        const end = url.indexOf("?",start);
        return end===-1 ? url.substring(start) : url.substring(start,end);
    }

    function getBookmarks(){
        return new Promise((resolve,reject)=>{
            chrome.storage.sync.get([AZ_Key], (result) => {
                resolve(result[AZ_Key] || []);
            })
        })
    }
}