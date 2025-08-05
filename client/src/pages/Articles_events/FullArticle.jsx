//A data provider file, defines everything as a single object - ArticleData..and passes it to Article component using spread syntax

import Article from "./Article";

export default function FullArticle() {
  const articleData = {
    title: "How AI is Changing the World",
    image: "https://d2rqvd0kuag1qx.cloudfront.net/blog-15.jpg",
    date: new Date().toLocaleDateString(),
    content: `Artificial Intelligence is rapidly transforming industries.From healthcare to transportation, AI is improving efficiency and creating new opportunities.The future is AI-powered, and it's already here.Embracing AI is no longer optional — it's essential for innovation and progress.`,
    carousel: [
      {src: "https://static.scientificamerican.com/sciam/cache/file/6B2730C8-B0D0-485F-A0618F3954CF58D8_source.jpg?w=1200"},
      {src: "https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
      {src: "https://www.carbonbrief.org/wp-content/uploads/2021/06/Blue-sky-with-clouds-1550x804.jpg"}
    ]
  };

  return <Article {...articleData} />;
}
