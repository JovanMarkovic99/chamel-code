import React from 'react';

const RankGenerator = ({ className, reputation }) => {
    
    const getRank = () => {
        if (reputation < -50)
            return "Infinite Loop";
        else if (reputation < -10)
            return "Stack Overflow";
        else if (reputation < 0)
            return "American";
        else if (reputation < 10)
            return "Newbie";
        else if (reputation < 50)
            return "Script Kiddy";
        else if (reputation < 500)
            return "Programmer";
        else if (reputation < 1000)
            return "Lord Chameleon";
    }
    
    return (
        <span className={className}>
            { getRank() }
        </span>
    )
};

export default RankGenerator;