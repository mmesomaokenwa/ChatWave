'use client'

const HomeError = ({ error, reset }) => {
  return (
    <div>{error.message} <button onClick={() => reset()}>Try again</button></div>
  )
}

export default HomeError