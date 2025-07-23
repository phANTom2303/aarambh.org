import ArticleList from "./articleList";

export default function ArticleDashboard() {
    const [isFormActive, setIsFormActive] = useState(false);
    return (
        <>
            <ArticleList />
        </>
    );
}