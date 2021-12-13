import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

const Layout = styled.div`
  color: white;
  background-color: #191414;
  min-height: 100vh;
`

const getBackground = ({ cover }) =>
  cover
    ? css`
        background: url(${cover});
      `
    : null
const Wrapper = styled.div`
  text-align: center;
  min-height: 100vh;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${getBackground}
    background-position: center center;
    background-size: cover;
    filter: blur(150px) opacity(0.4) saturate(180%);
  }
`

const Content = styled.div`
  position: relative;
  max-width: 500px;
  max-height: 500px;
  margin: 0 auto;
`

const Heading = styled.h2`
  margin: 0;
  padding: 1rem 0;
  text-align: center;
`

const Cover = styled.img`
  max-width: 500px;
  max-height: 500px;
  border-radius: 12px;
  box-shadow: 0 16px 60px #191414;
  object-fit: cover;
`

const Info = styled.div`
  text-align: start;
  margin: 1.5rem 0;
  .title {
    margin: 0 0 0.5rem 0;
  }
  .subtitle {
    margin: 0;
    opacity: 0.6;
  }
`
const Time = styled.div`
  display: flex;
  justify-content: space-between;
`

const Track = styled.input.attrs(() => ({ type: 'range' }))`
  appearance: none;
  position: relative;
  width: 100%;
  height: 5px;
  margin: 0;
  padding: 0;
  border-radius: 999px;
  background-color: #ffffff44;
  cursor: pointer;
  transition: all 250ms;
  :hover {
    background-color: #ffffff66;
    ::-webkit-slider-thumb {
      transform: scale(1.25);
    }
  }
  ::-webkit-slider-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
    transition: all 250ms;
  }
  ::-moz-range-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
  }
  ::-ms-thumb {
    appearance: none;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: white;
  }
  ::before {
    position: absolute;
    content: '';
    width: calc(var(--percentage) * 1%);
    height: 100%;
    background: white;
    border-radius: 999px;
  }
`

const getTimeString = (seconds) => {
  let sec = seconds
  const hr = Math.floor(sec / 3600)
  sec %= 3600
  const min = Math.floor(sec / 60)
  sec %= 60
  let str = ''
  if (hr) str += `${hr}:`
  if (min) {
    str += hr && min < 10 ? `0${min}:` : `${min}:`
  } else {
    str += hr ? '00:' : '0:'
  }
  str += sec < 10 ? `0${sec}` : sec
  return str
}

const COVER_IMG = '/assets/images/placeholder.jpeg'
const MAX_TRACK = 253 // sec

const Home = () => {
  const [progress, setProgress] = useState(0)

  const interval = useRef(null)

  useEffect(() => {
    interval.current = setInterval(() => {
      setProgress((curr) => (curr >= MAX_TRACK ? MAX_TRACK : (curr += 1)))
    }, 1000)
    return () => clearInterval(interval.current)
  }, [])

  return (
    <Layout>
      <Wrapper cover={COVER_IMG}>
        <Content>
          <Heading>Playlist</Heading>
          <Cover src={COVER_IMG} alt='album cover' />
          <Info>
            <h1 className='title'>Song name</h1>
            <p className='subtitle'>Album name</p>
          </Info>
          <Time as='small'>
            <div>{getTimeString(progress)}</div>
            <div>{getTimeString(MAX_TRACK)}</div>
          </Time>
          <Track
            min={0}
            max={MAX_TRACK}
            value={progress}
            onChange={(e) => setProgress(+e.target.value)}
            style={{
              '--percentage': ((progress / MAX_TRACK) * 100).toFixed(2),
            }}
          />
        </Content>
      </Wrapper>
    </Layout>
  )
}

export default Home
