import React,{useState,useEffect,useContext} from 'react'
import {TextField , Typography, Grid, Button , FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import useStyles from './styles';
import {ExpenseTrackerContext} from '../../../context api/context';
import {useSpeechContext} from '@speechly/react-client';

import {v4 as uuidv4} from 'uuid';
import {incomeCategories,expenseCategories} from '../../../constants/constants';
import {formatDate} from '../../../utils/formatDate';

const Form = () => {
    const classes = useStyles();
    const {addTransaction}  = useContext(ExpenseTrackerContext);
    const [formData,setFormData]=useState({
        amount:'',
        category:'',
        type:'Income',
        date:formatDate(new Date()) 
    })
    const {segment} = useSpeechContext();

    const createTransaction=()=>{

        if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return

        const transaction = {...formData, amount:Number(formData.amount),id:uuidv4()}
        addTransaction(transaction)
        setFormData({...formData,
            amount:'',
            category:'',
            type:'Income',
            date:formatDate(new Date()) 
        })
    }
    
    
    useEffect(()=>{
        if(segment){
            if(segment.intent.intent === "add_expense"){
                setFormData({...formData,type:'Expense'})
            }else if(segment.intent.intent === "add_income"){
                setFormData({...formData,type:'Income'})
            }else if(segment.isFinal  && segment.intent.intent === "create_transaction"){
                return createTransaction()
            }else if(segment.isFinal && segment.intent.intent === "cancel_transaction"){
                setFormData({
                    ...formData,
                    amount:'',
                    category:'',
                    type:'Income',
                    date:formatDate(new Date()) 
                })
            }

            segment.entities.forEach((e)=>{
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                console.log(category);
                console.log(e.value);
                //we did the first character to uppercase and all the characters after are lower case 
                switch(e.type){
                    case 'amount':
                        setFormData({...formData, amount:e.value})
                        break;
                    
                    case 'category':
                        if(incomeCategories.map((iC)=>iC.type).includes(category)){

                            setFormData({...formData,type:'Income',category})
                        }else if(expenseCategories.map((iC)=>iC.type).includes(category)){
                            setFormData({...formData,type:'Expense',category})
                        }
                        break
                    
                    case 'date':
                        setFormData({...formData , date:e.value})
                        break
                    default:
                        break;
                }
            })

            if(segment.isFinal && formData.amount && formData.category && formData.date && formData.type){
                createTransaction()

            }
        }
    },[segment])

    console.log(formData);

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {
                    segment && (
                        <>
                            {segment.words.map(s=>s.value).join(" ")}
                        </>
                    ) 
                }
            </Grid>  
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>
                        Type
                    </InputLabel>
                    <Select value={formData.type} onChange={(e)=>setFormData({...formData,type:e.target.value})}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>
                        Category
                    </InputLabel>
                    <Select value={formData.category} onChange={(e)=>setFormData({...formData,category:e.target.value})}>
                        {
                            selectedCategories.map(c=>(
                                <MenuItem key={c.type} value={c.type}>
                                    {c.type}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>         
            <Grid item xs={6}>
                <TextField type='number' label='Amount' fullWidth value={formData.amount} onChange={e=>setFormData({...formData,amount:e.target.value})} />
            </Grid>
            <Grid item xs={6}>
                <TextField type='date' label='Date' fullWidth value={formData.date} onChange={e=>setFormData({...formData,date:formatDate(e.target.value)})} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    )
}


export default Form