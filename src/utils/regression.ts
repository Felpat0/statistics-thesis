export const calculateMean = (data: number[]) => {
  const sum = data.reduce((acc, val) => acc + val, 0);

  return sum / data.length;
}

export const calculateVariance = (data: number[]) => {
    const mean = calculateMean(data);
    const squaredDiffs = data.map(val => (val - mean) ** 2);

    return calculateMean(squaredDiffs);
}

export const calculateCovariance = (data1: number[], data2: number[]) => {
    const mean1 = calculateMean(data1);
    const mean2 = calculateMean(data2);
    const diffs1 = data1.map(val => val - mean1);
    const diffs2 = data2.map(val => val - mean2);
    const diffsProduct = diffs1.map((val, i) => val * diffs2[i]);

    return calculateMean(diffsProduct);
}

export const calculateRegressionCoefficients = (x: number[], y: number[]) => {
    const xMean = calculateMean(x);
    const yMean = calculateMean(y);
    const covariance = calculateCovariance(x, y);
    const xVariance = calculateVariance(x);

    return {
        a: covariance / xVariance, 
        b: yMean - (covariance / xVariance) * xMean
    };
}

export const calculateRegressionLine = (x: number[], coefficients: {a: number, b: number}) => {
    return x.map(val => coefficients.a * val + coefficients.b);
}