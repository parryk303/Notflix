import "./App.css"
import { useEffect, useState } from "react"
import Section from "./components/Section"
import HeroSection from "./components/HeroSection"


const App = () => {
  const genreIncrement = 15
  const [genres, setGenres] = useState(null)
  const [limit, setLimit] = useState(genreIncrement)

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getGenres", {
      method: "POST",
      body: limit,
    })
    const responseBody = await response.json()
    setGenres(responseBody.data.reference_list.values)
  }

  console.log(limit)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit])

  return (
    <>

      <HeroSection />
      {genres && (
        <div className="container">
          {Object.values(genres).map((genre) => (
            <Section key={genre.value} genre={genre.value} />
          ))}
        </div>
      )}
      <div
        className="page-end"
        onMouseEnter={() => {
          setLimit(limit + genreIncrement)
        }}
      />
    </>
  )
}

export default App
