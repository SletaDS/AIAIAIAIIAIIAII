import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
 export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();
  const [wait,setwait]=useState(false)
  async function onSubmit(event) {
    setwait(true)
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
       setwait(false)
      setResult(data.result);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.form}>
        {wait ? <h3>wait....</h3> : <h3>Write</h3>}

        <form onSubmit={onSubmit}>
          <textarea
            name="textarea"
            placeholder="Enter"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div></div>
      </main>
    </div>
  );
}
