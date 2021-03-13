import sss from 'shamirs-secret-sharing';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Input from './components/input';
import Header from './components/header';

interface Shamir{
  secretKey: string,
  share: number,
  threshold: number,
  slice1: number,
  slice2: number,
  random: number
}

const App = () => {

  const [shamir, setShamir] = useState<Shamir>({
    secretKey: 'default',
    share: 4,
    threshold: 2,
    slice1: 0,
    slice2: 2,
    random: 1
  })

  if(shamir.secretKey.length <= 0 ) shamir.secretKey = " ";

  const shares = sss.split(shamir.secretKey, {shares: shamir.share, threshold: shamir.threshold, random: shamir.random})
  const recovered = sss.combine(shares.slice(shamir.slice1, shamir.slice2))

    return (
      <>
        <div>
          <form>
            <Header header={"Enter secret key (can't be empty!):"} />
            <Input type={"text"} value={shamir.secretKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShamir({ ...shamir, secretKey: e.target.value})}
            />
            <Header header={"Number of Shares:"} />
            <Input type={"number"} value={shamir.share} 
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShamir({ ...shamir, share: parseInt(e.target.value)})}
            />
            <Header header={"Number of Threshold:"} />
            <Input type={"number"} value={shamir.threshold} min = "1" max = {shamir.share}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShamir({ ...shamir, threshold: parseInt(e.target.value)})}
            />
            <Header header={"Slice 1 and 2:"} />
            <Input type='number' value={shamir.slice1} min = "0" max = {shamir.slice2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShamir({ ...shamir, slice1: parseInt(e.target.value)})}
            />
            <Input type='number' value={shamir.slice2} min = "1" max = {shamir.share}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShamir({ ...shamir, slice2: parseInt(e.target.value)})}
            />
            <Header header={"Randomize:"} />
            <Input type='number' value={shamir.random} min = "1" max = "100"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShamir({ ...shamir, random: parseInt(e.target.value)})}
            />
          </form>
          
          <Header header={"Shares:"} /><div>{shares.map((share:number, i:number) => <Header key={i} header={share}/>)}</div> 
          <Header header={"Recovered: "} secondHeader={recovered} />
          <Header header={"Recovered(to string): "} secondHeader={recovered.toString()} />

        </div>
      </>
    )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)