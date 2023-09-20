import React from 'react';
import reviewDB from '../Rating.json';

const Review = () => {
  // Calculate the average review for each code
  const averageRatings = reviewDB.reduce((accumulator, review) => {
    if (!accumulator[review.code]) {
      accumulator[review.code] = { total: 0, count: 0 };
    }
    accumulator[review.code].total += review.rate;
    accumulator[review.code].count++;
    return accumulator;
  }, {});

  // Sort the average ratings in descending order and get the top 3 codes
  const topThreeCodes = Object.entries(averageRatings)
    .sort(([, a], [, b]) => b.total / b.count - a.total / a.count)
    .slice(0, 10)
    .map(([code, ratings]) => ({ code, averageScore: ratings.total / ratings.count }));

  return (
    <div>
      <h1>Top 3 Codes with Highest Average Ratings</h1>
      <ul>
        {topThreeCodes.map(({ code, averageScore }, index) => (
          <li key={index}>
            Code: {code} | Average Score: {averageScore.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review;
