import ArticleList from "./articleList";
import AddArticleForm from "./addArticleForm";
import { useState } from "react";
import styles from './articleDashboard.module.css'; // Import CSS module
import ModifyArticleForm from "./modifyArticleForm";

export default function ArticleDashboard() {

    const [isFormActive, setIsFormActive] = useState(false);
    const [isModifyFormActive, setIsModifyFormActive] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');
    const [articleToModify, setArticleToModify] = useState({
        title: "",
        eventDate: "",
        heroImage: "",
        overview: "",
    });
    return (<div className={styles.dashboardContainer}> {/* Use styles.dashboardContainer */}

        {isFormActive && <AddArticleForm setIsFormActive={setIsFormActive} />}

        {isModifyFormActive && <ModifyArticleForm setIsModifyFormActive={setIsModifyFormActive} article={articleToModify} />}

        {(!isFormActive && !isModifyFormActive) &&
            <>
                <div className={styles.controlsContainer}> {/* Use styles.controlsContainer */}
                    <input
                        type="text"
                        value={searchFilter}
                        onChange={(e) => setSearchFilter(e.target.value)}
                        placeholder="Search Articles🔎"
                        className={styles.searchInput} // Use styles.searchInput
                    />
                    <button onClick={() => setIsFormActive(true)} className={styles.addButton}>➕ Add Article</button>
                </div>
                <ArticleList searchFilter={searchFilter} setIsModifyFormActive={setIsModifyFormActive} setArticleToModify={setArticleToModify} />
            </>
        }
    </div>
    );
}