async function handleFormSubmission(e) {
    e.preventDefault(); // Prevent the form from submitting normally.

    // Capture the form input values.
    const gameTitle = document.getElementById("gameTitle").value;
    const userName = document.getElementById("userName").value;
    const userURL = document.getElementById("link").value;

    const errDiv = document.getElementById("error");

    let shortenedURL;

    // Use a null value for the link if the user didn't provide one.
    const urlToSend = userURL || null;

    console.log(gameTitle);
    console.log(userName);
    console.log(urlToSend);

    if (errDiv.firstChild) {
        errDiv.removeChild(errDiv.firstChild);
    }

        // Check if the link starts with "http://" or "https://" (case-insensitive)
        const urlPattern = /^(http:\/\/|https:\/\/)/i;
        const isValidURL = urlPattern.test(urlToSend);
    try {
        if (urlToSend !== null) {

            if (!isValidURL) {
                const errLabel = document.createElement("label");
                errDiv.style.padding = "5px"
                errDiv.style.borderColor = "black";
                errDiv.style.borderWidth = "1px"; 
                errDiv.style.borderStyle = "solid";
                errLabel.className = "errLabel"
                errLabel.innerHTML = "Write a full link, e.g. https://Youtube.com";
                errDiv.appendChild(errLabel);
                return false; // Stop further processing if the link is invalid.
            }

            const url = 'https://url-shortener-service.p.rapidapi.com/shorten';
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': '4099ab78f2msh0eb22cfce6cef26p1cbbd7jsn21da45057ae1',
                    'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
                },
                body: new URLSearchParams({
                    url: urlToSend
                })
            };

            const response = await fetch(url, options);
            const result = await response.json();
            shortenedURL = result.result_url;
            console.log(shortenedURL);

            if (shortenedURL === undefined) {
                const errLabel = document.createElement("label");
                errDiv.style.padding = "5px"
                errDiv.style.borderColor = "black";
                errDiv.style.borderWidth = "1px"; 
                errDiv.style.borderStyle = "solid";
                errLabel.className = "errLabel"
                errLabel.innerHTML = "Write a full link, e.g. https://Youtube.com";
                errDiv.appendChild(errLabel);
            }
        }
        // Send the data to the PHP script
        const data = {
            gameTitle: gameTitle,
            userName: userName,
            link: shortenedURL || null
        };

        let exists = document.getElementsByClassName("errLabel")
        if (exists.length === 0) {
            const phpResponse = await fetch('../php/Suggest.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (phpResponse.ok) {
                const result = await phpResponse.text();
                console.log(result);

                if (result == "Data inserted successfully.") {
                    const errDiv = document.getElementById("error");
                    errDiv.style.padding = "5px"
                    errDiv.style.borderColor = "black";
                    errDiv.style.borderWidth = "1px"; 
                    errDiv.style.borderStyle = "solid";
                    const sucLabel = document.createElement("label");
                    sucLabel.className = "sucLabel"
                    sucLabel.innerHTML = "Suggestion submitted!";
                    errDiv.appendChild(sucLabel);
                }

            } else {
                console.error('Failed to insert data into the database.');
            }
        }

    } catch (error) {
        console.error(error);
    }
}

// Add an event listener to the form to call the handleFormSubmission function when the form is submitted.
document.getElementById("suggestionForm").addEventListener("submit", handleFormSubmission);
