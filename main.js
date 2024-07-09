const API_KEY=`9d28b9131a0d4ce6bde7508053fd0bbd`
const getLatestNews = async ()=>{
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    ) ;
    const response = await fetch(url)
    console.log("rrr",response)
};
getLatestNews();