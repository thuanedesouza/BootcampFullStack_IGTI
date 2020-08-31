import React from 'react'
import Position from './components/Position'
import Picture from './components/Picture'
import Info from './components/Info'
import Name from './components/Name'
import Votes from './components/Votes'
import Percentage from './components/Percentage'
import Popularity from './components/Popularity'
import css from './components/candidate.module.css'


export default function Candidate({previousVote, previousPercentage, candidate, position}) {
    const {id, name, votes, percentage, popularity} = candidate;
    const imageSource =`${id}.jpg`
    return (
        <div className = {css.flexRow}>
            <Position>{position}</Position>
            <Picture imageSource = {imageSource} description = {name}/>
            <Info>
            <Name>{name}</Name>
                 <Votes value = {votes} previousVote = {previousVote} />
                 <Percentage value = {percentage} previousPercentage = {previousPercentage} />
                 <Popularity value = {popularity}/>
            </Info>
        </div>
    )
}
