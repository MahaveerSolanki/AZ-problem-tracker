const bookmarkIconUrl = chrome.runtime.getURL("assets/bookmark.png");
// console.log("Bookmark Icon URL: ", bookmarkIconUrl);

window.addEventListener("load", addBookMarkButton);

function addBookMarkButton() {
    console.log("Adding Bookmark Button");
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
    bookmarkButton.addEventListener("click", () => {
        alert("Bookmark Button clicked.");
    });

}