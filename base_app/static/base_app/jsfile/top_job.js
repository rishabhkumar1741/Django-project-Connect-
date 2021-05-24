let count = 1;
let a = document.getElementById("job_card");
let b = document.getElementById("ris-container");



fetch("https://job-search4.p.rapidapi.com/indeed/search?query=Software%20Engineer&page=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "ef835c617cmsh1dd90528e2f583bp128877jsndbe1a82212ba",
		"x-rapidapi-host": "job-search4.p.rapidapi.com"
	}
})
.then(response => {
	return response.json();
})
.then(data => {
	data.jobs.forEach(element => {
        let clone = a.cloneNode(true);
        clone.getElementsByTagName('h5')[0].innerText = element.title ;
        clone.getElementsByTagName('h6')[0].innerText = element.company_name;
        clone.getElementsByTagName('p')[0].innerText = element.description;
        clone.getElementsByTagName('h5')[1].innerText = element.country;
        clone.getElementsByTagName('a')[0].href = element.detail_url;
        b.appendChild(clone);
    

    });
})
.catch(err => {
	console.error(err);
});



window.onscroll = function() {
    if ((window.innerHeight + window.scrollY + 100) >= document.body.offsetHeight) {
        console.log("scrool");
        count++;
        fetch(`https://job-search4.p.rapidapi.com/indeed/search?query=Software%20Engineer&page=${count}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "ef835c617cmsh1dd90528e2f583bp128877jsndbe1a82212ba",
		"x-rapidapi-host": "job-search4.p.rapidapi.com"
	}
})
.then(response => {
	return response.json();
})
.then(data => {
	data.jobs.forEach(element => {
        let clone = a.cloneNode(true);
        clone.getElementsByTagName('h5')[0].innerText = element.title ;
        clone.getElementsByTagName('h6')[0].innerText = element.company_name;
        clone.getElementsByTagName('p')[0].innerText = element.description;
        clone.getElementsByTagName('h5')[1].innerText = element.country;
        clone.getElementsByTagName('a')[0].href = element.detail_url;
        b.appendChild(clone);
    

    });
})
.catch(err => {
	console.error(err);
});


    }
};