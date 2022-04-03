import React from 'react';

const DateAgo = ({ date }) => {

    const getDate = (date) => {
        let delta = Math.floor((Date.parse(Date()) - Date.parse(date)) / 1000);

        if (delta < 60) {
            return Math.floor(delta).toString() + " seconds";
        } else if (delta < 120) {
            return "1 minute";
        } else if (delta < 2700) {
            return Math.floor(delta / 60).toString() + " minutes";
        } else if (delta < 3600) {
            return "less than 1 hour";
        } else if (delta < 7200) {
            return "1 hour";
        } else if (delta < 86400) {
            return Math.floor(delta / 3600).toString() + " hours";
        }

        delta = Math.floor(delta / 86400);

        if (delta <= 1) {
            return "1 day";
        } else if (delta < 7) {
            return delta.toString() + " days";
        } else if (delta < 14) {
            return "1 week";
        } else if (delta < 210) {
            return Math.floor(delta / 7) + " weeks";
        } else if (delta < 420) {
            return "1 month";
        } else if (delta < 2520) {
            return Math.floor(delta / 210) + " months";
        } else if (delta < 5040) {
            return "1 year";
        } else
            return Math.floor(delta / 2520) + " years";
    } 

    return (
        <span>
            { getDate(date) }
        </span>
    )
}

export default DateAgo;
