/** @type {HTMLDivElement} */
const shortenedUrlContainer = document.querySelector(".shortened_container");

/** @type {HTMLButtonElement} */
const submitButton = document.querySelector(".primary");

/** @type {HTMLInputElement} */
const urlInput = document.querySelector("#url");

submitButton.addEventListener("click", () => {
    fetch("/api/url", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: urlInput.value }),
    })
        .then((r) => r.json())
        .then(console.log);
});
