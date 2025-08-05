import styles from "./Mission.module.css";

function Mission() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mission}>
          <h2>Our Mission</h2>
          <p>
            Aarambh aims to be the catalyst for positive change, focusing on
            accessible education, quality healthcare, and dignified elder care.
            We are driven by the belief that love, laughter, and limitless
            possibilities are the birthright of every person we serve.
          </p>
        </div>
      </div>
    </>
  );
}

export default Mission;
