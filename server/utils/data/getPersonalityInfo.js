import { INITIAL_AMOUNT } from "./questions.js"

export const getPersonalityInfo=(businessGrowth,finePaid)=>{
    const highgrowth=businessGrowth>=(0.75*INITIAL_AMOUNT)
    const highfines= finePaid>=(0.25*INITIAL_AMOUNT)

    let personality;
    let description;
    let criteria;
    if(highgrowth && !highfines){
        personality="Thriving",
        description="Business Trusted by users and regulators.",
        criteria="High Growth, Low Fines"
    }
    else if(highgrowth && highfines){
        personality="Growth at a Cost"
        description="Short-term success, long-term risks"
        criteria="High Growth, High Fines"
    }
    else if(!highgrowth && !highfines){
        personality="Stagnant but Safe"
        description="Ethical but lacks ambition."
        criteria="Low Growth, Low Fines"
    }
    else{
        personality="Business Disaster"
        description="Regulatory scrutiny and financial losses."
        criteria="Low Growth, High Fines"
    }
    return {personality,description,criteria}
}