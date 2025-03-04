const AZ_Key = "AZ_Key";

const assets = {
    "play":chrome.runtime.getURL("assets/play.png"),
    "delete":chrome.runtime.getURL("assets/delete.png")
}

const bookmarkSection = document.getElementById("bookmarks");
console.log("Bookmark Section: ", bookmarkSection);
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get([AZ_Key], (data) =>{
        const currentBookmarks = data[AZ_Key] || [];
        console.log("Current Bookmarks: ", currentBookmarks);
        viewBookmarks(currentBookmarks);
    })
})

function viewBookmarks(bookmarks){
    bookmarkSection.innerHTML = "";

    if(bookmarks.length === 0){
        bookmarkSection.innerHTML = "No Bookmarks Added Yet.";
        return;
    }

    bookmarks.forEach((bookmark) =>{
        addNewBookMark(bookmark);
    })
}

function addNewBookMark(bookmark){
    const bookmarkElement = document.createElement("div");
    const bookmarkTitle = document.createElement("div");
    const bookmarkControls = document.createElement("div");

    bookmarkTitle.innerHTML = bookmark.title;
    bookmarkElement.classList.add("bookmark");
    bookmarkTitle.classList.add("bookmark-title");
    bookmarkControls.classList.add("bookmark-controls");

    bookmarkElement.setAttribute("url",bookmark.url);
    bookmarkElement.setAttribute("id",bookmark.id);

    setAttributeControl(assets.play,onPlay,bookmarkControls);
    setAttributeControl(assets.delete,onDelete,bookmarkControls);

    bookmarkElement.appendChild(bookmarkTitle);
    bookmarkElement.appendChild(bookmarkControls);
    bookmarkSection.appendChild(bookmarkElement);
}

function setAttributeControl(src,handler,parentDiv){
    const control = document.createElement("img");
    control.src = src;
    control.addEventListener("click",handler);
    parentDiv.appendChild(control);
}

function onPlay(event){
    const bookmarkItem = event.target.parentNode.parentNode.getAttribute("url");
    window.open(bookmarkItem, "_blank");
}

function onDelete(event){
    const bookmarkItem = event.target.parentNode.parentNode;
    const bookmarkId = bookmarkItem.getAttribute("id");

    removeItemFromStorage(bookmarkId);
}

function removeItemFromStorage(id){
    chrome.storage.sync.get([AZ_Key], (data) =>{
        const currentBookmarks = data[AZ_Key] || [];
        const updatedBookmarks = currentBookmarks.filter(bookmark => bookmark.id !== id);
        chrome.storage.sync.set({AZ_Key: updatedBookmarks},()=>{
            console.log("Bookmark Removed");
            viewBookmarks(updatedBookmarks);
        })
})}