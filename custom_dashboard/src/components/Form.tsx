'use client'
import React, {useState} from "react";
import {createStyles, makeStyles, Typography, Paper, Button, TextField} from "@material-ui/core";

import CustomTextField from './CustomTextField'
import CustomDropDown from './CustomDropDown'

import * as child from 'child_process';

const useStyles = makeStyles(() => createStyles({
    form : {
        display : "flex",
        flexDirection : "column",
    },
    container : {
        backgroundColor : "#ffffff",
        position : "absolute",
        top : "50%",
        left : "50%",
        transform : "translate(-50%,-50%)",
        padding : 30,
        textAlign : "center"
    },
    title : {
        margin:"0px 0 20px 0"
    },
    button : {
        margin:"20px 0"
    }
}))

type Values = {
    paraphrase : string,
    destination : string,
    amount : string,
    fee : string,
    note : string,
}

const paraphrases = [
    {value : "drift doll absurd cost upon magic plate often actor decade obscure smooth", label :"drift doll absurd cost upon magic plate often actor decade obscure smooth"},
    {value : "x drift doll absurd cost upon magic plate often actor decade obscure smooth", label :"x drift doll absurd cost upon magic plate often actor decade obscure smooth"},
]
const destinations = [
    {value : "DAG4o41NzhfX6DyYBTTXu6sJa6awm36abJpv89jB", label : "DAG4o41NzhfX6DyYBTTXu6sJa6awm36abJpv89jB"},
    {value : "x DAG4o41NzhfX6DyYBTTXu6sJa6awm36abJpv89jB", label : "x DAG4o41NzhfX6DyYBTTXu6sJa6awm36abJpv89jB"},
]

const Form = () => {

    const classes = useStyles();
    const [values,setValues] = useState<Values>({
        paraphrase: "",
        destination: "",
        amount: "",
        fee: "",
        note: "",
    });

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values,[event.target.name] : event.target.value});
    }
    
    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(values);
        const dothis ="yarn metagraph-transaction:send --seed=\"" + values.paraphrase + "\" --transaction='{\"destination\": \"" + values.destination + "\",\"amount\":" + values.amount + ", \"fee\":" + values.fee + "}'";
        console.log(dothis);

        child.exec(dothis, () => {
            console.log(`stdout: ${dothis}`);
        });       
    }    

    return (
        <Paper className={classes.container}>
            <Typography variant={"h4"} className={classes.title}>Send DAG</Typography>
            <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
                <CustomDropDown label={"Paraphrase"} name={"paraphrase"} changeHandler={handleChange} values={paraphrases} currentValue={values.paraphrase}/>
                <CustomDropDown label={"Destination"} name={"destination"} changeHandler={handleChange} values={destinations} currentValue={values.destination}/>
                <CustomTextField changeHandler={handleChange} label={"Amount"} name={"amount"} />
                <CustomTextField changeHandler={handleChange} label={"Fee"} name={"fee"} />
                <Button type={"submit"} variant={"contained"} className={classes.button}>Send</Button>
            </form>
        </Paper>
    );
}

export default Form
