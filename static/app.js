/** @type {HTMLDivElement} */
const shortenedUrlContainer = document.querySelector(".shortened_container");

/** @type {HTMLButtonElement} */
const submitButton = document.querySelector(".primary");

/** @type {HTMLFormElement} */
const urlForm = document.querySelector("#url-form");

/** @type {HTMLInputElement} */
const urlInput = document.querySelector("#url");

urlForm.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("sending URL:", urlInput.value);

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
