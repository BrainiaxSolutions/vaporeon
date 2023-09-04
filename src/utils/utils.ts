export const ruleOfThree = (value1: number, value2: number, proportion: number): number => {
    const result = (proportion * value2) / value1;  
    return result;
}