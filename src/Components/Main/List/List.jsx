import React,{useContext} from 'react'
import {List as MUIList , ListItem , ListItemAvatar, ListItemText, Avatar,ListItemSecondaryAction , IconButton,Slide} from '@material-ui/core';
import useStyles from './style';
import {Delete, MoneyOff} from '@material-ui/icons';

import {ExpenseTrackerContext} from '../../../context api/context';



const List = () => {
   const classes = useStyles();
    const {transactions,deleteTransaction} = useContext(ExpenseTrackerContext);
  
    const deleteTransact=(id)=>{
        deleteTransaction(id);
    }

   return (

        <MUIList dense={false} className = {classes.list}>
            {
                transactions.map(transaction=>(
                    <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={transaction.type ==='Income' ? classes.avatarIncome : classes.avatarExpense}>
                                    <MoneyOff/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={transaction.category} secondary={`$${transaction.amount}-${transaction.date}`} />
                            <ListItemSecondaryAction  edge="end" aria-label="delete" onClick={()=>deleteTransact(transaction.id)}>
                                <Delete/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Slide>
                ))
            }
        </MUIList>
    )
}


export default List
