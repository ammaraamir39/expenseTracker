import React from 'react';


const InfoCard = () => {
     
    const isIncome = Math.round(Math.random());

    return (
        <div style={{textAlign:'center' , padding: '0 10%'}}>
            Try saying: <br />
            Add {isIncome ? 'Income ' : 'Expense '} 
            for {isIncome ? '$100 ' : '$50 '} 
            in category {isIncome ? 'Business ' : 'Bills '}
            for {isIncome ? 'Monday ' : 'Tuesday '} ...
        </div>
    )
}

export default InfoCard
