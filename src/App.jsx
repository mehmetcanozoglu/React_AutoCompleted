import { useEffect, useRef, useState } from 'react'
import './App.css'

let data = [
  {
    id: 1,
    title: "search wrapper",
    image: "https://upload.wikimedia.org/wikipedia/tr/d/db/Hank_Schrader_S5B.png"
  },
  {
    id: 2,
    title: "Test 2",
    image: "https://upload.wikimedia.org/wikipedia/en/3/34/Jimmy_McGill_BCS_S3.png"
  },
  {
    id: 3,
    title: "deneme 1",
    image: "https://upload.wikimedia.org/wikipedia/tr/c/c6/Jesse_Pinkman_S5B.png"
  },
  {
    id: 4,
    title: "deneme 2",
    image: "https://upload.wikimedia.org/wikipedia/tr/0/03/Walter_White_S5B.png"
  }
]

function App() {
  let [search, setSearch] = useState("")
  let [result, setResult] = useState(false)
  let searchRef = useRef()

  let isTyping = search.replace(/\s+/, "").length > 0;

  useEffect(() => {
    if (isTyping) {
      let filteredResult = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
      setResult(filteredResult.length > 0 ? filteredResult : false)
    } else {
      setResult(false)
    }
  }, [search])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  let handleClickOutside = (e) => {
    if (!searchRef.current.contains(e.target)) {
      setSearch("")
    }
  }
  return (
    <>
      <div className='search' ref={searchRef}>
        <input type="text" value={search} className={isTyping ? "typing" : null} placeholder='bir seyler ara..' onChange={(e) => setSearch(e.target.value)} />
        {isTyping && (
          <div className="search-result">
            {result && result.map(item => (
              <div key={item.id} className='search-result-item'>
                <img src={item.image} alt="" />
                <p>{item.title}</p>
              </div>
            ))}
            {!result && (
              <div className='result-not-found'>
                "{search}" ile bir sey bulunamadı </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default App
