import React from 'react'
import {Grid} from '@material-ui/core';
import Details from './Components/Details/Details';
import Main from './Components/Main/Main';
import useStyles from './styles';
import {PushToTalkButton , PushToTalkButtonContainer,ErrorPanel} from '@speechly/react-ui'

const App = () => {
    
    const classes = useStyles();
    
    return (
        <div>
            <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{height:"100vh"}}>  
                <Grid item xs={12} sm={4}>
                    <Details title="Income" clasd="classes.income"/>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Main/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Details title="Expense" clasd="classes.expense"/>
                </Grid>

            </Grid>
            <PushToTalkButtonContainer>
                <PushToTalkButton/>
                <ErrorPanel/>
            </PushToTalkButtonContainer>
        </div>
    )
}

export default App;