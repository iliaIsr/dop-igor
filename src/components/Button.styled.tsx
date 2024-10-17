import React from "react";
import '../App.css'
import styled from "styled-components";
import {MyAnimation} from "../styles/animations/Animations";


export const StyledBtn=styled.button`
    border: none;
    background-color: #da417d;
    padding: 10px 20px;
    color: snow;
    font-size: 2rem;
    font-weight: bold;
    &:hover{
        background-color: greenyellow;
    }
`

export const SuperButton=styled(StyledBtn)`
    border-radius: 5px;
    background-color: yellow;
    color: #333131;
    &:hover{
        animation: ${MyAnimation} 2s ease-in-out;
    }
    
`