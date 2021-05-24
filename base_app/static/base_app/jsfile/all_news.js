fetch("https://bing-news-search1.p.rapidapi.com/news?textFormat=Raw&safeSearch=Off", {
	"method": "GET",
	"headers": {
		"x-bingapis-sdk": "true",
		"x-rapidapi-key": "ef835c617cmsh1dd90528e2f583bp128877jsndbe1a82212ba",
		"x-rapidapi-host": "bing-news-search1.p.rapidapi.com"
	}
})
.then(response => {
	return response.json();
})
.then(data =>{
   
    data.value.forEach(element => {
        console.log(element);
        let a =  document.getElementById("all_news");
        let headline = document.createElement("h2");
        headline.innerText= element.name;
        headline.classList.add("mt-5");
        headline.classList.add("mb-4");
        headline.classList.add("fw-bolder");
        let news = document.createElement("p");
        news.innerText = element.description;
        news.classList.add("fs-5");
        news.classList.add("mb-4");
        a.appendChild(headline);
        a.appendChild(news);

        
    });

})
.catch(err => {
	console.error(err);
});
